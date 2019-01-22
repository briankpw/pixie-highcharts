import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ConfigureComponent } from './configure/configure.component';
import { ConfigureHighstockComponent } from './configure-highstock/configure-highstock.component';
import { ConfigureHighmapsComponent } from './configure-highmaps/configure-highmaps.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'configure',
    component: ConfigureComponent
  },
  {
    path: 'configure-stock',
    component: ConfigureHighstockComponent
  },
  {
    path: 'configure-map',
    component: ConfigureHighmapsComponent
  },

  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
  providers: []
})
export class AppRoutingModule {}
