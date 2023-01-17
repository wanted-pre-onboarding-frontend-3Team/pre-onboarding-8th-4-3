import { createAction, createReducer } from '@reduxjs/toolkit';

interface CommentState {
  allList: string[];
}

export const addCommentAction = createAction<string>('comment/add');

const initialState = { allList: [], lastPage: 0 } as CommentState;

export const commentReducer = createReducer(initialState, (builder) => {
  builder.addCase(addCommentAction, (state, action) => {
    state.allList.push(action.payload);

    return state;
  });
});
