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

  async getComments(
    commentsRef: DocumentReference<CommentModel>[]
  ): Promise<CommentModel[]> {
    const promiseArray = commentsRef.map((comment) => comment.get());
    const commentsSnapshot = await Promise.all(promiseArray);
    const comments = commentsSnapshot
      .map((value) => value.data())
      .filter((value) => value !== undefined) as CommentModel[];

    const commentsPromises = comments.map((value, index) => {
      if (value.commentsRef && value.commentsRef.length > 0) {
        return this.getComments(value.commentsRef);
      } else {
        return Promise.resolve(undefined);
      }
    }) as Promise<CommentModel[] | undefined>[];

    const commentsPromiseResult = await Promise.all<CommentModel[] | undefined>(
      commentsPromises
    );

    for (let i = 0; i < commentsPromiseResult.length; i++)
      if (commentsPromiseResult[i] !== undefined) {
        comments[i].comments = commentsPromiseResult[i];
      }

    return comments;
  }
}
