import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteComment } from '../apis/comments';
import useNowPage from '../hooks/use-now-page';
import { getCommentList, setEditingComment } from '../store/slices/commentSlice';
import { CommentType } from '../types/comments.type';

const Comment = ({ comment }: { comment: CommentType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useNowPage();

  const handleEdit = () => {
    dispatch(setEditingComment(comment));
  };

  const handleDelete = () => {
    if (comment.id) {
      deleteComment(comment.id)
        .then(() => {
          if (page > 1) navigate('/');
          else dispatch(getCommentList(1));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Container>
      <img src={comment.profile_url} alt="" />
      {comment.author}
      <CreatedAt>{comment.createdAt}</CreatedAt>
      <Content>{comment.content}</Content>
      <Button>
        <button type="button" onClick={handleEdit}>
          수정
        </button>
        <button type="button" onClick={handleDelete}>
          삭제
        </button>
      </Button>
      <hr />
    </Container>
  );
};

const Container = styled.div`
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

export default Comment;
