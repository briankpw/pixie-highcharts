import { Directive, Output, EventEmitter } from '@angular/core';
import { ChartEvent } from './chart.model';
@Directive({
  selector: 'navigation'
})
export class ChartNavigationComponent {
  @Output() deselectButton = new EventEmitter<ChartEvent>();
  @Output() hidePopup = new EventEmitter<ChartEvent>();
  @Output() selectButton = new EventEmitter<ChartEvent>();
  @Output() showPopup = new EventEmitter<ChartEvent>();
}
