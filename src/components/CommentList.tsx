import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useNowPage from '../hooks/use-now-page';
import { RootState } from '../store/config';
import { getCommentList } from '../store/slices/commentSlice';
import Comment from './Comment';

const CommentList = () => {
  const dispatch = useDispatch();
  const page = useNowPage();
  const commentList = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    dispatch(getCommentList(Number(page)));
  }, [dispatch, page]);

  return (
    <div>{commentList && commentList.comments.map((comment) => <Comment key={comment.id} comment={comment} />)}</div>
  );
};

export default CommentList;
