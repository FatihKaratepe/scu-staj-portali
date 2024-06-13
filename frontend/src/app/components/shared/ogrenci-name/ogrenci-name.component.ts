import { Component, Input } from '@angular/core';
import { Ogrenci } from 'src/app/models/ogrenci.model';
import { OgrenciService } from 'src/app/services/ogrenci.service';

@Component({
  selector: 'app-ogrenci-name',
  templateUrl: './ogrenci-name.component.html',
  styleUrls: ['./ogrenci-name.component.scss']
})
export class OgrenciNameComponent {

  @Input('ogrenciNo') set ogrenciNo(id: string) {
    this.ogrenciService.getOgrenci(id).subscribe(data => {
      this.ogrenci = data; 
      this.name = data.isim + ' ' + data.soyisim;
    })
  }

  name: string = '';
  ogrenci?: Ogrenci;

  constructor(private ogrenciService: OgrenciService) { }

}
