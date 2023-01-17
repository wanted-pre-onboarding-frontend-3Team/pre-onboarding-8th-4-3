import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { commentActions } from '../store/comment-slice';
import { CommentTypes, CommentTypes2 } from '../types/comment.type';
import CommentItem from './CommentItem';

const CommentList = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // @ts-ignore
  const { commentsData } = useSelector((state: { comments: CommentTypes2[] }) => state.comments);

  const fetchComments = useCallback(async () => {
    const { data: comments } = await axios.get(
      `http://localhost:4000/comments?_page=${searchParams.get('page')}&_limit=4&_order=desc&_sort=id`,
    );
    dispatch(commentActions.fetchComment(comments));
  }, [dispatch, searchParams]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <>
      {commentsData.map((comment: CommentTypes) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentList;
