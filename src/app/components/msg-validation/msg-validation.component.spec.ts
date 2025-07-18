import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MsgValidationComponent } from './msg-validation.component';
import { ValidatorService } from '@app/infrastructure/validator.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('MsgValidationComponent', () => {
  let component: MsgValidationComponent;
  let fixture: ComponentFixture<MsgValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [MsgValidationComponent],
      providers: [ValidatorService],
    }).compileComponents();
    fixture = TestBed.createComponent(MsgValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input properties', () => {
    component.formField = 'name';
    component.textColor = 'red';
    component.isFloat = false;
    component.message = 'Error';
    component.withMargin = false;
    expect(component.formField).toBe('name');
    expect(component.textColor).toBe('red');
    expect(component.isFloat).toBeFalse();
    expect(component.message).toBe('Error');
    expect(component.withMargin).toBeFalse();
  });
});
