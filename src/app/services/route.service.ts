import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';

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

  navigate(commands: any[], extras?: NavigationExtras): Observable<boolean> {
    return from(this.router.navigate(commands, extras));
  }
}
