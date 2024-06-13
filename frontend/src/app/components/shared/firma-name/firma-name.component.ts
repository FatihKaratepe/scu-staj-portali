import { Component, Input } from '@angular/core';
import { Firma } from 'src/app/models/firma.model';
import { FirmaService } from 'src/app/services/firma.service';

@Component({
  selector: 'app-firma-name',
  templateUrl: './firma-name.component.html',
  styleUrls: ['./firma-name.component.scss']
})
export class FirmaNameComponent {

  @Input('firmaId') set firmaId(id: number) {
    this.firmaService.getFirma(id).subscribe(data => {
      this.firma = data;
      this.name = data.firmaAdi;
    })
  }

  name: string = '';
  firma?: Firma;

  constructor(private firmaService: FirmaService) { }

}
