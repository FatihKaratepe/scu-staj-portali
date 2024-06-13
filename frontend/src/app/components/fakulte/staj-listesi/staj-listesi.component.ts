import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Staj } from 'src/app/models/staj.model';
import { FakulteService } from 'src/app/services/fakulte.service';
import { OgrenciService } from 'src/app/services/ogrenci.service';
import * as _ from 'lodash';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { ControlValid } from 'src/app/helpers/control.helper';
import * as moment from 'moment';

@Component({
  selector: 'app-staj-listesi',
  templateUrl: './staj-listesi.component.html',
  styleUrls: ['./staj-listesi.component.scss']
})
export class StajListesiComponent implements OnInit {

  constructor(private fakulteService: FakulteService, private router: Router, private ogrenciService: OgrenciService) { }

  controlValid = ControlValid;

  stajList: Staj[] = []
  activeStatus: string = 'Onay Bekliyor';
  ogrenciNo = new FormControl('');
  searchActive: boolean = false;
  tamamlanacakStajId?: number;
  mevcutGunSayisi?: string;
  belgeLoading: boolean = false;
  selectedStaj$ = new BehaviorSubject<Staj | undefined>(undefined);

  stajTamamlamaForm = new FormGroup({
    gunSayisi: new FormControl('', Validators.required)
  })

  get gunSayisi() { return this.stajTamamlamaForm.get('gunSayisi') as FormControl }

  ngOnInit(): void {
    this.getStajList();
    this.filterOgrenci();
  }

  stajTamamla(staj: Staj) {
    this.tamamlanacakStajId = staj.id;
    this.mevcutGunSayisi = this.getGunSayisi(staj.bitisTarihi, staj.baslangicTarihi, staj.gunSayisi === 6);
  }

  stajTamamlama(closeButton: HTMLButtonElement) {
    if (this.stajTamamlamaForm.invalid) {
      this.stajTamamlamaForm.markAllAsTouched()
    } else {
      this.fakulteService.kabulEdilenGun(this.tamamlanacakStajId!, Number(this.gunSayisi.value)).subscribe(data => {
        this.fakulteService.changeStajStatus(this.tamamlanacakStajId!, 'Tamamlandı').subscribe(tData => {
          this.tamamlanacakStajId = undefined;
          this.mevcutGunSayisi = undefined;
          closeButton.click();
        })
      })
    }
  }

  resetForm() {
    this.stajTamamlamaForm.reset()
  }

  filterOgrenci() {
    this.ogrenciNo.valueChanges.pipe(debounceTime(200)).subscribe(data => {
      if (data?.length! > 0) {
        this.fakulteService.stajSearch(data!, this.activeStatus).subscribe(stajs => {
          this.stajList = stajs;
          this.searchActive = true;
        })
      } else {
        this.searchActive = false;
        this.getStajList();
      }
    })
  }

  changeStatus(status: string) {
    this.activeStatus = status;
    this.getStajList();
  }

  getStajList() {
    this.fakulteService.getStajList(this.activeStatus).subscribe(data => {
      this.stajList = data;
    })
  }

  approveStaj(id: number) {
    this.fakulteService.approveStaj(id).subscribe(data => {
      this.getStajList();
    })
  }

  changeStajStatus(stajId: number, durum: string) {
    this.fakulteService.changeStajStatus(stajId, durum).subscribe(data => {
      this.getStajList();
    })
  }

  updateStaj(staj: Staj) {
    this.selectedStaj$.next(staj);
  }

  stajUpdated(event: boolean) {
    if (event) this.getStajList();
  }

  printSicil(stajId: number) {
    this.belgeLoading = true;
    this.fakulteService.printSicil(stajId).subscribe(data => {
      this.belgeLoading = false;
      window.open()?.document.write(`<head><style>body{margin: 0; padding: 0;}</style></head><embed width="100%" height="100%" src="data:application/pdf;base64,${data.data}" type="application/pdf" />`);
    })
  }

  printDefter(stajId: number) {
    this.belgeLoading = true;
    this.fakulteService.printDefter(stajId).subscribe(data => {
      this.belgeLoading = false;
      window.open()?.document.write(`<head><style>body{margin: 0; padding: 0;}</style></head><embed width="100%" height="100%" src="data:application/pdf;base64,${data.data}" type="application/pdf" />`);
    })
  }

  getGunSayisi(date1: string, date2: string, isSixDay: boolean) {
    let current = moment(date2);
    const end = moment(date1);
    let result = [];
    while (current <= end) {
      const dayOfWeek = current.day();
      if (isSixDay && dayOfWeek !== 0) {
        result.push(current.format('YYYY-MM-DD'));
      } else if (!isSixDay && dayOfWeek >= 1 && dayOfWeek <= 5) {
        result.push(current.format('YYYY-MM-DD'));
      }
      current.add(1, 'day');
    }
    return (result.length).toString();
  }
}
