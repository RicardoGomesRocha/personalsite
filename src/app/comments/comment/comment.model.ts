import { DocumentReference } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';
import { User } from 'src/app/users/user.model';

export interface CommentModel {
  id?: string;
  body: string;
  date: Timestamp;
  comments?: CommentModel[];
  commentsRef?: DocumentReference<CommentModel>[] | undefined;
  likes?: number;
  authorId?: string | null;
  author?: User;
}
