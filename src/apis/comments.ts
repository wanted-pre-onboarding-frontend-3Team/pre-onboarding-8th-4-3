import { CommentType } from '../types/comments.type';
import request from './base';

export const getAllComments = () => {
  return request({ url: `/comments` });
};

export const getCommentsByPage = (page: number, limit: number) => {
  return request({ url: `/comments?_page=${page}&_limit=${limit}` });
};

export const postNewComment = (data: Partial<CommentType>) => {
  return request({
    method: 'POST',
    url: '/comments',
    data,
  });
};

export const editComment = (data: CommentType) => {
  return request({
    method: 'PUT',
    url: `/comments/${data.id}`,
    data,
  });
};

export const deleteComment = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/comments/${id}`,
  });
};
