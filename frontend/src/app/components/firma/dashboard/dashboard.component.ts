import { Component, OnInit } from '@angular/core';
import { FirmaService } from 'src/app/services/firma.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private firmaService: FirmaService) { }


  onayBekleyenRaporList: { stajId: number, raporId: number, tarih: string, ogrenciNo: string, durum: string }[] = []

  ngOnInit(): void {
    this.getOnayBekleyenStajs();
  }

  getOnayBekleyenStajs() {
    this.firmaService.getFirmaYetkiliRapors().subscribe(data => {
      this.onayBekleyenRaporList = data;
    })
  }
}
