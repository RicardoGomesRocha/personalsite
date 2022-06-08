import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { CommentModel } from './comment/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly collectionPath = 'comments';
  constructor(
    private readonly http: HttpClient,
    private readonly afs: AngularFirestore
  ) {}

  getComments(comments: DocumentReference<CommentModel>[]) {
    const ids = comments.map((comment) => comment.id);
    return this.afs
      .collection(this.collectionPath, (ref) => ref.where('id', 'in', ids))
      .valueChanges();
  }
}
