import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCommentsByPage } from '../../apis/comments';
import { CommentType } from '../../types/comments.type';

export const getCommentList = createAsyncThunk('comment/read', async (page: number) => {
  const response = await getCommentsByPage(page, 4);
  return response.data as CommentType[];
});

const initialState = {
  comments: [] as CommentType[],
  status: 'welcome',
};

const commentSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentList.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getCommentList.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.status = 'complete';
    });
    builder.addCase(getCommentList.rejected, (state, action) => {
      state.comments = [];
      state.status = 'fail';
    });
  },
});

export default commentSlice;
