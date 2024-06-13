import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ControlValid } from 'src/app/helpers/control.helper';
import { Staj } from 'src/app/models/staj.model';
import { OgrenciService } from 'src/app/services/ogrenci.service';

@Component({
  selector: 'app-staj-listesi',
  templateUrl: './staj-listesi.component.html',
  styleUrls: ['./staj-listesi.component.scss']
})
export class StajListesiComponent implements OnInit {

  constructor(private ogrenciService: OgrenciService, private router: Router) { }

  controlValid = ControlValid;
  stajList: Staj[] = []
  belgeLoading: boolean = false;
  printStajId?: number;

  kimlikBilgiForm = new FormGroup({
    babaAdi: new FormControl('', Validators.required),
    anaAdi: new FormControl('', Validators.required),
    dogumYeri: new FormControl('', Validators.required),
    dogumTarihi: new FormControl('', Validators.required),
    tcNo: new FormControl('', Validators.required),
    seriNo: new FormControl('', Validators.required),
    kayitliOlduguIl: new FormControl('', Validators.required),
    kayitliOlduguIlce: new FormControl('', Validators.required),
    mahalle: new FormControl('', Validators.required),
    ciltNo: new FormControl('', Validators.required),
    aileSiraNo: new FormControl('', Validators.required),
    siraNo: new FormControl('', Validators.required),
    verildigiYer: new FormControl('', Validators.required)
  })

  get babaAdi() { return this.kimlikBilgiForm.get('babaAdi') as FormControl }
  get anaAdi() { return this.kimlikBilgiForm.get('anaAdi') as FormControl }
  get dogumYeri() { return this.kimlikBilgiForm.get('dogumYeri') as FormControl }
  get dogumTarihi() { return this.kimlikBilgiForm.get('dogumTarihi') as FormControl }
  get tcNo() { return this.kimlikBilgiForm.get('tcNo') as FormControl }
  get seriNo() { return this.kimlikBilgiForm.get('seriNo') as FormControl }
  get kayitliOlduguIl() { return this.kimlikBilgiForm.get('kayitliOlduguIl') as FormControl }
  get kayitliOlduguIlce() { return this.kimlikBilgiForm.get('kayitliOlduguIlce') as FormControl }
  get mahalle() { return this.kimlikBilgiForm.get('mahalle') as FormControl }
  get ciltNo() { return this.kimlikBilgiForm.get('ciltNo') as FormControl }
  get aileSiraNo() { return this.kimlikBilgiForm.get('aileSiraNo') as FormControl }
  get siraNo() { return this.kimlikBilgiForm.get('siraNo') as FormControl }
  get verildigiYer() { return this.kimlikBilgiForm.get('verildigiYer') as FormControl }

  ngOnInit(): void {
    this.ogrenciService.getStajList().subscribe(data => {
      this.stajList = data;
    })
  }

  setPrintId(stajId: number) {
    this.printStajId = stajId;
  }

  printBasvuru(closeButton: HTMLButtonElement) {
    if (this.kimlikBilgiForm.invalid) {
      this.kimlikBilgiForm.markAllAsTouched();
    } else {
      this.belgeLoading = true;
      let babaAdi = this.toTitleCase(this.babaAdi.value);
      let anaAdi = this.toTitleCase(this.anaAdi.value);
      let dogumYeri = this.toTitleCase(this.dogumYeri.value);
      let dogumTarihi = moment(this.dogumTarihi.value).format('DD/MM/YYYY');
      let tcNo = this.toTitleCase(this.tcNo.value);
      let seriNo = this.toTitleCase(this.seriNo.value);
      let kayitliOlduguIl = this.toTitleCase(this.kayitliOlduguIl.value);
      let kayitliOlduguIlce = this.toTitleCase(this.kayitliOlduguIlce.value);
      let mahalle = this.toTitleCase(this.mahalle.value);
      let ciltNo = this.toTitleCase(this.ciltNo.value);
      let aileSiraNo = this.toTitleCase(this.aileSiraNo.value);
      let siraNo = this.toTitleCase(this.siraNo.value);
      let verildigiYer = this.toTitleCase(this.verildigiYer.value);
      this.ogrenciService.printBasvuru(this.printStajId!, babaAdi, anaAdi, dogumYeri, dogumTarihi, tcNo, seriNo, kayitliOlduguIl, kayitliOlduguIlce, mahalle, ciltNo, aileSiraNo, siraNo, verildigiYer).subscribe(data => {
        closeButton.click();
        this.belgeLoading = false;
        this.printStajId = undefined;
        window.open()?.document.write(`<head><style>body{margin: 0; padding: 0;}</style></head><embed width="100%" height="100%" src="data:application/pdf;base64,${data.data}" type="application/pdf" />`);
      })
    }
  }

  toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  resetForm() {
    this.kimlikBilgiForm.reset();
  }

  stajDetail(id: number) {
    this.router.navigate(['/ogrenci/staj-listesi/staj', id]);
  }
}
