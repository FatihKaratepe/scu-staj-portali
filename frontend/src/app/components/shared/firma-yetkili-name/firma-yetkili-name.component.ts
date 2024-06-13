import { Component, Input } from '@angular/core';
import { FirmaYetkili } from 'src/app/models/firma-yetkili.model';
import { FirmaService } from 'src/app/services/firma.service';

@Component({
  selector: 'app-firma-yetkili-name',
  templateUrl: './firma-yetkili-name.component.html',
  styleUrls: ['./firma-yetkili-name.component.scss']
})
export class FirmaYetkiliNameComponent {

  @Input('firmaYetkiliId') set firmaYetkiliId(id: number) {
    this.firmaService.getFirmaYetkili(id).subscribe(data => {
      this.firmaYetkili = data;
      this.name = data.isim + ' ' + data.soyisim;
    })
  }

  name: string = '';
  firmaYetkili?: FirmaYetkili;

  constructor(private firmaService: FirmaService) { }

}
