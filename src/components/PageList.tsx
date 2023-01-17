import styled from 'styled-components';
import React from 'react';
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
  margin: 5px;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  margin-right: 3px;
  background-color: ${({ isActive }) => (isActive ? 'black' : 'white')};
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  cursor: pointer;
`;
const NavBtn = styled.button`
  cursor: pointer;
  background-color: white;
  border: none;
  line-height: 1.5;
  margin: 5px;
`;

const PageList = () => {
  const { currPage } = useSelector((state: RootState) => state.pagination);
  const pagination = usePagination();
  const dispatch = useDispatch();
  const paginationHandler = (num: number) => {
    dispatch(setPageNum({ currPage: num }));
    window.scrollTo(0, 0);
  };
  return (
    <PageListStyle>
      <NavBtn type="button" onClick={() => paginationHandler(currPage - 1)}>
        ◀
      </NavBtn>
      {pagination.map((pageId) => (
        <Page key={pageId} onClick={() => paginationHandler(pageId)} isActive={currPage === pageId}>
          {pageId}
        </Page>
      ))}
      <NavBtn type="button" onClick={() => paginationHandler(currPage + 1)}>
        ▶
      </NavBtn>
    </PageListStyle>
  );
};

export default React.memo(PageList);
