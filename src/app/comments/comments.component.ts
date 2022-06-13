import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { MessageService } from '../services/message.service';
import { CommentModel } from './comment/comment.model';
import { CommentsService } from './comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input()
  set comments(comments: DocumentReference<CommentModel>[] | undefined) {
    if (comments) {
      this.commentsService.getComments(comments).then((cmt) => {
        this._comments = cmt.sort(
          (a, b) => b.date.toMillis() - a.date.toMillis()
        );
      });
      this.commentsRef = comments;
    }
  }

  @Output()
  commentsChanged = new EventEmitter<DocumentReference<CommentModel>[]>();

  @Output()
  commentAdded = new EventEmitter<DocumentReference<CommentModel>>();

  @Output()
  commentDeleted = new EventEmitter<number>();

  _comments = new Array<CommentModel>();

  private commentsRef: DocumentReference<CommentModel>[] = [];

  constructor(
    private readonly commentsService: CommentsService,
    private readonly messageService: MessageService
  ) {}

  addComment(comment: DocumentReference<CommentModel>) {
    this.comments = [...this.commentsRef, comment];
    this.commentAdded.emit(comment);
  }

  deleteComment(index: number) {
    this.commentsRef = this.commentsRef.splice(index);
    this.commentDeleted.emit(index);
  }
}
