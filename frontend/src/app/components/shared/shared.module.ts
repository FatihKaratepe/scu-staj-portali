import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { DayBetweenPipe } from './pipes/day-between.pipe';
import { FirmaNameComponent } from './firma-name/firma-name.component';
import { FirmaYetkiliNameComponent } from './firma-yetkili-name/firma-yetkili-name.component';
import { OgrenciNameComponent } from './ogrenci-name/ogrenci-name.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfilePhotoPlaceholderComponent } from './profile-photo-placeholder/profile-photo-placeholder.component';


@NgModule({
  declarations: [
    LoginComponent,
    SidebarComponent,
    ToolbarComponent,
    DayBetweenPipe,
    FirmaNameComponent,
    FirmaYetkiliNameComponent,
    OgrenciNameComponent,
    ChangePasswordComponent,
    ClickOutsideDirective,
    PasswordStrengthBarComponent,
    ForbiddenComponent,
    NotFoundComponent,
    ProfilePhotoPlaceholderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      closeButton: true,
      progressBar: true
    }),
  ],
  exports: [
    CommonModule,
    LoginComponent,
    SidebarComponent,
    ToolbarComponent,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxMaskDirective,
    NgxMaskPipe,
    DayBetweenPipe,
    FirmaNameComponent,
    FirmaYetkiliNameComponent,
    OgrenciNameComponent,
    ChangePasswordComponent,
    ClickOutsideDirective,
    PasswordStrengthBarComponent,
    ForbiddenComponent,
    NotFoundComponent,
    ProfilePhotoPlaceholderComponent
  ],
  providers: [
    provideNgxMask()
  ]
})
export class SharedModule { }
