import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';

import commentReducer from './comment';

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

const store = configureStore({
  reducer: commentReducer,
  middleware: [logger],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
