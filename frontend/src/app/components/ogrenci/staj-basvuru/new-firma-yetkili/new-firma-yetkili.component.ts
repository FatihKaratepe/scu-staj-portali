import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ControlValid } from 'src/app/helpers/control.helper';
import { NotificationService } from 'src/app/services/notification.service';
import { OgrenciService } from 'src/app/services/ogrenci.service';
const emailPattern = /^(?=.{1,256}$)(?=.{1,64}@.{1,255}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


@Component({
  selector: 'app-new-firma-yetkili',
  templateUrl: './new-firma-yetkili.component.html',
  styleUrls: ['./new-firma-yetkili.component.scss']
})
export class NewFirmaYetkiliComponent {

  controlValid = ControlValid;
  @Output() firmaYetkiliAdded$: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('firmaId') set firmaId(id: Observable<number | undefined>) {
    id.subscribe(data => {
      this.currentFirmaId = data;
    })
  }

  constructor(private ogrenciService: OgrenciService, private notificationService: NotificationService) { }

  currentFirmaId?: number;

  firmaYetkiliForm = new FormGroup({
    isim: new FormControl('', Validators.required),
    soyisim: new FormControl('', Validators.required),
    gorev: new FormControl('', Validators.required),
    eposta: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
  })

  get isim() { return this.firmaYetkiliForm.get('isim') as FormControl }
  get soyisim() { return this.firmaYetkiliForm.get('soyisim') as FormControl }
  get gorev() { return this.firmaYetkiliForm.get('gorev') as FormControl }
  get eposta() { return this.firmaYetkiliForm.get('eposta') as FormControl }

  resetForm() {
    this.firmaYetkiliForm.reset();
  }

  newFirmaYetkili(closeButton: HTMLButtonElement) {
    if (this.firmaYetkiliForm.invalid) {
      this.firmaYetkiliForm.markAllAsTouched()
    } else {
      let values = {
        ...this.firmaYetkiliForm.getRawValue(),
        firmaId: this.currentFirmaId
      };
      this.ogrenciService.addFirmaYetkili(values).subscribe(data => {
        this.notificationService.showSuccess('Yeni firma yetkilisi başarıyla eklendi', 'Başarılı');
        this.firmaYetkiliAdded$.next(true);
        closeButton.click();
      })
    }
  }

}
