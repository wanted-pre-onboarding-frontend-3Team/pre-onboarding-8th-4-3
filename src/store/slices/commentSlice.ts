import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postComment, editComment, deleteComment, getCommentList } from '../../apis/comments';
import { CommentType } from '../../types/comments.type';

interface CommentStateType {
  commentData: CommentType;
  mode: 'add' | 'edit';
  comments: CommentType[];
  status: 'welcome' | 'loading' | 'complete' | 'fail';
  total: number;
}

const initialState: CommentStateType = {
  comments: [] as CommentType[],
  status: 'welcome',
  total: 0,
  commentData: {
    id: null,
    author: '',
    content: '',
    createdAt: new Date().toISOString().split('T')[0],
    profile_url: '',
  },
  mode: 'add',
};

const commentSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {
    setEditComment: (state, { payload }: PayloadAction<Pick<CommentStateType, 'commentData'>>) => {
      state.mode = 'edit';
      state.commentData = payload.commentData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentList.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getCommentList.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.total = action.payload.total;
      state.status = 'complete';
    });
    builder.addCase(getCommentList.rejected, (state) => {
      state.comments = [];
      state.status = 'fail';
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.total = action.payload;
      state.commentData = initialState.commentData;
    });
    builder.addCase(editComment.fulfilled, (state, action) => {
      state.comments = state.comments.map((comment) => {
        if (comment.id === action.payload.id) {
          return action.payload;
        }
        return comment;
      });
      state.commentData = initialState.commentData;
      state.mode = 'add';
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.total = action.payload;
    });
  },
});
export const { setEditComment } = commentSlice.actions;
export default commentSlice;
