import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/users/users.services';
import { CommentsService } from '../comments.service';
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
  @Output()
  commentChanged = new EventEmitter<CommentModel>();

  @Input()
  mode: 'view' | 'edit' = 'view';

  $isAdmin = this.usersService.isAdmin();
  $isCurrentUser = new Observable<boolean>();
  $isGuest = new Observable<boolean>();

  showReplyTextEditor = false;

  commentForm = new FormGroup({
    comment: new FormControl(''),
  });

  editorConfiguration = this.commentsService.textEditorConfig();

  constructor(
    private readonly usersService: UserService,
    private readonly commentsService: CommentsService
  ) {
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

  addLike() {
    let likes = this._comment?.likes ?? 0;
    likes = ++likes;
    if (this._comment && this._comment.id) {
      this.commentsService.setLikes(this._comment.id, likes).subscribe(() => {
        if (this._comment) {
          this._comment.likes = likes;
          this.commentChanged.emit(this._comment);
        }
      });
    }
  }

  commentChange(comment: CommentModel, index: number) {
    if (this._comment?.comments) {
      this._comment.comments[index] = comment;
    }
  }

  deleteComment() {
    if (this._comment?.id) {
      this.commentsService.deleteComment(this._comment?.id);
    }
  }
}
