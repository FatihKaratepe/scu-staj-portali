import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlValid } from 'src/app/helpers/control.helper';

@Component({
  selector: 'app-not-select',
  templateUrl: './not-select.component.html',
  styleUrls: ['./not-select.component.scss']
})
export class NotSelectComponent {

  @Input() control!: FormControl;
  @Input() placeholder!: string;
  @Input() labelId!: string;

  controlValid = ControlValid;
}
