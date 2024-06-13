import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Firma } from 'src/app/models/firma.model';
import { NotificationService } from 'src/app/services/notification.service';
import { OgrenciService } from 'src/app/services/ogrenci.service';
import { ControlValid } from 'src/app/helpers/control.helper';

@Component({
  selector: 'app-new-firma',
  templateUrl: './new-firma.component.html',
  styleUrls: ['./new-firma.component.scss']
})
export class NewFirmaComponent {

  controlValid = ControlValid;
  @Output() firmaAdded$: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private ogrenciService: OgrenciService, private notificationService: NotificationService) { }

  firmaForm = new FormGroup({
    firmaAdi: new FormControl('', Validators.required),
    telefon: new FormControl('', Validators.required),
    adres: new FormControl('', Validators.required),
    hizmetAlani: new FormControl('', Validators.required),
  })

  get firmaAdi() { return this.firmaForm.get('firmaAdi') as FormControl }
  get telefon() { return this.firmaForm.get('telefon') as FormControl }
  get adres() { return this.firmaForm.get('adres') as FormControl }
  get hizmetAlani() { return this.firmaForm.get('hizmetAlani') as FormControl }

  resetForm() {
    this.firmaForm.reset();
  }

  newFirma(closeButton: HTMLButtonElement) {
    if (this.firmaForm.invalid) {
      this.firmaForm.markAllAsTouched()
    } else {
      let values = this.firmaForm.getRawValue();
      this.ogrenciService.addFirma(values).subscribe(data => {
        this.notificationService.showSuccess('Yeni firma başarıyla eklendi', 'Başarılı');
        this.firmaAdded$.next(true);
        closeButton.click();
      })
    }
  }
}
