import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// import { PixieHighchartsModule } from 'pixie-highcharts';
import { PixieHighchartsModule } from '../../lib/dist';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ConfigureComponent } from './configure/configure.component';
import { ConfigureHighstockComponent } from './configure-highstock/configure-highstock.component';
import { ConfigureHighmapsComponent } from './configure-highmaps/configure-highmaps.component';

import { HighchartsStatic } from 'pixie-highcharts';

declare var require: any;
export function highchartsFactory() {
  const hc = require('highcharts');

  if (!hc.PixieHighLoaded) {
    const hcm = require('highcharts/highcharts-more');
    const dd = require('highcharts/modules/drilldown');
    const dde = require('highcharts/modules/exporting');
    const hm = require('highcharts/modules/heatmap');
    const tm = require('highcharts/modules/treemap');
    const ed = require('highcharts/modules/export-data');
    const oe = require('highcharts/modules/offline-exporting');
    const hs = require('highcharts/modules/stock');
    const bst = require('highcharts/modules/boost');

    hcm(hc);
    dd(hc);
    dde(hc);
    hm(hc);
    tm(hc);
    ed(hc);
    oe(hc);
    hs(hc);
    bst(hc);
    hc.PixieHighLoaded = true;

    hc.globalPXH = {};
    hc.globalPXH.footerURL = 'google.com';
    // this.globalPXH.standardTooltipDesign = config.standardTooltipDesign;
    // this.globalPXH.dateTimeLabelFormats = config.dateTimeLabelFormats;
    hc.globalPXH.filename = 'ss';
  }
  return hc;
}

@NgModule({
  declarations: [AppComponent, MainComponent, ConfigureComponent, ConfigureHighstockComponent, ConfigureHighmapsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PixieHighchartsModule,
    // PixieHighchartsModule.forRoot(require('highcharts'), require('highcharts/highcharts-more'), require('highcharts/modules/boost'),require('highcharts/modules/exporting')),
    AppRoutingModule
  ],
  // exports: [PixieHighChartsComponent],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
