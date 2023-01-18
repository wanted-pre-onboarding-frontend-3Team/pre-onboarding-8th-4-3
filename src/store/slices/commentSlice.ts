import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCommentsByPage } from '../../apis/comments';
import { COMMENT_LIMIT } from '../../constants';
import { CommentType } from '../../types/comments.type';

export const getCommentList = createAsyncThunk('comment/read', async (page: number) => {
  const response = await getCommentsByPage(page, COMMENT_LIMIT);
  const totalPage = Math.ceil(Number(response.headers['x-total-count']) / COMMENT_LIMIT);

  return {
    comments: response.data as CommentType[],
    totalPage,
  };
});

const initialState = {
  comments: [] as CommentType[],
  status: 'welcome',
  totalPage: 0,
  editingComment: null as CommentType | null,
};

const commentSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {
    setEditingComment: (state, action) => {
      state.editingComment = action.payload;
    },
    editCommentState: (state, action) => {
      state.editingComment = null;
      if (action.payload) {
        state.comments = state.comments.map((comment) => {
          if (comment.id === action.payload.id) return action.payload;
          return comment;
        });
      }
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

export default commentSlice;
export const { setEditingComment, editCommentState } = commentSlice.actions;
