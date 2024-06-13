import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OgrenciRoutingModule } from './ogrenci-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StajHakkindaComponent } from './staj-hakkinda/staj-hakkinda.component';
import { StajSikcaSorulanSorularComponent } from './staj-sikca-sorulan-sorular/staj-sikca-sorulan-sorular.component';
import { StajListesiComponent } from './staj-listesi/staj-listesi.component';
import { StajDetailComponent } from './staj-listesi/staj-detail/staj-detail.component';
import { RaporDetailComponent } from './staj-listesi/staj-detail/rapor-detail/rapor-detail.component';
import { StajBasvuruComponent } from './staj-basvuru/staj-basvuru.component';
import { SharedModule } from '../shared/shared.module';
import { NewFirmaComponent } from './staj-basvuru/new-firma/new-firma.component';
import { NewFirmaYetkiliComponent } from './staj-basvuru/new-firma-yetkili/new-firma-yetkili.component';
import { RaporDetailEditComponent } from './staj-listesi/staj-detail/rapor-detail-edit/rapor-detail-edit.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StajHakkindaComponent,
    StajSikcaSorulanSorularComponent,
    StajListesiComponent,
    StajDetailComponent,
    RaporDetailComponent,
    StajBasvuruComponent,
    NewFirmaComponent,
    NewFirmaYetkiliComponent,
    RaporDetailEditComponent
  ],
  imports: [
    SharedModule,
    OgrenciRoutingModule
  ]
})
export class OgrenciModule { }
