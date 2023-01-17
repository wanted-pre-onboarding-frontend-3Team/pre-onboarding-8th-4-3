import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../store/config';
import { getCommentList } from '../store/slices/commentSlice';
import CommentItem from './CommentItem';

const CommentList = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const commentList = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    dispatch(getCommentList(Number(page)));
  }, [dispatch, page]);

  return (
    <div>
      {commentList.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
