import { configureStore } from '@reduxjs/toolkit';
import paginationreducer from './paginationSlice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    pagination: paginationreducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
