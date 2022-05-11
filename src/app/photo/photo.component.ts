import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent {
  @Input() photoSize = '';
  @Input() dinosaurSize = '';
  @Input() photoMargins = '';
  @Input() rotationAngle = 0;

  getTransformAngle(): string {
    return `rotate(${this.rotationAngle}deg)`;
  }
}
