import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { OgrenciService } from 'src/app/services/ogrenci.service';
import { ControlValid } from 'src/app/helpers/control.helper';


@Component({
  selector: 'app-rapor-detail',
  templateUrl: './rapor-detail.component.html',
  styleUrls: ['./rapor-detail.component.scss']
})
export class RaporDetailComponent {

  controlValid = ControlValid;

  @Input() set raporId(raporId: Observable<number | undefined>) {
    raporId.subscribe(data => {
      if (data) {
        this.currentRaporId = data;
      }
    })
  }
  @Output() raporAdded = new EventEmitter<boolean>();
  constructor(private activatedRoute: ActivatedRoute, private ogrenciService: OgrenciService, private notificationService: NotificationService) { }

  currentRaporId?: number;
  aciklama = new FormControl('', [Validators.required])
  baslik = new FormControl('', [Validators.required])

  addRapor(button: HTMLButtonElement) {
    if (this.aciklama.invalid) {
      this.aciklama.markAsTouched();
    } else {
      const id = Number(this.activatedRoute.snapshot.params['id']);
      this.ogrenciService.addRapor(id, { raporId: this.currentRaporId, baslik: this.baslik.value, aciklama: this.aciklama.value }).subscribe(data => {
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
