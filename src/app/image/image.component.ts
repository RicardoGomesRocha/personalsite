import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input()
  src = '';

  @Input()
  defaultImage = 'assets/images/google-dinosaur.png';

  @Input()
  borderRadius: string | undefined;

  isLoaded = false;

  error = false;
}
