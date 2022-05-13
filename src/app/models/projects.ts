export interface Project {
  id: string;
  name: string;
  backgroundImage: string;
  description: string;
  smallDescription: string;
  likes: number;
  shares: number;
  createdDate: Date;
  modifiedDate?: Date;
}
