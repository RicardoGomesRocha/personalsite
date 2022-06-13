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

  displayedColumns: string[] = ['photo', 'name', 'email', 'isAdmin', 'options'];

  users: User[] | undefined;

  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {
    this.userService.getAllUsers().subscribe((users) => (this.users = users));
  }

  deleteUser(user: User) {
    user.isDeleting = true;
    this.userService.deleteUser(user.uid).subscribe({
      next: () => {
        this.users = this.users?.filter((u) => u.uid !== user.uid);
        this.messageService.showBottomMessage({
          message: 'The user was deleted',
        });
        user.isDeleting = false;
      },
      error: () => {
        this.messageService.showBottomMessage({
          message: 'It was not possible to delete the user. Please, try latter',
        });
        user.isDeleting = false;
      },
    });
  }

  isAdminChanged(user: User, state: boolean) {
    user.loadingClaims = true;
    this.userService.setClaims(user.uid, { admin: state }).subscribe({
      next: () => {
        if (!user.customClaims) user.customClaims = {};
        user.customClaims['admin'] = state;
        user.loadingClaims = false;
      },
      error: () => {
        this.messageService.showBottomMessage({
          message: `It was not possible to change admin status for the user ${user.uid}`,
        });
      },
    });
  }
}
