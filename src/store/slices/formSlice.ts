import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postNewComment } from '../../apis/comments';
import { CommentType } from '../../types/comments.type';

export const postComment = createAsyncThunk('comment/create', async (commentData: CommentType) => {
  const { data } = await postNewComment(commentData);
});

export interface CommentSliceState {
  commentData: Partial<CommentType>;
  mode: 'add' | 'edit';
  status: 'loading' | 'complete' | 'fail' | 'inActive';
}
const initialState: CommentSliceState = {
  commentData: { author: '', content: '', createdAt: '', profile_url: '' },
  mode: 'add',
  status: 'inActive',
};

const formSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {
    setEditComment: (state, { payload }: PayloadAction<Pick<CommentSliceState, 'commentData'>>) => {
      state.mode = 'edit';
      state.commentData = payload.commentData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postComment.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.status = 'complete';
      state.commentData = { author: '', content: '', createdAt: '', profile_url: '' };
    });
    builder.addCase(postComment.rejected, (state, action) => {
      state.commentData = { author: '', content: '', createdAt: '', profile_url: '' };
      state.status = 'fail';
    });
  },
});
export const { setEditComment } = formSlice.actions;
export default formSlice;
