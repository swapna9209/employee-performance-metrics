import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../core/services/state.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { ChartDataPoint } from '../../models/chart.model';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, ChartComponent],
  template: `
    <div class="dashboard">
      <h2>Employee Performance Dashboard</h2>
      <div class="grid">
        <ng-container *ngFor="let emp of employees">
          <app-card [employee]="emp"></app-card>
        </ng-container>
      </div>

      <div style="height:300px; margin-top: 1rem;">
        <app-chart [data]="chartData"></app-chart>
      </div>
    </div>
  `,
  styles: [`
    .grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap: 16px; }
  `]
})
export class DashboardComponent implements OnInit {
  employees = this.stateService.employeesSignal();
  chartData: ChartDataPoint[] = [];

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    // load employees and compute chart points
    this.stateService.loadEmployees().subscribe(list => {
      this.employees = list;
      this.chartData = list.map(e => ({ label: e.name, value: e.performance }));
    });
  }
}
