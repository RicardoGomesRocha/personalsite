import { DocumentReference } from '@angular/fire/compat/firestore';
import * as Firestore from 'firebase/firestore';
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
}
