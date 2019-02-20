import { Directive, Output, EventEmitter } from '@angular/core';
import { ChartEvent } from './chart.model';
@Directive({
  selector: 'colorAxis'
})
export class ChartColorAxisComponent {
  @Output() afterSetExtremes = new EventEmitter<ChartEvent>();
  @Output() legendItemClick = new EventEmitter<ChartEvent>();
  @Output() setExtremes = new EventEmitter<ChartEvent>();
}
