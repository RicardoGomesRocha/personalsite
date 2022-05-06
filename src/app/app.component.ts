import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  defaultVwSize = 20;

  units = `vw`;

  photoSize = `${this.defaultVwSize}${this.units}`;

  photoWrapperSize = `100vh`;

  scrollTop = 0;

  rotationAngle = 0;

  defaultPhotoMargin = this.defaultVwSize / 40;

  photoMargins = `${this.defaultPhotoMargin / 40}vw`;

  backgroundDivs: number[] = [...new Array(250)].map((value, index) =>
    index % 2 > 0 ? 1 : 0
  );

  defaultDinosaurSize = 10;

  dinosaurSize = `${this.defaultDinosaurSize}vw`;

  @ViewChild('backgroundElement')
  backgroundElement: ElementRef<HTMLDivElement> | undefined;

  ngAfterViewInit() {
    const elements: HTMLCollection | undefined =
      this.backgroundElement?.nativeElement.children;

    this.setDinosaurTopValue('-8vw', 'max');
    this.setDinosaurTopValue('-4vw', 'mid');

    // Forces to initialize all elements that depends on
    // scroll size values.
    this.onScroll();

    if (elements) {
      const numberOfElements = elements.length;
      const maxNumberVisibleElements = numberOfElements / 10;

      setInterval(() => {
        let numberVisibleElements = this.getRandomIntInclusive(
          0,
          numberOfElements - 1
        );

        const positionsArray = [];

        for (let i = 0; i < numberOfElements; i++) {
          elements[i].classList.remove('visible');
          positionsArray[i] = i;
        }

        while (numberVisibleElements > 0) {
          const randomPosition = this.getRandomIntInclusive(
            0,
            numberOfElements
          );
          const elementsPosition = positionsArray.splice(randomPosition, 1)[0];
          elements[elementsPosition]?.classList.add('visible');
          numberVisibleElements--;
        }
      }, 1000);
    }
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

    const topMaxValue = 8 - (percentageToFinish * 8) / 100;
    const topMidValue = 4 - (percentageToFinish * 4) / 100;
    this.setDinosaurTopValue(`-${topMaxValue}vw`, 'max');
    this.setDinosaurTopValue(`-${topMidValue}vw`, 'mid');

    this.dinosaurSize = `${
      this.defaultDinosaurSize -
      (percentageToFinish * this.defaultDinosaurSize) / 100
    }vw`;
  }

  getTransformAngle(): string {
    return `rotate(${this.rotationAngle}deg)`;
  }

  getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  private setDinosaurTopValue(value: string, topLocations: 'mid' | 'max') {
    const variableName =
      topLocations === 'mid'
        ? '--dinosaur-margin-top-mid'
        : '--dinosaur-margin-top-max';

    document.documentElement.style.setProperty(variableName, value);
  }
}
