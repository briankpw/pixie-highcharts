import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HighchartsComponent } from './lib/src/highcharts/highcharts.component';


@NgModule({
  declarations: [
    AppComponent,
    HighchartsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
