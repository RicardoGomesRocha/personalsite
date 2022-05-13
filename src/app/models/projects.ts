export interface Project {
  id: string;
  title: string;
  backgroundImage: string;
  description: string;
  smallDescription: string;
  likes: number;
  shares: number;
  createdDate: Date;
  modifiedDate?: Date;
}
