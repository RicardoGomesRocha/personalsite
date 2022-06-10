import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';

import { CommentModel } from '../comment/comment.model';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent {
  @Output()
  commentAdded = new EventEmitter<DocumentReference<CommentModel>>();

  commentForm = new FormGroup({
    comment: new FormControl(''),
  });

  editorConfiguration = this.commentsService.textEditorConfig();

  constructor(private readonly commentsService: CommentsService) {}

  async addComment() {
    const comment: CommentModel = {
      body: this.commentForm?.value.comment,
      date: new Timestamp(new Date().getMilliseconds(), 0),
    };
    const documentReference = await this.commentsService.addComment(comment);
    this.commentAdded.emit(documentReference);
  }
}
