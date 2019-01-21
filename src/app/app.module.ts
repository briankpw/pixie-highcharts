import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PixieHighchartsModule } from 'pixie-highcharts';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ConfigureComponent } from './configure/configure.component';
import { ConfigureHighstockComponent } from './configure-highstock/configure-highstock.component';
import { ConfigureHighmapsComponent } from './configure-highmaps/configure-highmaps.component';

@NgModule({
  declarations: [AppComponent, MainComponent, ConfigureComponent, ConfigureHighstockComponent, ConfigureHighmapsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PixieHighchartsModule,
    // PixieHighchartsModule.forRoot({ brand: 'AngularFirebase.com' }),
    AppRoutingModule
  ],
  // exports: [PixieHighChartsComponent],
  // providers: [KeyHighConfig],
  bootstrap: [AppComponent]
})
export class AppModule {}
