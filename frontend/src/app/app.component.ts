import { Component, OnInit } from '@angular/core';
import { environment } from './environments/environment';
import { NavigationStart, Router } from '@angular/router';
import { SidebarService } from './services/siderbar.service';
import * as jwt_decode from "jwt-decode";
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userType?: string;
  showSideBar$ = this.sidebarService.sidebarStatus;

  constructor(private router: Router, private sidebarService: SidebarService, private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem(environment.storageName) === null) {
      this.router.navigate(['login']);
    } else {
      let item = JSON.parse(localStorage.getItem(environment.storageName)!).token;
      let exp = jwt_decode.jwtDecode(item).exp! * 1000;
      let now = Date.now().valueOf();
      if (now > exp) {
        localStorage.removeItem(environment.storageName);
        this.router.navigate(['login']);
      }
      this.userType = JSON.parse(localStorage.getItem(environment.storageName)!).userType
    }

    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((data: any) => {
      if (data.url === '/') {
        const userDetails = this.authService.getUserDetails();
        if (userDetails) {
          if (userDetails.userType === 'Ogrenci') this.router.navigate(['ogrenci/']);
          else if (userDetails.userType === 'Fakulte') this.router.navigate(['fakulte/']);
          else if (userDetails.userType === 'Firma') this.router.navigate(['firma/']);
        } else {
          this.router.navigate(['login']);
        }
      }
    })
  }

  closeSideBar() {
    if (window.innerWidth < 992) this.sidebarService.toggleSidebar()
  }
}
