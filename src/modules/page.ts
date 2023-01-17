import { createAction, createReducer } from '@reduxjs/toolkit';

interface PageState {
  currentPage: number;
}

export const modifyCurrentPageAction = createAction<number>('current-page/modify');

const initialState = { currentPage: 1 } as PageState;

export const pageReducer = createReducer(initialState, (builder) => {
  builder.addCase(modifyCurrentPageAction, (state, action) => {
    state.currentPage = action.payload;

    return state;
  });
});
