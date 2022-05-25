import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input()
  src: string | undefined;

  @Input()
  defaultImage = 'assets/images/triangles-background.jpg';

  @Input()
  borderRadius: string | undefined;

  isLoaded = false;

  error = false;
}
