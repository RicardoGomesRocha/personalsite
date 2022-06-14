import { Component, Input } from '@angular/core';
import { User } from '../users/user.model';
import { UserService } from '../users/users.services';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent {
  @Input()
  set authorId(value: string | null | undefined) {
    if (!value) {
      console.error('Author not valid');
    } else {
      this.userService.getUser(value).subscribe({
        next: (user) => {
          this.author = user;
        },
        error: () => {
          console.error('The author is invalid');
        },
      });
    }
  }

  @Input()
  date: Date | undefined;

  author: User | undefined;

  constructor(private readonly userService: UserService) {}
}
