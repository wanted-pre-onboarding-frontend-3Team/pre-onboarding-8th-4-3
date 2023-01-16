import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PageData {
  id: number;
  profile_url: string;
  author: string;
  content: string;
  createdAt: string;
}

interface PaginationState {
  currPage: number;
  totalPage: number;
  pageData: PageData[];
}

const initialState: PaginationState = {
  currPage: 1,
  totalPage: 0,
  pageData: [],
};
export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPageNum: (state, { payload }: PayloadAction<Pick<PaginationState, 'currPage'>>) => {
      state.currPage = payload.currPage;
    },
    setPage: (state, { payload }: PayloadAction<Pick<PaginationState, 'pageData'>>) => {
      state.pageData = payload.pageData;
    },
    setTotalPage: (state, { payload }: PayloadAction<Pick<PaginationState, 'totalPage'>>) => {
      state.totalPage = payload.totalPage;
    },
  },
});

export const { setPage, setPageNum, setTotalPage } = paginationSlice.actions;
export default paginationSlice.reducer;
