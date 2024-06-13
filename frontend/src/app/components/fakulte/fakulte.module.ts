import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakulteRoutingModule } from './fakulte-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StajListesiComponent } from './staj-listesi/staj-listesi.component';
import { StajDetailComponent } from './staj-listesi/staj-detail/staj-detail.component';
import { SharedModule } from '../shared/shared.module';
import { BasvuruUpdateComponent } from './staj-listesi/basvuru-update/basvuru-update.component';



@NgModule({
  declarations: [
    DashboardComponent,
    StajListesiComponent,
    StajDetailComponent,
    BasvuruUpdateComponent,
  ],
  imports: [
    CommonModule,
    FakulteRoutingModule,
    SharedModule
  ],
  exports: [
  ]
})
export class FakulteModule { }
