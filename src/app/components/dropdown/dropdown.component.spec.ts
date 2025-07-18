import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';

describe('Componente de menú desplegable', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir la opción seleccionada correctamente', () => {
    spyOn(component.optionSelected, 'emit');
    component.select('edit');
    expect(component.optionSelected.emit).toHaveBeenCalledWith('edit');
    component.select('delete');
    expect(component.optionSelected.emit).toHaveBeenCalledWith('delete');
  });
});
