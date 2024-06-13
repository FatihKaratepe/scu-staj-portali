import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StajListesiComponent } from './staj-listesi/staj-listesi.component';
import { StajDetailComponent } from './staj-listesi/staj-detail/staj-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'staj-listesi', component: StajListesiComponent },
  { path: 'staj-listesi/staj/:id', component: StajDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirmaRoutingModule { }