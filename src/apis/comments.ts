import { findLastPage } from '../utils/findLastPage';
import { CommentType } from '../types/comments.type';
import request from './base';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCommentList = createAsyncThunk('comment/read', async (page: number) => {
  const { headers, data } = await request({ url: `/comments?_page=${page}&_limit=4&_order=desc&_sort=id` });
  const total = Number(headers['x-total-count']);
  return { comments: data as CommentType[], total };
});

export const postComment = createAsyncThunk('comment/create', async (commentData: Partial<CommentType>) => {
  const { headers } = await request({
    method: 'POST',
    url: '/comments',
    data: commentData,
  });

  return Number(headers['x-total-count']);
});

export const editComment = createAsyncThunk('comment/update', async (commentData: Partial<CommentType>) => {
  const { data } = await request({
    method: 'PUT',
    url: `/comments/${commentData.id}`,
    data: commentData,
  });
  return data as CommentType;
});

export const deleteComment = createAsyncThunk('comment/delete', async (id: number) => {
  const { headers } = await request({
    method: 'DELETE',
    url: `/comments/${id}`,
  });
  return Number(headers['x-total-count']);
});
