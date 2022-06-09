import { Component, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/users/users.services';
import { CommentModel } from './comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  _comment: CommentModel | undefined;
  @Input()
  set comment(comment: CommentModel | undefined) {
    this._comment = comment;
    this.setIsCurrentUser();
  }

  @Input()
  mode: 'view' | 'edit' = 'view';

  $isAdmin = this.usersService.isAdmin();
  $isCurrentUser = new Observable<boolean>();
  $isGuest = new Observable<boolean>();

  constructor(private readonly usersService: UserService) {
    this.$isAdmin = usersService.isAdmin();
    this.$isGuest = usersService
      .getCurrentUser()
      .pipe(map((user) => (user !== null ? true : false)));
  }

  setIsCurrentUser() {
    this.$isCurrentUser = this.usersService.isCurrentUser(
      this._comment?.authorId
    );
  }
}
