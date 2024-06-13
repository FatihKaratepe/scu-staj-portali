import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/siderbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(private sidebarService: SidebarService, private authService: AuthService) { }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    this.authService.startAuthentication();
  }

  get firstName() {
    return this.authService.getUserDetails().isim;
  }

  get lastname() {
    return this.authService.getUserDetails().soyisim;
  }

  get userName() {
    return `${this.authService.getUserDetails().isim} ${this.authService.getUserDetails().soyisim}`;
  }

  get photo() {
    return this.authService.getUserDetails().fotograf ?? null;
  }
}
