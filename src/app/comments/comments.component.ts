import { Component, Input } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { CommentModel } from './comment/comment.model';
import { CommentsService } from './comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input()
  set comments(comments: DocumentReference<CommentModel>[]) {
    this.commentsService.getComments(comments).then((cmt) => {
      this._comments = cmt;
    });
  }

  _comments = new Array<CommentModel>();

  constructor(private readonly commentsService: CommentsService) {}
}
