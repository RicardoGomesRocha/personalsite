import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
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

  @Output()
  commentDeleted = new EventEmitter<void>();

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
    private readonly commentsService: CommentsService,
    private readonly messageService: MessageService
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

  async commentAdded(commentAdded: DocumentReference<CommentModel>) {
    this.showReplyTextEditor = false;
    if (this._comment?.commentsRef)
      this._comment?.commentsRef.push(commentAdded);
    else if (this._comment) this._comment.commentsRef = [commentAdded];

    if (this._comment?.commentsRef && this._comment?.id) {
      try {
        const results = await Promise.all([
          this.commentsService.getComment(commentAdded),
          this.commentsService.updateComments(
            this._comment?.id,
            this._comment?.commentsRef
          ),
        ]);
        if (this._comment?.comments) this._comment?.comments?.push(results[0]);
        else if (this._comment) this._comment.comments = [results[0]];
      } catch (error) {
        console.error(error);
      }
    }
  }

  commentChange(comment: CommentModel, index: number) {
    if (this._comment?.comments) {
      this._comment.comments[index] = comment;
    }
  }

  commentDelete(index: number) {
    if (this._comment?.comments) {
      this._comment.comments = this._comment.comments.splice(index, 1);
      this.commentDeleted.emit();
    }
  }

  async deleteComment() {
    this.messageService.showYesNoMessage(
      'Are you sure that you want to delete this comment?',
      async () => {
        if (this._comment?.id) {
          await this.commentsService.deleteComment(this._comment?.id);
          this.commentDeleted.emit();
        }
      }
    );
  }
}
