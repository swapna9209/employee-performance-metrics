import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ChartDataPoint } from '../../../models/chart.model';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  template: `
    <div style="display:block">
      <canvas baseChart
              [data]="chartData"
              [options]="chartOptions"
              [type]="chartType">
      </canvas>
    </div>
  `
})
export class ChartComponent {
  @Input() data: ChartDataPoint[] = [];

  chartType: any = 'bar';
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  get chartData() {
    return {
      labels: this.data.map(d => d.label),
      datasets: [
        { data: this.data.map(d => d.value), label: 'Performance' }
      ]
    };
  }
}
