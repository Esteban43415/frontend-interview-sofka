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
describe('ListProductsComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', async () => {
    productsServiceSpy.getAllProducts.and.returnValue(Promise.resolve({ data: mockProducts }));
    await component.getProducts();
    expect(component.products.length).toBe(2);
    expect(component.filteredProducts.length).toBe(2);
  });

  it('should handle error on getProducts', async () => {
    productsServiceSpy.getAllProducts.and.returnValue(Promise.reject('error'));
    await component.getProducts();
    expect(component.error).toBeTruthy();
    expect(component.products.length).toBe(0);
  });

  it('should filter products by search term', () => {
    component.products = mockProducts as any;
    component.filteredProducts = mockProducts as any;
    component.searchTerm = 'Dos';
    component.onSearch();
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toContain('Dos');
  });

  it('should clear search', () => {
    component.products = mockProducts as any;
    component.filteredProducts = mockProducts as any;
    component.searchTerm = 'Uno';
    component.clearSearch();
    expect(component.searchTerm).toBe('');
    expect(component.filteredProducts.length).toBe(2);
  });

  it('should paginate products', () => {
    component.filteredProducts = Array(10).fill({ name: 'Test' }) as any;
    component.resultsPerPage = 5;
    component.currentPage = 2;
    expect(component.paginatedProducts.length).toBe(5);
  });
});
