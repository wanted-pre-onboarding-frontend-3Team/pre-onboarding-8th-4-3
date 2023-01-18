import { CommentType } from '../types/comments.type';
import request from './base';

export const getAllComments = () => {
  return request({ url: `/comments` });
};

export const getCommentsByPage = (page: number, limit: number) => {
  return request({ url: `/comments?_page=${page}&_limit=${limit}&_order=desc&_sort=id` });
};

export const postComment = (CommentData: CommentType) => {
  return request({
    method: 'POST',
    url: '/comments',
    data: CommentData,
  });
};

export const deleteComment = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/comments/${id}`,
  });
};

export const editComment = (id: number, CommentData: CommentType) => {
  return request({
    method: 'PUT',
    url: `/comments/${id}`,
    data: CommentData,
  });
};
