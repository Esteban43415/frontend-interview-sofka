import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form.component';
import { Component, Input } from '@angular/core';
// Mock mínimo para el selector 'msg-validation'
@Component({ selector: 'msg-validation', template: '', standalone: false })
class MockMsgValidationComponent {
  @Input() formCtrl: any;
  @Input() formField: any;
  @Input() isFloat: any;
}

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ProductFormComponent, MockMsgValidationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate required fields', () => {
    const form = component.formProductGroup;
    form.setValue({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: ''
    });
    expect(form.invalid).toBeTrue();
    expect(form.get('id')?.hasError('required')).toBeTrue();
    expect(form.get('name')?.hasError('required')).toBeTrue();
    expect(form.get('description')?.hasError('required')).toBeTrue();
    expect(form.get('logo')?.hasError('required')).toBeTrue();
    expect(form.get('date_release')?.hasError('required')).toBeTrue();
    expect(form.get('date_revision')?.hasError('required')).toBeTrue();
  });

  it('should validate minLength and maxLength for id', () => {
    const form = component.formProductGroup;
    form.get('id')?.setValue('ab');
    expect(form.get('id')?.hasError('minlength')).toBeTrue();
    form.get('id')?.setValue('a'.repeat(11));
    expect(form.get('id')?.hasError('maxlength')).toBeTrue();
    form.get('id')?.setValue('abc');
    expect(form.get('id')?.valid).toBeTrue();
  });

  it('should validate minLength and maxLength for name', () => {
    const form = component.formProductGroup;
    form.get('name')?.setValue('abcd');
    expect(form.get('name')?.hasError('minlength')).toBeTrue();
    form.get('name')?.setValue('a'.repeat(101));
    expect(form.get('name')?.hasError('maxlength')).toBeTrue();
    form.get('name')?.setValue('abcde');
    expect(form.get('name')?.valid).toBeTrue();
  });

  it('should validate minLength and maxLength for description', () => {
    const form = component.formProductGroup;
    form.get('description')?.setValue('short');
    expect(form.get('description')?.hasError('minlength')).toBeTrue();
    form.get('description')?.setValue('a'.repeat(201));
    expect(form.get('description')?.hasError('maxlength')).toBeTrue();
    form.get('description')?.setValue('a'.repeat(10));
    expect(form.get('description')?.valid).toBeTrue();
  });
});
