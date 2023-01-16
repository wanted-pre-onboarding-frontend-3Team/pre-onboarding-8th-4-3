import styled from 'styled-components';
import React, { useEffect } from 'react';
import usePagination from '../hooks/usePagination';
import { useDispatch, useSelector } from 'react-redux';
import { setPageNum } from '../store/paginationSlice';
import { RootState } from '../store/store';

const PageListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Page = styled.button<{ isActive: boolean }>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  margin-right: 3px;
  background-color: ${({ isActive }) => (isActive ? 'black' : 'white')};
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  cursor: pointer;
`;

const PageList = () => {
  const { currPage } = useSelector((state: RootState) => state.pagination);
  const pagination = usePagination(5);
  const dispatch = useDispatch();
  return (
    <PageListStyle>
      <button type="button">◀</button>
      {pagination.map((pageId) => (
        <Page key={pageId} onClick={() => dispatch(setPageNum({ currPage: pageId }))} isActive={currPage === pageId}>
          {pageId}
        </Page>
      ))}
      <button type="button">▶</button>
    </PageListStyle>
  );
};

export default React.memo(PageList);
