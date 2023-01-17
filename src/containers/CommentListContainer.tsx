import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import CommentList from '../components/CommentList';
import { StoreState } from '../modules/store';
import { PAGE_LIMIT } from '../const';

export interface CommentData {
  id: number;
  profile_url: string;
  author: string;
  content: string;
  createdAt: string;
}

const CommentListContainer = () => {
  const page = useSelector<StoreState>((state) => state.page.currentPage) as number;
  const [commentList, setCommentList] = useState<CommentData[]>([]);

  const requestPagination = useCallback(async () => {
    const response = await axios(`http://localhost:4000/comments?_page=${page}&_limit=${PAGE_LIMIT}`);

    setCommentList(response.data);
  }, [page]);

  useEffect(() => {
    requestPagination();
  }, [requestPagination]);

  return <CommentList page={page} list={commentList} />;
};

export default CommentListContainer;
