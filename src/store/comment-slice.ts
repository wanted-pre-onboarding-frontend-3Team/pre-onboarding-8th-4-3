// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';
import { CommentTypes } from '../types/comment.type';

const initialState = { commentsData: [] } as { commentsData: CommentTypes[] };

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchComment(state, action) {
      state.commentsData = action.payload;
    },
  },
});

export const commentActions = commentSlice.actions;
export default commentSlice;
