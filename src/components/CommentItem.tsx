import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteComment } from '../apis/comments';
import { commentActions } from '../store/slices/commentSlice';
import { CommentType } from '../types/comments.type';

const CommentItem = ({ comment }: { comment: CommentType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteCommentHandler = async () => {
    await deleteComment(Number(comment.id));

    dispatch(commentActions.deleteComment(comment.id));
    navigate('/');
  };

  const EditCommentHandler = () => {
    dispatch(commentActions.setEditCommentForm(comment));
  };

  return (
    <Comment key={comment.id}>
      <img src={comment.profile_url} alt="" />

      {comment.author}

      <CreatedAt>{comment.createdAt}</CreatedAt>

      <Content>{comment.content}</Content>

      <Button>
        <button type="button" onClick={EditCommentHandler}>
          수정
        </button>
        <button type="button" onClick={deleteCommentHandler}>
          삭제
        </button>
      </Button>

      <hr />
    </Comment>
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

  & > button {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

export default CommentItem;
