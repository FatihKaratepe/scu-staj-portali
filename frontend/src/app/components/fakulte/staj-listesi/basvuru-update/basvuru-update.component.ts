import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ControlValid } from 'src/app/helpers/control.helper';
import { FirmaYetkili } from 'src/app/models/firma-yetkili.model';
import { Firma } from 'src/app/models/firma.model';
import { Staj } from 'src/app/models/staj.model';
import { FirmaService } from 'src/app/services/firma.service';
import { NotificationService } from 'src/app/services/notification.service';
const emailPattern = /^(?=.{1,256}$)(?=.{1,64}@.{1,255}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Component({
  selector: 'app-basvuru-update',
  templateUrl: './basvuru-update.component.html',
  styleUrls: ['./basvuru-update.component.scss']
})
export class BasvuruUpdateComponent {

  controlValid = ControlValid;

  @Input('staj$') set staj$(selectedStaj: Observable<Staj | undefined>) {
    selectedStaj.subscribe(data => {
      if (data) {
        this.staj = data;

        this.firmaService.getFirmaYetkili(data.firmaYetkiliId).subscribe(firmaYetkiliData => {
          this.firmaYetkili = firmaYetkiliData;
          this.firmaYetkiliForm.patchValue({
            isim: firmaYetkiliData.isim,
            soyisim: firmaYetkiliData.soyisim,
            eposta: firmaYetkiliData.eposta,
            gorev: firmaYetkiliData.gorev
          })
        })
        this.firmaService.getFirma(data.firmaId).subscribe(firmaData => {
          this.firma = firmaData;
          this.firmaForm.patchValue({
            firmaAdi: firmaData.firmaAdi,
            telefon: firmaData.telefon,
            adres: firmaData.adres,
            hizmetAlani: firmaData.hizmetAlani
          })
        })
      }
    })
  }

  @Output('updated') updated$ = new EventEmitter<boolean>();

  constructor(private firmaService: FirmaService, private notificationService: NotificationService) { }

  get firmaAdi() { return this.firmaForm.get('firmaAdi') as FormControl }
  get telefon() { return this.firmaForm.get('telefon') as FormControl }
  get hizmetAlani() { return this.firmaForm.get('hizmetAlani') as FormControl }
  get adres() { return this.firmaForm.get('adres') as FormControl }

  get isim() { return this.firmaYetkiliForm.get('isim') as FormControl }
  get soyisim() { return this.firmaYetkiliForm.get('soyisim') as FormControl }
  get eposta() { return this.firmaYetkiliForm.get('eposta') as FormControl }
  get gorev() { return this.firmaYetkiliForm.get('gorev') as FormControl }

  staj?: Staj;
  firma?: Firma;
  firmaYetkili?: FirmaYetkili;

  firmaYetkiliForm = new FormGroup({
    isim: new FormControl('', Validators.required),
    soyisim: new FormControl('', Validators.required),
    gorev: new FormControl('', Validators.required),
    eposta: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
  })

  firmaForm = new FormGroup({
    firmaAdi: new FormControl('', Validators.required),
    telefon: new FormControl('', Validators.required),
    adres: new FormControl('', Validators.required),
    hizmetAlani: new FormControl('', Validators.required),
  })


  sendAuth() {
    this.firmaService.sendAuthFirmaYetkili(this.staj?.firmaYetkiliId!).subscribe(data => {
      this.notificationService.showSuccess(data.message, 'Başarılı');
    })
  }

  updateFirma() {
    const firmaDto = {
      firmaAdi: this.firmaAdi.value,
      telefon: this.telefon.value,
      adres: this.adres.value,
      hizmetAlani: this.hizmetAlani.value,
    }
    this.firmaService.updateFirma(this.staj?.firmaId!, firmaDto).subscribe(data => {
      this.notificationService.showSuccess(data.message, 'Başarılı')
    })
  }

  updateFirmaYetkili() {
    const firmaYetkiliDto = {
      isim: this.isim.value,
      soyisim: this.soyisim.value,
      gorev: this.gorev.value,
      eposta: this.eposta.value,
    }
    this.firmaService.updateFirmaYetkili(this.staj?.firmaYetkiliId!, firmaYetkiliDto).subscribe(data => {
      this.notificationService.showSuccess(data.message, 'Başarılı')
    })
  }

  startUpdate(closeButton: HTMLButtonElement) {
    this.updateFirma();
    this.updateFirmaYetkili();
    this.updated$.emit(true);
    closeButton.click()
  }

  closeModal() {
    this.firma = undefined;
    this.firmaYetkili = undefined;
    this.staj = undefined;
    this.firmaForm.reset();
    this.firmaYetkiliForm.reset();
  }


}
