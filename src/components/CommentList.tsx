import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCurrentPage } from '../hooks/use-current-page';
import { RootState } from '../store/config';
import { getCommentList } from '../store/slices/commentSlice';
import CommentItem from './CommentItem';

const CommentList = () => {
  const dispatch = useDispatch();
  const pageNum = useCurrentPage();
  const commentList = useSelector((state: RootState) => state.comments.comments);

  useEffect(() => {
    dispatch(getCommentList(pageNum));
  }, [dispatch, pageNum]);

  return (
    <div>
      {commentList.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
