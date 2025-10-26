import { Component, Input } from '@angular/core';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <h3>{{ employee.name }}</h3>
      <p><strong>Role:</strong> {{ employee.role }}</p>
      <p><strong>Department:</strong> {{ employee.department }}</p>
      <p><strong>Performance:</strong> {{ employee.performance }}%</p>
    </div>
  `,
  standalone:true,
  styles: [`
    .card {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
  `]
})
export class CardComponent {
  @Input() employee!: Employee;
}
