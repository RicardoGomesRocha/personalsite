import { Component } from '@angular/core';
import { SideBarService } from './side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  $openState = this.sidebarService.$openState;

  constructor(private readonly sidebarService: SideBarService) {}

  closeMenu() {
    this.sidebarService.$openState.next(false);
  }
}
