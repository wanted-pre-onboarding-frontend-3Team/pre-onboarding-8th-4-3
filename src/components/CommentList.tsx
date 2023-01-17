import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { LIMIT_NUM } from '../constants/common';
import { commentActions } from '../store/comment-slice';
import { CommentTypes } from '../types/comment.type';
import CommentItem from './CommentItem';

const CommentList = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { commentsData } = useSelector((state: { comments: { commentsData: CommentTypes[] } }) => state.comments);

  const fetchComments = useCallback(async () => {
    const { data: comments } = await axios.get(
      `${process.env.REACT_APP_COMMENT_URL}?_page=${searchParams.get('page')}&_limit=${LIMIT_NUM}&_order=desc&_sort=id`,
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
