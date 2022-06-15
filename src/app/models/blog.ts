import { DocumentReference } from '@angular/fire/compat/firestore';
import * as Firestore from 'firebase/firestore';
import { CommentModel } from '../comments/comment/comment.model';
import { Category } from './category';
import Timestamp = Firestore.Timestamp;
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  body: string;
  likes: number;
  createdDate: Timestamp;
  modifiedDate?: Timestamp;
  categoriesRefs?: DocumentReference<Category>[];
  categories?: Category[];
  comments?: DocumentReference<CommentModel>[];
}

export interface BlogPostSaveStatus {
  percentage: number;
  blogPostId?: string;
}
