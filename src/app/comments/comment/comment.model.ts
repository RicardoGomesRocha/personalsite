import { DocumentReference } from '@angular/fire/compat/firestore';
import { User } from 'src/app/users/user.model';

export interface CommentModel {
  id: string;
  body: string;
  date: Date;
  comments?: CommentModel[];
  commentsRef?: DocumentReference<CommentModel>[] | undefined;
  like?: number;
  authorId?: string;
  author?: User;
}
