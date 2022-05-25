import * as Firestore from 'firebase/firestore';
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
  categories?: Array<string>;
}

export interface ProjectSaveStatus {
  percentage: number;
  projectId?: string;
}
