import * as Firestore from 'firebase/firestore';
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
}
