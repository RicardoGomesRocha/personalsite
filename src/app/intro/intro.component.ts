import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements AfterViewInit {
  defaultVwSize = 20;

  units = `vw`;

  photoSize = `${this.defaultVwSize}${this.units}`;

  photoWrapperSize = `100vh`;

  scrollTop = 0;

  rotationAngle = 0;

  defaultPhotoMargin = this.defaultVwSize / 10;

  photoMargins = `${this.defaultPhotoMargin / 10}vw`;

  defaultDinosaurSize = 10;

  dinosaurSize = this.defaultDinosaurSize;

  ngAfterViewInit() {
    // Forces to initialize all elements that depends on
    // scroll size values.
    this.onScroll();
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event?: Event) {
    const target = event?.target as Document;
    this.scrollTop = target?.body?.getBoundingClientRect().top ?? 0;
    const windowSize = window.innerHeight;
    const newSize =
      ((windowSize + this.scrollTop) * this.defaultVwSize) / windowSize;
    this.photoSize = `${newSize}${this.units}`;
    const newSizeWrapper = ((windowSize + this.scrollTop) * 100) / windowSize;
    this.photoSize = `${newSize}${this.units}`;
    this.photoWrapperSize = `${newSizeWrapper}vh`;
    this.rotationAngle = 360 - (newSize * 360) / this.defaultVwSize;

    const percentageToFinish = (this.rotationAngle * 100) / 360;

    this.photoMargins = `${
      this.defaultPhotoMargin -
      (percentageToFinish * this.defaultPhotoMargin) / 100
    }vw`;

    this.dinosaurSize =
      this.defaultDinosaurSize -
      (percentageToFinish * this.defaultDinosaurSize) / 100;
  }
}
