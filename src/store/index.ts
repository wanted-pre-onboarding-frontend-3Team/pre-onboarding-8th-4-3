// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';
import commentSlice from './comment-slice';

const store = configureStore({
  reducer: {
    comments: commentSlice.reducer,
  },
});

export default store;
