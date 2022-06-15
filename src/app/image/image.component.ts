import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  animations: [
    trigger('inAnimation', [
      transition('false => true', [
        style({ opacity: 0 }),
        animate('0.5s ease', style({ opacity: 1 })),
      ]),
    ]),
  ],
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
