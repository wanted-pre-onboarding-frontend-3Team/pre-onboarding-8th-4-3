import { FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postComment } from '../apis/comments';
import { commentActions } from '../store/slices/commentSlice';

const Form = () => {
  const profileRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addCommentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await postComment({
      profile_url: profileRef.current!.value,
      author: authorRef.current!.value,
      content: contentRef.current!.value,
      createdAt: dateRef.current!.value,
    });

    dispatch(commentActions.addComment(data));

    navigate('/');
  };

  return (
    <FormStyle>
      <form onSubmit={addCommentHandler}>
        <input
          type="text"
          name="profile_url"
          placeholder="https://picsum.photos/id/1/50/50"
          required
          ref={profileRef}
        />
        <br />
        <input type="text" name="author" placeholder="작성자" required ref={authorRef} />
        <br />
        <textarea name="content" placeholder="내용" required ref={contentRef} />
        <br />
        <input type="text" name="createdAt" placeholder="2020-05-30" required ref={dateRef} />
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
