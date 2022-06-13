import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { TextEditorConfiguration } from '../text-editor/text-editor.model';
import { CommentModel } from './comment/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly collectionPath = 'comments';
  private readonly collection: AngularFirestoreCollection<CommentModel>;

  constructor(
    private readonly http: HttpClient,
    private readonly afs: AngularFirestore
  ) {
    this.collection = afs.collection<CommentModel>('comments');
  }

  async getComments(
    commentsRef: DocumentReference<CommentModel>[]
  ): Promise<CommentModel[]> {
    const promiseArray = commentsRef.map((comment) => comment.get());
    const commentsSnapshot = await Promise.all(promiseArray);
    const comments = commentsSnapshot
      .map((value) => {
        const comment = value.data();
        if (comment) comment.id = value.id;
        return comment;
      })
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

  async getComment(
    commentRef: DocumentReference<CommentModel>
  ): Promise<CommentModel> {
    const comments = await this.getComments([commentRef]);
    return comments[0];
  }

  setLikes(commentId: string, likes: number): Observable<void> {
    return from(
      this.collection.doc(commentId).update({
        likes,
      })
    );
  }

  addComment(comment: CommentModel): Promise<DocumentReference<CommentModel>> {
    return this.collection.add(comment);
  }

  deleteComment(commentId: string): Promise<void> {
    return this.collection.doc(commentId).delete();
  }

  updateComments(
    commentsId: string,
    commentsRef: DocumentReference<CommentModel>[]
  ) {
    return this.collection.doc(commentsId).update({
      commentsRef: commentsRef,
    });
  }

  textEditorConfig(): TextEditorConfiguration {
    return {
      bold: true,
      italic: true,
      underline: true,
      blockquote: true,
      codeBlock: true,
      image: true,
      link: true,
    };
  }
}
