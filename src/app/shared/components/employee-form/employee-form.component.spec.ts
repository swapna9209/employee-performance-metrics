import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeFormComponent } from './employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('EmployeeFormComponent', () => {
  let comp: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFormComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form invalid when empty', () => {
    expect(comp.form.valid).toBeFalse();
  });

  it('should show validation errors and not emit on invalid submit', () => {
    spyOn(comp.save, 'emit');
    comp.onSubmit();
    expect(comp.save.emit).not.toHaveBeenCalled();
    // make form valid
    comp.form.setValue({ id: 'e1', name: 'Abc', role: 'Dev', department: 'Eng', performance: 50 });
    comp.onSubmit();
    expect(comp.save.emit).toHaveBeenCalled();
  });
});
