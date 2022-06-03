import { Component } from '@angular/core';
import { User } from './user.model';
import { UserService } from './users.services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  $users = this.userService.getAllUsers();

  displayedColumns: string[] = ['photo', 'id', 'name', 'email'];

  users: User[] | undefined;

  constructor(private readonly userService: UserService) {
    this.userService.getAllUsers().subscribe((users) => (this.users = users));
  }
}
