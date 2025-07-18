import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('Componente de diálogo de confirmación', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir true cuando se confirma', () => {
    spyOn(component.confirmed, 'emit');
    component.confirm();
    expect(component.confirmed.emit).toHaveBeenCalledWith(true);
  });

  it('debería emitir false cuando se cancela', () => {
    spyOn(component.confirmed, 'emit');
    component.cancel();
    expect(component.confirmed.emit).toHaveBeenCalledWith(false);
  });
});
