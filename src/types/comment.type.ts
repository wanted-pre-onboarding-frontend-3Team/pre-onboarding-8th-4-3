export interface CommentTypes {
  id: number;
  profile_url: string;
  author: string;
  createdAt: string;
  content: string;
}

export interface CommentTypes2 {
  commentsData: {
    id?: number;
    profile_url?: string;
    author?: string;
    createdAt?: string;
    content?: string;
  };
}
