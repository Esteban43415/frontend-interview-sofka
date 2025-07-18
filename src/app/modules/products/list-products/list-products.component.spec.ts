import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsComponent } from './list-products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Input, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({selector: 'product-form', template: '', standalone: false})
class MockProductFormComponent {
  @Input() product: any;
}
describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule],
      declarations: [ListProductsComponent,MockProductFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
