export interface CommentModel {
  id: string;
  body: string;
  date: Date;
  comments: Comment[];
}
