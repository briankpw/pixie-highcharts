import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import { LocaleService } from './util/locale.service';
import { HighchartsStatic } from './util/highcharts.service';

import { PixieHighchartsComponent } from './pixie-highcharts.component';
import { ChartSeriesComponent } from './util/chart-series.component';
import { ChartPointComponent } from './util/chart-point.component';
import { ChartXAxisComponent } from './util/chart-xAxis.component';
import { ChartYAxisComponent } from './util/chart-yAxis.component';
import { ChartZAxisComponent } from './util/chart-zAxis.component';
import { ChartColorAxisComponent } from './util/chart-colorAxis.component';
import { ChartNavigationComponent } from './util/chart-navigation.component';

import { prefixConversion } from './util/prefixConversion';

const ChartDeclaration: any[] = [
  ChartSeriesComponent,
  ChartPointComponent,
  ChartXAxisComponent,
  ChartYAxisComponent,
  ChartZAxisComponent,
  ChartColorAxisComponent,
  ChartNavigationComponent
];

@NgModule({
  imports: [CommonModule, HighchartsChartModule],
  declarations: [PixieHighchartsComponent, ChartDeclaration],
  exports: [PixieHighchartsComponent, ChartDeclaration],
  providers: [LocaleService, HighchartsStatic]
})
export class PixieHighchartsModule {
  public static forRoot(highchartsStatic: HighchartsStatic): ModuleWithProviders {
    return {
      ngModule: PixieHighchartsModule,
      providers: [{ provide: HighchartsStatic, useValue: highchartsStatic }]
    };
  }
}
