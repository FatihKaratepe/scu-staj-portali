import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Rapor } from 'src/app/models/rapor.model';
import { Staj } from 'src/app/models/staj.model';
import { OgrenciService } from 'src/app/services/ogrenci.service';

interface StajDay {
  date: string,
  timeStamp: number
}

@Component({
  selector: 'app-staj-detail',
  templateUrl: './staj-detail.component.html',
  styleUrls: ['./staj-detail.component.scss']
})
export class StajDetailComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private ogrenciService: OgrenciService) { }

  stajDays?: Rapor[];
  currentStaj?: Staj;
  currentRaporId$ = new BehaviorSubject<number | undefined>(undefined);
  currentRaporDetail$ = new BehaviorSubject<{ id: number | undefined, baslik: string | undefined, aciklama: string | undefined }>({ id: undefined, baslik: undefined, aciklama: undefined });

  ngOnInit(): void {
    this.getStajDetail();
    this.getStajRapors();
  }

  getStajDetail() {
    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.ogrenciService.getStajDetail(id).subscribe(data => {
      //! TODO: REMOVE COMMENT LINE WHILE PROD
      // if (data.durum !== 'Basvuru Onaylandı') {
      //   this.router.navigate(['/ogrenci/staj-listesi']);
      // } else {
      this.currentStaj = data;
      // }
    })
  }

  getStajRapors() {
    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.ogrenciService.getRapors(id).subscribe(data => {
      this.stajDays = data;
    })
  }

  disableCollapse(date: string) {
    return moment(moment(date).format('DD-MM-YYYY'), 'DD-MM-YYYY').valueOf() > moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY').valueOf();
  }

  addRapor(id: number) {
    this.currentRaporId$.next(id);
  }

  updateRapor(rapor: Rapor) {
    this.currentRaporDetail$.next({ id: rapor.id, baslik: rapor.baslik!, aciklama: rapor.aciklama! });
  }

  raporAdded(event: boolean) {
    if (event) this.getStajRapors();
  }
}
