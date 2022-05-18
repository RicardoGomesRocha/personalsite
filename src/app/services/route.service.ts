import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  $isHomePage = new BehaviorSubject<boolean>(false);

  private isHomePage = false;

  constructor(private readonly router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        let isHomePage = false;
        isHomePage = event.url === '/' || event.url.includes('home');
        if (this.isHomePage !== isHomePage) {
          this.$isHomePage.next(isHomePage);
        }
        this.isHomePage = isHomePage;
      }
    });
  }
}
