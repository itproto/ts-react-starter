export interface IPost {
  id: number;
  title: string;
  author: string;
}
export interface IComments {
  id: number;
  body: string;
  postId: number;
}
