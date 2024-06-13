import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import * as moment from 'moment';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ControlValid } from 'src/app/helpers/control.helper';
import { FirmaYetkili } from 'src/app/models/firma-yetkili.model';
import { Firma } from 'src/app/models/firma.model';
import { FirmaService } from 'src/app/services/firma.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OgrenciService } from 'src/app/services/ogrenci.service';

@Component({
  selector: 'app-staj-basvuru',
  templateUrl: './staj-basvuru.component.html',
  styleUrls: ['./staj-basvuru.component.scss']
})
export class StajBasvuruComponent implements OnInit {

  constructor(private firmaService: FirmaService, private ogrenciService: OgrenciService, private notificationService: NotificationService, private router: Router) { }

  controlValid = ControlValid;
  firmaId$ = new BehaviorSubject<number | undefined>(undefined);

  basvuruForm = new FormGroup({
    baslangicTarihi: new FormControl('', Validators.required),
    bitisTarihi: new FormControl('', Validators.required),
    stajKonusu: new FormControl('', Validators.required),
    gunSayisi: new FormControl(undefined, Validators.required),
    sigortaDurumu: new FormControl(undefined, Validators.required),
    firmaId: new FormControl(undefined, Validators.required),
    firmaYetkiliId: new FormControl(undefined, Validators.required),
  })

  firmaList: Firma[] = [];
  firmaYetkiliList: FirmaYetkili[] = [];
  stajGunList: string[] = [];

  get baslangicTarihi() { return this.basvuruForm.controls.baslangicTarihi as FormControl }
  get bitisTarihi() { return this.basvuruForm.controls.bitisTarihi as FormControl }
  get stajKonusu() { return this.basvuruForm.controls.stajKonusu as FormControl }
  get gunSayisi() { return this.basvuruForm.controls.gunSayisi as FormControl }
  get sigortaDurumu() { return this.basvuruForm.controls.sigortaDurumu as FormControl }
  get firma() { return this.basvuruForm.controls.firmaId as FormControl }
  get firmaYetkili() { return this.basvuruForm.controls.firmaYetkiliId as FormControl }

  ngOnInit(): void {
    this.getFirmaList();
    this.controlDates()
    this.calculateDayCount()
  }

  getFirmaList() {
    this.firmaService.getFirmaList().subscribe(data => this.firmaList = data);
  }

  getFirmaYetkiliList(firmaId: number) {
    this.firmaService.getFirmaYetkiliList(firmaId).subscribe(data => this.firmaYetkiliList = data);
  }

  changeFirma(firmaId: number) {
    this.firmaId$.next(firmaId);
    this.getFirmaYetkiliList(firmaId);
  }

  newFirmaAdded(event: boolean) {
    if (event) this.getFirmaList()
  }

  selectControl(select: NgSelectComponent) {
    select.close()
  }

  newFirmaYetkiliAdded(event: boolean) {
    if (event) this.getFirmaYetkiliList(this.firma.value);
  }

  stajBasvuru() {
    if (this.basvuruForm.invalid) {
      this.basvuruForm.markAllAsTouched()
    } else {
      this.ogrenciService.addBasvuru(this.basvuruForm.getRawValue()).subscribe(data => {
        this.notificationService.showSuccess('Staj başvurusu başarıyla yapıldı', 'Başarılı');
        this.router.navigate(['ogrenci/staj-listesi']);
      })
    }
  }

  controlDates() {
    combineLatest([this.baslangicTarihi.valueChanges, this.bitisTarihi.valueChanges]).subscribe(([baslangic, bitis]) => {
      let nowValue = moment().valueOf()
      let baslangicValue = moment(baslangic, 'YYYY-MM-DD').valueOf()
      let bitisValue = moment(bitis, 'YYYY-MM-DD').valueOf()
      let minControl = moment(baslangic, 'YYYY-MM-DD').add(10, 'days').valueOf()

      if (nowValue >= baslangicValue) {
        this.baslangicTarihi.setErrors({ minDate: true });
        return
      }

      if (baslangicValue >= bitisValue) {
        this.baslangicTarihi.setErrors({ invalid: true });
        this.bitisTarihi.setErrors({ invalid: true });
      } else {
        if (bitisValue < minControl) {
          this.baslangicTarihi.setErrors({ invalidMin: true });
          this.bitisTarihi.setErrors({ invalidMin: true });
        } else {
          this.baslangicTarihi.setErrors(null);
          this.bitisTarihi.setErrors(null);
        }
      }

    })
  }

  calculateDayCount() {
    this.gunSayisi.valueChanges.subscribe(gunSayisi => {
      if (this.baslangicTarihi.valid && this.bitisTarihi.valid) {
        let current = moment(this.baslangicTarihi.value, 'YYYY-MM-DD');
        const end = moment(this.bitisTarihi.value, 'YYYY-MM-DD');

        let isSixDay = gunSayisi === 6;
        let result = [];
        while (current <= end) {
          const dayOfWeek = current.day();
          if (isSixDay && dayOfWeek !== 0) {
            result.push(current.locale('TR-tr').format('LL - dddd'));
          } else if (!isSixDay && dayOfWeek >= 1 && dayOfWeek <= 5) {
            result.push(current.locale('TR-tr').format('LL - dddd'));
          }
          current.add(1, 'day');
        }
        this.stajGunList = result;
      }
    })
  }

}
