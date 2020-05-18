import { Directive, Output, EventEmitter } from '@angular/core';
import { ChartEvent } from './chart.model';
@Directive({
  selector: 'xAxis'
})
export class ChartXAxisComponent {
  @Output() afterBreaks = new EventEmitter<ChartEvent>();
  @Output() afterSetExtremes = new EventEmitter<ChartEvent>();
  @Output() pointBreak = new EventEmitter<ChartEvent>();
  @Output() pointInBreak = new EventEmitter<ChartEvent>();
  @Output() setExtremes = new EventEmitter<ChartEvent>();
}
