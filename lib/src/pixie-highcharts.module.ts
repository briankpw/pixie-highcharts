import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocaleService } from './pixie-highcharts/lib/locale.service';

import { HighchartsChartModule } from 'highcharts-angular';
import { ChartSeriesComponent } from './pixie-highcharts/lib/ChartSeriesComponent';
import { ChartPointComponent } from './pixie-highcharts/lib/ChartPointComponent';
import { ChartXAxisComponent } from './pixie-highcharts/lib/ChartXAxisComponent';
import { ChartYAxisComponent } from './pixie-highcharts/lib/ChartYAxisComponent';
import { ChartZAxisComponent } from './pixie-highcharts/lib/ChartZAxisComponent';

const ChartDeclaration: any[] = [ChartSeriesComponent, ChartPointComponent, ChartXAxisComponent, ChartYAxisComponent, ChartZAxisComponent];

import { PixieHighChartsComponent } from './pixie-highcharts/pixie-highcharts.component';
@NgModule({
  imports: [CommonModule, HighchartsChartModule],
  declarations: [PixieHighChartsComponent, ChartDeclaration],
  exports: [PixieHighChartsComponent, ChartDeclaration],
  providers: [LocaleService]
})
export class PixieHighchartsModule {
  // public static forRoot(config): ModuleWithProviders {
  //   return {
  //     ngModule: PixieHighchartsModule,
  //     providers: [LocaleService, { provide: 'config', useValue: config }]
  //   };
  // }
}

export { PixieHighChartsComponent, ChartSeriesComponent, ChartPointComponent, ChartXAxisComponent, ChartYAxisComponent, LocaleService };
