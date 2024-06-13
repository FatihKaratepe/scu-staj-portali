import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ControlValid } from 'src/app/helpers/control.helper';
import { Rapor } from 'src/app/models/rapor.model';
import { Staj } from 'src/app/models/staj.model';
import { FirmaService } from 'src/app/services/firma.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-staj-detail',
  templateUrl: './staj-detail.component.html',
  styleUrls: ['./staj-detail.component.scss']
})
export class StajDetailComponent implements OnInit, AfterViewInit {

  controlValid = ControlValid;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private firmaService: FirmaService, private notificationService: NotificationService, private viewportScroller: ViewportScroller) { }

  @ViewChild('openSicilButton') openSicilButton!: ElementRef

  stajDays?: Rapor[];
  currentStaj?: Staj;

  sicilForm = new FormGroup({
    subeBirim: new FormControl('', Validators.required),
    devamDurumu: new FormControl(undefined, Validators.required),
    devamDurumuDusunce: new FormControl('', Validators.required),
    calismaGayreti: new FormControl(undefined, Validators.required),
    calismaGayretiDusunce: new FormControl('', Validators.required),
    isiTamYapma: new FormControl(undefined, Validators.required),
    isiTamYapmaDusunce: new FormControl('', Validators.required),
    isYeriTutumu: new FormControl(undefined, Validators.required),
    isYeriTutumuDusunce: new FormControl('', Validators.required)
  })

  get subeBirim() { return this.sicilForm.get('subeBirim') as FormControl }
  get devamDurumu() { return this.sicilForm.get('devamDurumu') as FormControl }
  get devamDurumuDusunce() { return this.sicilForm.get('devamDurumuDusunce') as FormControl }
  get calismaGayreti() { return this.sicilForm.get('calismaGayreti') as FormControl }
  get calismaGayretiDusunce() { return this.sicilForm.get('calismaGayretiDusunce') as FormControl }
  get isiTamYapma() { return this.sicilForm.get('isiTamYapma') as FormControl }
  get isiTamYapmaDusunce() { return this.sicilForm.get('isiTamYapmaDusunce') as FormControl }
  get isYeriTutumu() { return this.sicilForm.get('isYeriTutumu') as FormControl }
  get isYeriTutumuDusunce() { return this.sicilForm.get('isYeriTutumuDusunce') as FormControl }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.firmaService.getFirmaStaj(id).subscribe(data => {
      this.currentStaj = data;
    })
    this.getStajList()
  }

  ngAfterViewInit(): void {
    const activeRapor = this.activatedRoute.snapshot.queryParams['activeRapor'];
    if (activeRapor) {
      setTimeout(() => {
        const currentRaporElement = document.getElementById(activeRapor);
        if (currentRaporElement) {
          this.viewportScroller.scrollToPosition([0, (currentRaporElement.offsetTop - 50)]);
          currentRaporElement.click()
        }
      }, 200)
    }

  }

  getStajList() {
    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.firmaService.getFirmaYetkiliRaporList(id).subscribe(data => {
      this.stajDays = data;
    })
  }

  disableCollapse(date: string) {
    return moment(moment(date).format('DD-MM-YYYY'), 'DD-MM-YYYY').valueOf() > moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY').valueOf();
  }

  changeRaporStatus(id: number, durum: string, index: number) {
    const stajId = Number(this.activatedRoute.snapshot.params['id']);
    this.firmaService.changeRaporStatus(stajId, id, durum).subscribe(data => {
      this.notificationService.showSuccess(`Rapor başarıyla ${durum}`, 'Başarılı');
      if (index === (this.stajDays?.length! - 1)) {
        this.openSicilButton.nativeElement.click();
      } else {
        this.getStajList();
      }
    })
  }

  updateSicil(closeModalButton: HTMLButtonElement) {
    if (this.sicilForm.invalid) {
      this.sicilForm.markAllAsTouched()
      return
    } else {
      const stajId = Number(this.activatedRoute.snapshot.params['id']);
      const values = this.sicilForm.getRawValue();
      const payload = { stajId: stajId, subeBirim: values.subeBirim!, devamDurumu: values.devamDurumu!, devamDurumuDusunce: values.devamDurumuDusunce!, calismaGayreti: values.calismaGayreti!, calismaGayretiDusunce: values.calismaGayretiDusunce!, isiTamYapma: values.isiTamYapma!, isiTamYapmaDusunce: values.isiTamYapmaDusunce!, isYeriTutumu: values.isYeriTutumu!, isYeriTutumuDusunce: values.isYeriTutumuDusunce! }
      this.firmaService.updateSicil(payload).subscribe(data => {
        this.notificationService.showSuccess(`${data.message}`, 'Başarılı');
        closeModalButton.click();
        this.getStajList();
      })
    }
  }


}
