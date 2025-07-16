import { Component, OnInit } from '@angular/core';
import { IProducts } from '@dto/product.dto';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-list-products',
  standalone: false,
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent implements OnInit {
  // Constantes
  private readonly DEFAULT_INITIALS = 'XX';
  private readonly MAX_INITIALS_LENGTH = 2;
  private readonly DEFAULT_RESULTS_PER_PAGE = 5;

  // State
  products: IProducts[] = [];
  filteredProducts: IProducts[] = [];
  searchTerm: string = '';
  resultsPerPage: number = this.DEFAULT_RESULTS_PER_PAGE;
  currentPage: number = 1;
  isLoading: boolean = false;
  error: string | null = null;

  displayedColumns: string[] = [
    'Logo',
    'Nombre del producto',
    'Descripción',
    'Fecha de liberación',
    'Fecha de reestructuración',
  ];

  constructor(private _product: ProductsService) {}

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
    this.error = 'Error al cargar los productos. Por favor, intente nuevamente.';
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

  // Métodos para paginación
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

  // Método mejorado para extraer iniciales
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

    // Si solo hay una palabra, tomar las primeras dos letras
    if (initials.length === 1 && words[0]?.length > 1) {
      initials += words[0].charAt(1).toUpperCase();
    }

    return initials;
  }

  private padInitials(initials: string): string {
    return initials.padEnd(this.MAX_INITIALS_LENGTH, 'X');
  }

  // Método para recargar datos
  async refreshData(): Promise<void> {
    await this.getProducts();
  }

  // Método para limpiar búsqueda
  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }
}
