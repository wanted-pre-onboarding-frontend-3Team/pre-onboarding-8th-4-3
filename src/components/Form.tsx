import { ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postComment, editComment } from '../apis/comments';
import { useCurrentPage } from '../hooks/use-current-page';
import { RootState } from '../store/config';
import { commentActions, getCommentList } from '../store/slices/commentSlice';

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.comments.formData);
  const pageNum = useCurrentPage();

  const ChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(commentActions.setCommentForm({ key: e.target.name, data: e.target.value }));

  const addCommentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.id) {
      await postComment({
        profile_url: formData.profile_url,
        author: formData.author,
        content: formData.content,
        createdAt: formData.createdAt,
      });

      dispatch(getCommentList(1));
      navigate('/');
    } else {
      await editComment(formData.id, formData);

      dispatch(getCommentList(pageNum));
    }

    dispatch(commentActions.resetCommentForm());
  };

  return (
    <FormStyle>
      <form onSubmit={addCommentHandler}>
        <input
          type="text"
          name="profile_url"
          placeholder="https://picsum.photos/id/1/50/50"
          required
          onChange={ChangeHandler}
          value={formData.profile_url}
        />
        <br />
        <input
          type="text"
          name="author"
          placeholder="작성자"
          required
          value={formData.author}
          onChange={ChangeHandler}
        />
        <br />
        <textarea name="content" placeholder="내용" required value={formData.content} onChange={ChangeHandler} />
        <br />
        <input
          type="text"
          name="createdAt"
          placeholder="2020-05-30"
          required
          value={formData.createdAt}
          onChange={ChangeHandler}
        />
        <br />
        <button type="submit">등록</button>
      </form>
    </FormStyle>
  );
};

const FormStyle = styled.div`
  & > form {
    padding: 0 10px;
    margin-bottom: 50px;
  }
  & > form > textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }
  & > form > input[type='text'] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }
  & > form > button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

export default Form;
