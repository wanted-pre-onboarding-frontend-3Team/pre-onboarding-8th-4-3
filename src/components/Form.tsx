import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { editComment, postComment } from '../apis/comments';
import useCommentForm from '../hooks/use-comment-form';
import { RootState } from '../store/config';
import { editCommentState } from '../store/slices/commentSlice';
import { CommentType, PostCommentType } from '../types/comments.type';

const Form = () => {
  const initForm = useSelector((state: RootState) => state.comments.editingComment);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileUrl, setProfileUrl, author, setAuthor, content, setContent, createdAt, setCreatedAt, clearForm } =
    useCommentForm(initForm);

  useEffect(() => {
    if (initForm) firstInputRef.current?.focus();
  }, [initForm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (initForm) {
      fetchEdit(initForm.id);
    } else {
      fetchPost();
    }
  };

  const fetchPost = () => {
    postComment({
      author,
      content,
      createdAt,
      profile_url: profileUrl,
    } as PostCommentType)
      .then(() => {
        navigate('/');
        clearForm();
      })
      .catch();
  };

  const fetchEdit = (id: number) => {
    const editedComment: CommentType = {
      author,
      content,
      createdAt,
      profile_url: profileUrl,
      id,
    };
    editComment(editedComment)
      .then(() => {
        dispatch(editCommentState(editedComment));
        clearForm();
      })
      .catch();
  };

  const handleCancel = () => {
    clearForm();
    dispatch(editCommentState(null));
  };

  return (
    <FormStyle>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="profile_url"
          placeholder="https://picsum.photos/id/1/50/50"
          required
          value={profileUrl || ''}
          onChange={(e) => setProfileUrl(e.target.value)}
          ref={firstInputRef}
        />
        <input
          type="text"
          name="author"
          placeholder="작성자"
          required
          value={author || ''}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          name="content"
          placeholder="내용"
          required
          value={content || ''}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          name="createdAt"
          placeholder="2020-05-30"
          required
          value={createdAt || ''}
          onChange={(e) => setCreatedAt(e.target.value)}
        />
        <button type="submit">등록</button>
        {initForm && (
          <button type="button" onClick={handleCancel}>
            수정 취소
          </button>
        )}
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
