import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  _diameter = 10;

  @Input()
  color = 'primary';

  @Input()
  set diameter(value: number) {
    if (value && value > 0) {
      this._diameter = value;
    } else {
      throw 'diameter value is not valid';
    }
  }
}
