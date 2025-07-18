import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit optionSelected with correct value', () => {
    spyOn(component.optionSelected, 'emit');
    component.select('edit');
    expect(component.optionSelected.emit).toHaveBeenCalledWith('edit');
    component.select('delete');
    expect(component.optionSelected.emit).toHaveBeenCalledWith('delete');
  });
});
