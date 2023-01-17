import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCommentsByPage } from '../../apis/comments';
import { COMMENT_LIMIT } from '../../constants/common';
import { CommentType } from '../../types/comments.type';

export const getCommentList = createAsyncThunk('comment/read', async (page: number) => {
  const response = await getCommentsByPage(page, COMMENT_LIMIT);
  const totalPage = Math.ceil(Number(response.headers['x-total-count']) / COMMENT_LIMIT);

  return { comments: response.data as CommentType[], totalPage };
});

const initialState = {
  comments: [] as CommentType[],
  status: 'welcome',
  totalPage: 0,
};

const commentSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {
    addComment(state, action) {
      state.comments = [...state.comments, action.payload];
    },

    deleteComment(state, action) {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentList.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getCommentList.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.totalPage = action.payload.totalPage;
      state.status = 'complete';
    });
    builder.addCase(getCommentList.rejected, (state, action) => {
      state.comments = [];
      state.totalPage = 0;
      state.status = 'fail';
    });
  },
});
export const commentActions = commentSlice.actions;
export default commentSlice;
