import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { IProducts } from '@dto/product.dto';
import { ProductsService } from '@services/products.service';
import { AppRoutes } from '@utils/app-routes';

@Component({
  selector: 'app-list-products',
  standalone: false,
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent implements OnInit {
  private readonly DEFAULT_INITIALS = 'XX';
  private readonly MAX_INITIALS_LENGTH = 2;
  private readonly DEFAULT_RESULTS_PER_PAGE = 5;

  products: IProducts[] = [];
  filteredProducts: IProducts[] = [];
  searchTerm: string = '';
  resultsPerPage: number = this.DEFAULT_RESULTS_PER_PAGE;
  currentPage: number = 1;
  isLoading: boolean = false;
  error: string | null = null;

  overlayPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];

  openDropdownId: string | null = null;

  displayedColumns: string[] = [
    'Logo',
    'Nombre del producto',
    'Descripción',
    'Fecha de liberación',
    'Fecha de reestructuración',
    '',
  ];

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private _product: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts(): Promise<void> {
    this.setLoadingState(true);

    try {
      const response = await this._product.getAllProducts();
      this.handleProductsResponse(response);
    } catch (error) {
      this.handleProductsError(error);
    } finally {
      this.setLoadingState(false);
    }
  }

  private setLoadingState(isLoading: boolean): void {
    this.isLoading = isLoading;
    if (isLoading) {
      this.error = null;
    }
  }

  private handleProductsResponse(response: any): void {
    if (response?.data) {
      this.products = response.data;
      this.filteredProducts = [...this.products];
    } else {
      this.clearProductsData();
      this.error = 'No se encontraron productos';
    }
  }

  private handleProductsError(error: any): void {
    console.error('Error al cargar productos:', error);
    this.error =
      'Error al cargar los productos. Por favor, intente nuevamente.';
    this.clearProductsData();
  }

  private clearProductsData(): void {
    this.products = [];
    this.filteredProducts = [];
  }

  onSearch(): void {
    if (!this.searchTerm?.trim()) {
      this.filteredProducts = [...this.products];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchTermLower) ||
          product.description?.toLowerCase().includes(searchTermLower)
      );
    }
    this.resetToFirstPage();
  }

  private resetToFirstPage(): void {
    this.currentPage = 1;
  }

  get paginatedProducts(): IProducts[] {
    if (!this.filteredProducts.length) {
      return [];
    }

    const startIndex = (this.currentPage - 1) * this.resultsPerPage;
    const endIndex = startIndex + this.resultsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  get totalResults(): number {
    return this.filteredProducts?.length || 0;
  }

  get totalPages(): number {
    return Math.ceil(this.totalResults / this.resultsPerPage);
  }

  get hasResults(): boolean {
    return this.totalResults > 0;
  }

  onResultsPerPageChange(): void {
    this.resetToFirstPage();
  }

  getLogoInitials(product: IProducts): string {
    if (!product?.name) {
      return this.DEFAULT_INITIALS;
    }

    const words = this.extractWords(product.name);
    const initials = this.buildInitials(words);

    return this.padInitials(initials);
  }

  private extractWords(name: string): string[] {
    return name.trim().split(/\s+/);
  }

  private buildInitials(words: string[]): string {
    let initials = '';

    for (const word of words) {
      if (initials.length < this.MAX_INITIALS_LENGTH && word.length > 0) {
        initials += word.charAt(0).toUpperCase();
      }
      if (initials.length >= this.MAX_INITIALS_LENGTH) break;
    }

    if (initials.length === 1 && words[0]?.length > 1) {
      initials += words[0].charAt(1).toUpperCase();
    }

    return initials;
  }

  private padInitials(initials: string): string {
    return initials.padEnd(this.MAX_INITIALS_LENGTH, 'X');
  }

  async refreshData(): Promise<void> {
    await this.getProducts();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  addProduct(): void {
    this.router.navigate([AppRoutes.create_product]);
  }

  onAction(action: string, product: any) {
    console.log('Acción:', action, 'Producto:', product);
    this.openDropdownId = null;
    if (action === 'edit') {
      this.router.navigate([AppRoutes.edit_product(product.id)]);
    }

    if (action === 'delete') {
      this.openConfirmDialog(product);
    }
  }

  closeDropdown() {
    this.openDropdownId = null;
  }

  toggleDropdown(productId: string) {
    this.openDropdownId = this.openDropdownId === productId ? null : productId;
  }

  async deleteProduct(id: string) {
    const response = await this._product.deleteProduct(id);
    if (response) {
      this.refreshData();
    }
  }

  openConfirmDialog(product: any) {
    const overlayRef: OverlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    const dialogPortal = new ComponentPortal(
      ConfirmDialogComponent,
      this.viewContainerRef
    );
    const componentRef = overlayRef.attach(dialogPortal);

    const sub = componentRef.instance.confirmed.subscribe((result: boolean) => {
      overlayRef.dispose();
      if (result) {
        this.deleteProduct(product.id);
      }
      sub.unsubscribe();
    });

    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
  }
}
