import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirmaRoutingModule } from './firma-routing.module';
import { StajListesiComponent } from './staj-listesi/staj-listesi.component';
import { StajDetailComponent } from './staj-listesi/staj-detail/staj-detail.component';
import { SharedModule } from '../shared/shared.module';
import { NotSelectComponent } from './staj-listesi/staj-detail/not-select/not-select.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StajListesiComponent,
    StajDetailComponent,
    NotSelectComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FirmaRoutingModule
  ]
})
export class FirmaModule { }
