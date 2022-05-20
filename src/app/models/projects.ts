export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  smallDescription: string;
  likes: number;
  shares: number;
  createdDate: Date;
  modifiedDate?: Date;
}
