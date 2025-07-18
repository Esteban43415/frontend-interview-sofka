import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '@services/products.service';

// Mock mínimo para el selector 'product-form'
@Component({selector: 'product-form', template: ''})
class MockProductFormComponent {
  @Input() product: any;
}

describe('Componente para agregar producto', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let productsServiceSpy: any;

  beforeEach(async () => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProductById']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MockProductFormComponent],
      declarations: [AddProductComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
        { provide: ProductsService, useValue: productsServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar el producto si el id está presente', async () => {
    const mockProduct = { id: '1', name: 'Test', description: 'Desc', logo: '', date_release: new Date(), date_revision: new Date() };
    productsServiceSpy.getProductById.and.returnValue(Promise.resolve(mockProduct));
    component.idProduct = '1';
    await component.loadProduct('1');
    expect(component.product).toEqual(mockProduct);
  });

  it('no debería asignar producto si getProductById retorna null', async () => {
    productsServiceSpy.getProductById.and.returnValue(Promise.resolve(null));
    component.idProduct = '2';
    await component.loadProduct('2');
    expect(component.product).toBeUndefined();
  });
});
