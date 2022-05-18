import { Component } from '@angular/core';
import { RouteService } from './services/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  $isHome = this.routeService.$isHomePage;
  constructor(private readonly routeService: RouteService) {}
}
