import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import commentSlice from './slices/commentSlice';

const store = configureStore({
  reducer: {
    comments: commentSlice.reducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
