import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StajHakkindaComponent } from './staj-hakkinda/staj-hakkinda.component';
import { StajSikcaSorulanSorularComponent } from './staj-sikca-sorulan-sorular/staj-sikca-sorulan-sorular.component';
import { StajListesiComponent } from './staj-listesi/staj-listesi.component';
import { StajBasvuruComponent } from './staj-basvuru/staj-basvuru.component';
import { StajDetailComponent } from './staj-listesi/staj-detail/staj-detail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'staj-hakkinda', component: StajHakkindaComponent },
  { path: 'staj-sss', component: StajSikcaSorulanSorularComponent },
  { path: 'staj-listesi', component: StajListesiComponent },
  { path: 'staj-basvuru', component: StajBasvuruComponent },
  { path: 'staj-listesi/staj/:id', component: StajDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OgrenciRoutingModule { }
