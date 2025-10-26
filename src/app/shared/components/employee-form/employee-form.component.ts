import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee?: Employee;
  @Output() save = new EventEmitter<Employee>();
  form = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    role: ['', Validators.required],
    department: ['', Validators.required],
    performance: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.employee) {
      this.form.patchValue(this.employee);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.save.emit(this.form.value as Employee);
  }

  // helpers used in template
  hasError(controlName: string, errorName: string) {
    const control = this.form.get(controlName);
    return control?.touched && control?.hasError(errorName);
  }
}
