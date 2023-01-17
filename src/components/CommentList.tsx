import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../store/config';
import { getCommentList } from '../store/slices/commentSlice';

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
      {commentList &&
        commentList.comments.map((comment) => (
          <Comment key={comment.id}>
            <img src={comment.profile_url} alt="" />

            {comment.author}

            <CreatedAt>{comment.createdAt}</CreatedAt>

            <Content>{comment.content}</Content>

            <Button>
              <a>수정</a>
              <a>삭제</a>
            </Button>

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

const Button = styled.div`
  text-align: right;
  margin: 10px 0;
  & > a {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

export default CommentList;
