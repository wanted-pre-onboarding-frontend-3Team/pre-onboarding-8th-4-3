import { FormEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { editComment, postComment } from '../apis/comments';
import { RootState } from '../store/config';
import { CommentType } from '../types/comments.type';

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

const Form = () => {
  const { commentData, mode, total } = useSelector((state: RootState) => state.comments);
  const dispatch = useDispatch();
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    form.current?.reset();
  }, [commentData, total]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const submitData: Partial<CommentType> = {
      author: form.author.value,
      content: form.content.value,
      createdAt: form.createdAt.value,
      profile_url: form.profile_url.value,
    };
    if (mode === 'add') {
      dispatch(postComment(submitData));
    } else if (mode === 'edit') {
      dispatch(editComment({ ...submitData, id: commentData.id }));
    }
  };
  return (
    <FormStyle>
      <form onSubmit={handleSubmit} ref={form}>
        <input
          defaultValue={commentData.profile_url}
          type="text"
          name="profile_url"
          placeholder="https://picsum.photos/id/1/50/50"
          required
        />
        <input type="text" name="author" placeholder="작성자" defaultValue={commentData.author} required />
        <textarea name="content" placeholder="내용" defaultValue={commentData.content} required />
        <input type="text" name="createdAt" defaultValue={commentData.createdAt} placeholder="2020-05-30" required />
        {mode === 'edit' && <button type="button">수정 취소</button>}
        <button type="submit">등록</button>
      </form>
    </FormStyle>
  );
};

export default Form;
