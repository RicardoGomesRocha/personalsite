import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

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

  $loading = new BehaviorSubject(false);

  constructor(private readonly commentsService: CommentsService) {}

  async addComment() {
    const comment: CommentModel = {
      body: this.commentForm?.value.comment,
      date: Timestamp.fromDate(new Date()),
    };
    this.$loading.next(true);
    const documentReference = await this.commentsService.addComment(comment);
    this.$loading.next(false);
    this.commentAdded.emit(documentReference);
  }
}
