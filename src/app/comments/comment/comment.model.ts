import { DocumentReference } from '@angular/fire/compat/firestore';

export interface CommentModel {
  id: string;
  body: string;
  date: Date;
  comments?: CommentModel[];
  commentsRef?: DocumentReference<CommentModel>[] | undefined;
}
