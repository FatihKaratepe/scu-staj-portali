import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ControlValid } from 'src/app/helpers/control.helper';
import { NotificationService } from 'src/app/services/notification.service';
const emailPattern = /^(?=.{1,256}$)(?=.{1,64}@.{1,255}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild('userNameInput') userNameInput?: ElementRef;

  constructor(private authService: AuthService, private notificationService: NotificationService) { }

  controlValid = ControlValid;

  loginForm = new FormGroup({
    userType: new FormControl(undefined, [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  placeholders = {
    userType: 'Kullanıcı Tipi',
    userName: 'Kullanıcı Adı',
    password: 'Şifre',
  }

  get userType() { return this.loginForm.get('userType') as FormControl }
  get userName() { return this.loginForm.get('userName') as FormControl }
  get password() { return this.loginForm.get('password') as FormControl }

  ngOnInit(): void {
    document.querySelector('main')?.classList.remove('show-sidebar');
    document.querySelector('app-sidebar')?.classList.remove('show');
    this.userType.valueChanges.subscribe(data => {
      if (data === 'Firma') {
        this.userName.setValidators([Validators.required, Validators.pattern(emailPattern)]);
        this.placeholders.userName = "Firma Yetkili E-Postası"
      } else {
        this.userName.setValidators([Validators.required])
        this.placeholders.userName = "Öğrenciler Öğr.No/Personel TC Kim.No"
      }
      this.userNameInput?.nativeElement.focus();
    })
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login(this.userType.value, this.userName.value, this.password.value).subscribe(data => {
        if (data.message) {
          this.notificationService.showInfo(data.message, 'Bilgi')
        } else {
          this.authService.setUserDetails(data, this.userType.value, true);
        }
      })
    }
  }

  ngOnDestroy(): void {
    document.querySelector('main')?.classList.add('show-sidebar');
    document.querySelector('app-sidebar')?.classList.add('show');
  }
}
