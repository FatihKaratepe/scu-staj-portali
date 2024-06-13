import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Staj } from 'src/app/models/staj.model';
import { FirmaService } from 'src/app/services/firma.service';

@Component({
  selector: 'app-staj-listesi',
  templateUrl: './staj-listesi.component.html',
  styleUrls: ['./staj-listesi.component.scss']
})
export class StajListesiComponent implements OnInit {

  constructor(private firmaService: FirmaService, private router: Router) { }

  stajList: Staj[] = []

  ngOnInit(): void {
    this.getStajList()
  }

  getStajList() {
    this.firmaService.getFirmaStajList().subscribe(data => {
      this.stajList = data;
    })
  }

  stajDetail(staj: Staj) {
    //! TODO: REMOVE COMMENT LINE WHEN COMPLETE FAKULTE
    if (staj.durum === 'Basvuru Onaylandı') {
      this.router.navigate(['/firma/staj-listesi/staj', staj.id]);
    }
  }
}
