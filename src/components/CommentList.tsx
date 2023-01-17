import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../store/config';
import { getCommentList } from '../store/slices/commentSlice';
import { setEditComment } from '../store/slices/formSlice';
import { CommentType } from '../types/comments.type';

const CommentList = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const commentList = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    dispatch(getCommentList(Number(page === null ? 1 : page)));
  }, [dispatch, page]);
  const handleEdit = (commentData: CommentType) => {
    dispatch(setEditComment({ commentData }));
  };
  return (
    <div>
      {commentList &&
        commentList.comments.map((comment) => (
          <Comment key={comment.id}>
            <img src={comment.profile_url} alt="" />

            {comment.author}

            <CreatedAt>{comment.createdAt}</CreatedAt>

            <Content>{comment.content}</Content>

            <ButtonWrapper>
              <Button onClick={() => handleEdit(comment)}>수정</Button>
              <Button>삭제</Button>
            </ButtonWrapper>

            <hr />
          </Comment>
        ))}
    </div>
  );
};

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
