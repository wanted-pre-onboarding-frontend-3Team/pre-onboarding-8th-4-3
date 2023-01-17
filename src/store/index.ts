// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import commentSlice from './comment-slice';

const store = configureStore({
  reducer: {
    comments: commentSlice.reducer,
  },
  middleware: [logger],
  devTools: true,
});

export default store;
