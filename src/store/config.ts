import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import commentSlice from './slices/commentSlice';
import formSlice from './slices/formSlice';

const store = configureStore({
  reducer: {
    comments: commentSlice.reducer,
    form: formSlice.reducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
