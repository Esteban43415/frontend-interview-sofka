import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';

describe('Componente de notificación (toast)', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería aceptar las propiedades de entrada', () => {
    component.message = 'Mensaje de prueba';
    component.type = 'success';
    expect(component.message).toBe('Mensaje de prueba');
    expect(component.type).toBe('success');
  });
});
