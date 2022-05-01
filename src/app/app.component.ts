import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  defaultVwSize = 30;

  units = `vw`;

  photoSize = `${this.defaultVwSize}${this.units}`;

  photoWrapperSize = `100vh`;

  scrollTop = 0;

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: Event) {
    const target = event.target as Document;
    this.scrollTop = target.body?.getBoundingClientRect().top ?? 0;
    const windowSize = window.innerHeight;
    const newSize =
      ((windowSize + this.scrollTop) * this.defaultVwSize) / windowSize;
    this.photoSize = `${newSize}${this.units}`;
    const newSizeWrapper = ((windowSize + this.scrollTop) * 100) / windowSize;
    this.photoSize = `${newSize}${this.units}`;
    this.photoWrapperSize = `${newSizeWrapper}vh`;
  }
}
