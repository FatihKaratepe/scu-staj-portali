import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Rapor } from 'src/app/models/rapor.model';
import { Staj } from 'src/app/models/staj.model';
import { FakulteService } from 'src/app/services/fakulte.service';

@Component({
  selector: 'app-staj-detail',
  templateUrl: './staj-detail.component.html',
  styleUrls: ['./staj-detail.component.scss']
})
export class StajDetailComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fakulteService: FakulteService) { }

  stajDays?: Rapor[];
  currentStaj?: Staj;

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.fakulteService.getStajDetail(id).subscribe(data => {
      this.currentStaj = data;
    })
    this.fakulteService.getStajRapors(id).subscribe(data => {
      this.stajDays = data;
    })

  }

  disableCollapse(date: string) {
    return moment(moment(date).format('DD-MM-YYYY'), 'DD-MM-YYYY').valueOf() > moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY').valueOf();
  }


}
