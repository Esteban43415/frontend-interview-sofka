import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit true when confirm is called', () => {
    spyOn(component.confirmed, 'emit');
    component.confirm();
    expect(component.confirmed.emit).toHaveBeenCalledWith(true);
  });

  it('should emit false when cancel is called', () => {
    spyOn(component.confirmed, 'emit');
    component.cancel();
    expect(component.confirmed.emit).toHaveBeenCalledWith(false);
  });
});
