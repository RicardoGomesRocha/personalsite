import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../users/users.services';
import { SideBarService } from './side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  animations: [
    trigger('inOutAnimationMenu', [
      transition(':enter', [
        style({ 'margin-left': '-300px', opacity: 0 }),
        animate('0.2s ease-out', style({ 'margin-left': '0px', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ 'margin-left': '0px', opacity: 1 }),
        animate('0.2s ease-in', style({ 'margin-left': '-300px', opacity: 0 })),
      ]),
    ]),
    trigger('inOutAnimationOpacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SideBarComponent {
  $openState = this.sidebarService.$openState;
  $authState = this.authService.$authState;
  $showUsersOption = this.usersService.hasRoles(['admin']);

  constructor(
    private readonly sidebarService: SideBarService,
    private readonly authService: AuthService,
    private readonly usersService: UserService
  ) {
    this.$showUsersOption.subscribe((result) =>
      console.log(`showUsersOption: ${result}`)
    );
  }

  closeMenu() {
    this.sidebarService.$openState.next(false);
  }

  logout() {
    this.authService.logout();
  }
}
