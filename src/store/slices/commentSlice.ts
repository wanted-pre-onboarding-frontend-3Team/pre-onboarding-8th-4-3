import { CommentType } from '../../types/comments.type';
import { COMMENT_LIMIT } from '../../constants/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCommentsByPage } from '../../apis/comments';

export const getCommentList = createAsyncThunk('comment/read', async (page: number) => {
  const response = await getCommentsByPage(page, COMMENT_LIMIT);
  const totalPage = Math.ceil(Number(response.headers['x-total-count']) / COMMENT_LIMIT);

  return { comments: response.data as CommentType[], totalPage };
});

const formData = {
  id: 0,
  author: '',
  content: '',
  createdAt: '',
  profile_url: '',
} as CommentType;

const initialState = {
  comments: [] as CommentType[],
  status: 'welcome',
  totalPage: 0,
  formData,
};

const commentSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {
    setCommentForm(state, action) {
      state.formData = { ...state.formData, [action.payload.key]: action.payload.data };
    },

    setEditCommentForm(state, action) {
      state.formData = action.payload;
    },

    resetCommentForm(state) {
      state.formData = formData;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCommentList.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getCommentList.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.totalPage = action.payload.totalPage;
      state.status = 'complete';
    });
    builder.addCase(getCommentList.rejected, (state) => {
      state.comments = [];
      state.totalPage = 0;
      state.status = 'fail';
    });
  },
});
export const commentActions = commentSlice.actions;
export default commentSlice;
