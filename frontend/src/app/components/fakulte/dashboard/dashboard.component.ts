import { Component, OnInit } from '@angular/core';
import { Staj } from 'src/app/models/staj.model';
import { FakulteService } from 'src/app/services/fakulte.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private fakulteService: FakulteService) { }

  onayBekleyenStajList: Staj[] = [];
  onaylanmisStajList: Staj[] = [];
  reddedilenStajList: Staj[] = [];
  tamamlanmisStajList: Staj[] = [];

  ngOnInit(): void {
    this.getOnayBekleyenStajs();
    this.getOnaylanmisStajs();
    this.getReddedilenStajs();
    this.getTamamlanmisStajs();
  }

  getOnayBekleyenStajs() {
    this.fakulteService.getStajList('Onay Bekliyor').subscribe(data => {
      this.onayBekleyenStajList = data.slice(0, 5);
    })
  }

  getOnaylanmisStajs() {
    this.fakulteService.getStajList('Basvuru Onaylandı').subscribe(data => {
      this.onaylanmisStajList = data.slice(0, 5);
    })
  }

  getBasvuruReddedilenStajs() {
    this.fakulteService.getStajList('Basvuru Reddedildi').subscribe(data => {
      this.reddedilenStajList = data.slice(0, 5);
    })
  }

  getFirmaOnayiStajs() {
    this.fakulteService.getStajList('Firma Onayı').subscribe(data => {
      this.reddedilenStajList = data.slice(0, 5);
    })
  }

  getTamamlanmisStajs() {
    this.fakulteService.getStajList('Tamamlandı').subscribe(data => {
      this.tamamlanmisStajList = data.slice(0, 5);
    })
  }

  getReddedilenStajs() {
    this.fakulteService.getStajList('Staj Reddedildi').subscribe(data => {
      this.reddedilenStajList = data.slice(0, 5);
    })
  }
}
