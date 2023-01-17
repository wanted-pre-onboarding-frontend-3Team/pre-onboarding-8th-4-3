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
  slice: number;
}

const initialState: PaginationState = {
  currPage: 1,
  totalPage: 0,
  pageData: [],
  slice: 5,
};
export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPageNum: (state, { payload }: PayloadAction<Pick<PaginationState, 'currPage'>>) => {
      if (state.totalPage >= payload.currPage && payload.currPage > 0) state.currPage = payload.currPage;
    },
    setPage: (state, { payload }: PayloadAction<Pick<PaginationState, 'pageData'>>) => {
      state.pageData = payload.pageData;
      state.totalPage = Math.floor(payload.pageData.length / state.slice) + 1;
    },
  },
});

export const { setPage, setPageNum } = paginationSlice.actions;
export default paginationSlice.reducer;
