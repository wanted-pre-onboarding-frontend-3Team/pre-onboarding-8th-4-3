import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { commentReducer } from './comment';
import { pageReducer } from './page';

export interface StoreState {
  comment: ReturnType<typeof commentReducer>;
  page: ReturnType<typeof pageReducer>;
}

const store = configureStore({
  reducer: { comment: commentReducer, page: pageReducer },
  middleware: [logger],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
