import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { ControlValid } from 'src/app/helpers/control.helper';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  controlValid = ControlValid;

  constructor(private authService: AuthService, private notificationService: NotificationService) { }

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmNewPassword: new FormControl('', Validators.required)
  })

  differentPassword?: boolean;

  get oldPassword() { return this.changePasswordForm.get('oldPassword') as FormControl }
  get newPassword() { return this.changePasswordForm.get('newPassword') as FormControl }
  get confirmNewPassword() { return this.changePasswordForm.get('confirmNewPassword') as FormControl }

  ngOnInit(): void {
    combineLatest([this.newPassword.valueChanges, this.confirmNewPassword.valueChanges])
      .subscribe(([newPassword, confirmPassword]) => {
        if (newPassword !== confirmPassword && (newPassword !== '' || newPassword !== '')) {
          this.newPassword.setErrors({ notSame: true }); 0
          this.confirmNewPassword.setErrors({ notSame: true });
          this.newPassword.markAsTouched();
          this.confirmNewPassword.markAsTouched();
          this.differentPassword = false;
        } else {
          this.newPassword.setErrors(null);
          this.confirmNewPassword.setErrors(null);
          this.newPassword.markAsTouched();
          this.confirmNewPassword.markAsTouched();
          this.differentPassword = false;
        }
      })
  }

  changePassword() {
    if (!this.differentPassword && !this.changePasswordForm.invalid) {
      this.authService.changePassword(this.oldPassword.value, this.newPassword.value, this.confirmNewPassword.value).subscribe(data => {
        this.notificationService.showSuccess(`${data.message}. Sistemden çıkış yapılıyor.`, 'Başarılı');
        setTimeout(() => {
          this.authService.startAuthentication();
        }, 2000);
      })
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }


}
