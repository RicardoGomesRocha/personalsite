export interface BlogPost {
  id: string;
  title: string;
  image: string;
  body: string;
  likes: number;
  createDate: Date;
  modifyDate?: Date;
}
