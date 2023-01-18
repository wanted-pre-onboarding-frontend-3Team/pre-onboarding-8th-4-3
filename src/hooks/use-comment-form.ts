import { useCallback, useEffect, useState } from 'react';
import { CommentType } from '../types/comments.type';

const useCommentForm = (initForm: CommentType | null) => {
  const [profileUrl, setProfileUrl] = useState(initForm?.profile_url || '');
  const [author, setAuthor] = useState(initForm?.author || '');
  const [content, setContent] = useState(initForm?.content || '');
  const [createdAt, setCreatedAt] = useState(initForm?.createdAt || '');

  useEffect(() => {
    if (initForm) {
      setProfileUrl(initForm.profile_url);
      setAuthor(initForm.author);
      setContent(initForm.content);
      setCreatedAt(initForm.createdAt);
    }
  }, [initForm]);

  const clearForm = useCallback(() => {
    setProfileUrl('');
    setAuthor('');
    setContent('');
    setCreatedAt('');
  }, []);

  return {
    profileUrl,
    setProfileUrl,
    author,
    setAuthor,
    content,
    setContent,
    createdAt,
    setCreatedAt,
    clearForm,
  };
};

export default useCommentForm;
