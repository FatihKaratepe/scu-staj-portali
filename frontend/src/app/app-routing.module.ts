import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { ChangePasswordComponent } from './components/shared/change-password/change-password.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { ForbiddenComponent } from './components/shared/forbidden/forbidden.component';
import { FakulteGuard } from './guards/fakulte.guard';
import { FirmaGuard } from './guards/firma.guard';
import { OgrenciGuard } from './guards/ogrenci.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sifre-degistir', component: ChangePasswordComponent },
  { path: 'fakulte', canActivate: [FakulteGuard], loadChildren: () => import('./components/fakulte/fakulte.module').then(m => m.FakulteModule) },
  { path: 'firma', canActivate: [FirmaGuard], loadChildren: () => import('./components/firma/firma.module').then(m => m.FirmaModule) },
  { path: 'ogrenci', canActivate: [OgrenciGuard], loadChildren: () => import('./components/ogrenci/ogrenci.module').then(m => m.OgrenciModule) },
  { path: '403', component: ForbiddenComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
