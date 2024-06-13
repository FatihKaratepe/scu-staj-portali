import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/siderbar.service';

interface RouterList {
  label: string,
  route: string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private sidebarService: SidebarService) { }

  @Input('userType') set userType(userType: string) {
    switch (userType) {
      case "Fakulte":
        this.routerList = this.fakulteRouterList
        break;
      case "Firma":
        this.routerList = this.firmaRouterList
        break;
      case "Ogrenci":
        this.routerList = this.ogrenciRouterList
        break;
    }
  }

  routerList?: RouterList[]

  ogrenciRouterList: RouterList[] = [
    {
      label: 'Ana Sayfa',
      route: 'ogrenci'
    },
    {
      label: 'Staj Hakkında',
      route: 'ogrenci/staj-hakkinda'
    },
    {
      label: 'Sıkça Sorulan Sorular',
      route: 'ogrenci/staj-sss'
    },
    {
      label: 'Staj Listesi',
      route: 'ogrenci/staj-listesi'
    },
    {
      label: 'Staj Başvurusu',
      route: 'ogrenci/staj-basvuru'
    }
  ]

  fakulteRouterList: RouterList[] = [
    {
      label: 'Ana Sayfa',
      route: 'fakulte'
    },
    {
      label: 'Staj Listesi',
      route: 'fakulte/staj-listesi'
    },
  ]

  firmaRouterList: RouterList[] = [
    {
      label: 'Ana Sayfa',
      route: 'firma'
    },
    {
      label: 'Staj Listesi',
      route: 'firma/staj-listesi'
    },
  ]


  checkToolbar() {
    if (window.innerWidth < 992) {
      this.closeSidebar()
    }
  }

  closeSidebar() {
    this.sidebarService.toggleSidebar();
  }


}
