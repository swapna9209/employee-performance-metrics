import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { HighlightDirective } from './directives/highlight.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ChartComponent } from './components/chart/chart.component';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule
  ],
  exports: []
})
export class SharedModule { }
