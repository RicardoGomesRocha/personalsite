import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { User } from './user.model';
import { UserService } from './users.services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  $users = this.userService.getAllUsers();

  displayedColumns: string[] = ['photo', 'id', 'name', 'email', 'options'];

  users: User[] | undefined;

  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {
    this.userService.getAllUsers().subscribe((users) => (this.users = users));
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.messageService.openBottomMessage({
          message: 'The user was deleted',
        });
      },
      () => {
        this.messageService.openBottomMessage({
          message: 'It was not possible to delete the user. Please, try latter',
        });
      }
    );
  }
}
