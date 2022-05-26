import { DocumentReference } from '@angular/fire/compat/firestore';
import * as Firestore from 'firebase/firestore';
import { Category } from './category';
import Timestamp = Firestore.Timestamp;

export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  smallDescription: string;
  likes: number;
  shares: number;
  createdOn: Timestamp;
  modifiedDate?: Timestamp;
  categoriesRefs?: DocumentReference<Category>[];
  categories?: Category[];
}

export interface ProjectSaveStatus {
  percentage: number;
  projectId?: string;
}
