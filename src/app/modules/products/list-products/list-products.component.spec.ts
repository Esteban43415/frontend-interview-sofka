import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsComponent } from './list-products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Input, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '@services/products.service';

@Component({selector: 'product-form', template: '', standalone: false})
class MockProductFormComponent {
  @Input() product: any;
}
describe('Componente para listar productos', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;
  let productsServiceSpy: any;

  const mockProducts = [
    { id: '1', name: 'Producto Uno', description: 'Desc 1' },
    { id: '2', name: 'Producto Dos', description: 'Desc 2' },
  ];

  beforeEach(async () => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAllProducts', 'deleteProduct']);
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule],
      declarations: [ListProductsComponent,MockProductFormComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los productos al inicializar', async () => {
    productsServiceSpy.getAllProducts.and.returnValue(Promise.resolve({ data: mockProducts }));
    await component.getProducts();
    expect(component.products.length).toBe(2);
    expect(component.filteredProducts.length).toBe(2);
  });

  it('debería manejar el error al obtener productos', async () => {
    productsServiceSpy.getAllProducts.and.returnValue(Promise.reject('error'));
    await component.getProducts();
    expect(component.error).toBeTruthy();
    expect(component.products.length).toBe(0);
  });

  it('debería filtrar productos por término de búsqueda', () => {
    component.products = mockProducts as any;
    component.filteredProducts = mockProducts as any;
    component.searchTerm = 'Dos';
    component.onSearch();
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toContain('Dos');
  });

  it('debería limpiar la búsqueda', () => {
    component.products = mockProducts as any;
    component.filteredProducts = mockProducts as any;
    component.searchTerm = 'Uno';
    component.clearSearch();
    expect(component.searchTerm).toBe('');
    expect(component.filteredProducts.length).toBe(2);
  });

  it('debería paginar los productos', () => {
    component.filteredProducts = Array(10).fill({ name: 'Test' }) as any;
    component.resultsPerPage = 5;
    component.currentPage = 2;
    expect(component.paginatedProducts.length).toBe(5);
  });
});
