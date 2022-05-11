import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent {
  _dinosaurSizeFormatted = '0vw';

  dinosaurLeft = '0vw';

  _dinosaurUnit = 'vw';

  _dinosaurSize = 0;

  @Input()
  set dinosaurUnit(unit: string) {
    this._dinosaurUnit = unit;
    this.setDinosaurSize();
  }

  @Input()
  set dinosaurSize(size: number) {
    this._dinosaurSize = size;
    this.setDinosaurSize();
  }

  @Input() photoSize = '';

  @Input() photoMargins = '';

  @Input() rotationAngle = 0;

  getTransformAngle(): string {
    return `rotate(${this.rotationAngle}deg)`;
  }

  private setDinosaurSize() {
    this._dinosaurSizeFormatted = `${this._dinosaurSize}${this._dinosaurUnit}`;
    this.dinosaurLeft = `${this._dinosaurSize / 2}${this._dinosaurUnit}`;
  }
}
