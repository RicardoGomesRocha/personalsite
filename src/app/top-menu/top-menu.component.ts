import { Component } from '@angular/core';
import { IntroService } from '../intro';
import { GlobalSearchService } from '../services/global-search.service';
import { RouteService } from '../services/route.service';
import { SideBarService } from '../side-bar/side-bar.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent {
  isHomePage = false;

  opacity = 1;

  constructor(
    private readonly routeService: RouteService,
    private readonly introService: IntroService,
    private readonly sideBarService: SideBarService,
    public readonly globalSearchService: GlobalSearchService
  ) {
    this.routeService.$isHomePage.subscribe((isHomePage) => {
      this.isHomePage = isHomePage;
      if (this.isHomePage) {
        this.introService.percentageToFinish$.subscribe(
          (value) => (this.opacity = value / 100)
        );
      } else {
        this.opacity = 1;
      }
    });
  }

  openMenu() {
    this.sideBarService.$openState.next(true);
  }
}
