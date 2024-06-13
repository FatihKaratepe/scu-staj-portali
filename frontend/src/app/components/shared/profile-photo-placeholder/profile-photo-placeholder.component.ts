import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-photo-placeholder',
  templateUrl: './profile-photo-placeholder.component.html',
  styleUrls: ['./profile-photo-placeholder.component.scss']
})
export class ProfilePhotoPlaceholderComponent implements OnInit {

  constructor() { }

  @Input() firstName?: string;
  @Input() lastName?: string;
  @Input() marginRight = 0;
  @Input() marginLeft = 0;
  @Input() width = 40;
  @Input() radius = '50%';

  ngOnInit(): void {
  }

  nameLetters() {
    return `${this.firstName?.charAt(0)}${this.lastName?.charAt(0)}`
  }

  generateRandomColor() {
    if (!this.firstName) return `hsl(${0}, 30%, 85%)`;
    let name = this.firstName;
    if (!name) return `hsl(${0}, 30%, 85%)`;
    let h, s, l;
    let opts = {
      hue: [0, 360],
    };

    function range(hash: any, min: any, max: any) {
      let diff = max - min;
      let x = ((hash % diff) + diff) % diff;
      return x + min;
    }

    let hash = 0;
    if (name.length === 0) return hash;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }

    h = range(hash, opts.hue[0], opts.hue[1]);

    return `hsl(${h}, 30%, 85%)`;
  }
}
