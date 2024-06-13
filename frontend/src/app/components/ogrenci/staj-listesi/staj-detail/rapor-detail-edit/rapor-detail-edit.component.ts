import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { OgrenciService } from 'src/app/services/ogrenci.service';
import { ControlValid } from 'src/app/helpers/control.helper';


@Component({
  selector: 'app-rapor-detail-edit',
  templateUrl: './rapor-detail-edit.component.html',
  styleUrls: ['./rapor-detail-edit.component.scss']
})
export class RaporDetailEditComponent {

  controlValid = ControlValid;

  @Input() set raporDetail(raporDet: Observable<{ id: number | undefined, baslik: string | undefined, aciklama: string | undefined }>) {
    raporDet.subscribe(data => {
      if (data) {
        this.currentRaporId = data.id;
        this.baslik.patchValue(data.baslik!)
        this.aciklama.patchValue(data.aciklama!)
      }
    })
  }

  @Output() raporAdded = new EventEmitter<boolean>();
  
  constructor(private activatedRoute: ActivatedRoute, private ogrenciService: OgrenciService, private notificationService: NotificationService) { }

  currentRaporId?: number;
  baslik = new FormControl('', [Validators.required])
  aciklama = new FormControl('', [Validators.required])

  updateRapor(button: HTMLButtonElement) {
    if (this.aciklama.invalid) {
      this.aciklama.markAsTouched();
    } else {
      const id = Number(this.activatedRoute.snapshot.params['id']);
      this.ogrenciService.updateRapor(id, { raporId: this.currentRaporId, baslik: this.baslik.value, aciklama: this.aciklama.value }).subscribe(data => {
        this.notificationService.showSuccess('Rapor içeriği başarıyla kaydedildi', 'Başarılı');
        this.raporAdded.emit(true);
        button.click();
      })
    }

  }

  resetForm() {
    this.aciklama.reset()
  }
}
