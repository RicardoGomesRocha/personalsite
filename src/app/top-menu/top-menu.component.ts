import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IntroService } from '../intro';
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
    private router: Router,
    private readonly introService: IntroService,
    private readonly sideBarService: SideBarService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.url === '/' || event.url.includes('home');
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
