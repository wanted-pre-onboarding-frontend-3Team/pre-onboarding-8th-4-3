export interface PostCommentType {
  author: string;
  content: string;
  createdAt: string;
  profile_url: string;
}

export interface CommentType extends PostCommentType {
  id: number;
}
