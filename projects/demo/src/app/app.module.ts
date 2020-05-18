import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PixieHighchartsModule } from 'pixie-highcharts';
// import { PixieHighchartsModule } from '../../lib/dist';

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
    const nd = require('highcharts/modules/no-data-to-display');
    const dde = require('highcharts/modules/exporting');
    const hm = require('highcharts/modules/heatmap');
    const tm = require('highcharts/modules/treemap');
    const ed = require('highcharts/modules/export-data');
    const oe = require('highcharts/modules/offline-exporting');
    const bst = require('highcharts/modules/boost');

    hcm(hc);
    hs(hc);
    dd(hc);
    nd(hc);
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
      xAxis: {
        labels: { style: { color: '#FFF', font: 'Arial' } },
        title: { style: { fontFamily: 'Arial' } }
      },
      yAxis: {
        labels: { style: { color: '#FFF', font: 'Arial' } },
        title: { style: { fontFamily: 'Arial' } }
      },
      legend: {
        itemStyle: { color: '#FFF', font: 'Arial' },
        maxHeight: null
      }
    };

    exportPXH.filename = 'Pixie Highcharts';

    globalPXH.export = exportPXH;
    globalPXH.debug = true;
    globalPXH.debugStringify = true;
    globalPXH.sameLegendSymbol = true;
    hc.globalPXH = globalPXH;

    // const globalPXH: any = {};
    // globalPXH.debug = true;
    // globalPXH.debugStringify = true;
    // hc.globalPXH = globalPXH;
  }
  return hc;
}

@NgModule({
  declarations: [AppComponent, MainComponent, ConfigureComponent, ConfigureHighstockComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, PixieHighchartsModule],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
