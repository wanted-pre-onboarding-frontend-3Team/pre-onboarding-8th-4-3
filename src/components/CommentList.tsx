import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { deleteComment, getCommentList } from '../apis/comments';
import { RootState } from '../store/config';

import { setEditComment } from '../store/slices/commentSlice';
import { CommentType } from '../types/comments.type';

const CommentList = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const navigate = useNavigate();
  const { comments, total } = useSelector((state: RootState) => state.comments);
  useEffect(() => {
    dispatch(getCommentList(Number(page === null ? 1 : page)));
  }, [dispatch, page, total]);
  useEffect(() => {
    window.scrollTo(0, 0);
    navigate('/');
  }, [total, navigate]);

  const handleEdit = (commentData: CommentType) => {
    dispatch(setEditComment({ commentData }));
  };
  const handleDelete = (id: number) => {
    dispatch(deleteComment(id));
  };

  return (
    <CommentListWrapper>
      {comments.map((comment) => (
        <Comment key={comment.id}>
          <img src={comment.profile_url} alt="" />

          {comment.author}

          <CreatedAt>{comment.createdAt}</CreatedAt>

          <Content>{comment.content}</Content>

          <ButtonWrapper>
            <Button onClick={() => handleEdit(comment)}>수정</Button>
            <Button onClick={() => handleDelete(comment.id as number)}>삭제</Button>
          </ButtonWrapper>

          <hr />
        </Comment>
      ))}
    </CommentListWrapper>
  );
};

const CommentListWrapper = styled.div`
  margin: 20px;
  min-height: 70vh;
`;

const Comment = styled.div`
  padding: 7px 10px;
  text-align: left;

  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const ButtonWrapper = styled.div`
  text-align: right;
  margin: 10px 0;
`;
const Button = styled.button`
  margin-right: 10px;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid lightgray;
  cursor: pointer;
`;

export default CommentList;
