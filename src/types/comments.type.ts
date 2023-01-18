export type CommentType = {
  [index: string]: string | number | null;
  author: string;
  content: string;
  createdAt: string;
  id: number | null;
  profile_url: string;
};
