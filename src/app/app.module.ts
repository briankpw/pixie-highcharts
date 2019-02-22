import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PixieHighchartsModule } from 'pixie-highcharts';
// import { PixieHighchartsModule } from '../../lib/dist';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ConfigureComponent } from './configure/configure.component';
import { ConfigureHighstockComponent } from './configure-highstock/configure-highstock.component';
import { HighchartsStatic, GlobalPXH, Export } from 'pixie-highcharts';

declare var require: any;
export function highchartsFactory() {
  const hc = require('highcharts');

  if (!hc.PixieHighLoaded) {
    const hcm = require('highcharts/highcharts-more');
    const hs = require('highcharts/modules/stock');
    const dd = require('highcharts/modules/drilldown');
    const dde = require('highcharts/modules/exporting');
    const hm = require('highcharts/modules/heatmap');
    const tm = require('highcharts/modules/treemap');
    const ed = require('highcharts/modules/export-data');
    const oe = require('highcharts/modules/offline-exporting');
    const bst = require('highcharts/modules/boost');

    hcm(hc);
    hs(hc);
    dd(hc);
    dde(hc);
    hm(hc);
    tm(hc);
    ed(hc);
    oe(hc);
    bst(hc);
    hc.PixieHighLoaded = true;
    const globalPXH: GlobalPXH = {};
    const exportPXH: Export = {};
    // hc.globalPXH.legendPosition = 'bottom';
    globalPXH.url = 'google.com';

    exportPXH.theme = {
      chart: {
        backgroundColor: '#23232A',
        spacingTop: 10,
        style: { fontFamily: 'Arial', color: '##FFF' }
      },
      title: { style: { color: '#FFF', fontFamily: 'Arial' } },
      subtitle: { style: { color: '#FFF' } },
      xAxis: { labels: { style: { color: '#FFF', font: 'Arial' } }, title: { style: { fontFamily: 'Arial' } } },
      yAxis: { labels: { style: { color: '#FFF', font: 'Arial' } }, title: { style: { fontFamily: 'Arial' } } },
      legend: {
        itemStyle: { color: '#FFF', font: 'Arial' },
        maxHeight: null
      }
    };
    // this.globalPXH.standardTooltipDesign = config.standardTooltipDesign;
    // this.globalPXH.dateTimeLabelFormats = config.dateTimeLabelFormats;
    exportPXH.filename = 'Pixie Highcharts';

     globalPXH.export = exportPXH;
    globalPXH.debug = true;
     hc.globalPXH = globalPXH;
  }
  return hc;
}

@NgModule({
  declarations: [AppComponent, MainComponent, ConfigureComponent, ConfigureHighstockComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, PixieHighchartsModule, AppRoutingModule],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
