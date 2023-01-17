import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { modifyCurrentPageAction } from '../modules/page';
import { StoreState } from '../modules/store';

interface PageListProps {
  list: number[];
}

const PageList = ({ list }: PageListProps) => {
  const selectedPage = useSelector<StoreState>((state) => state.page.currentPage);
  const dispatch = useDispatch();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const nextPage = e.currentTarget.id;

      dispatch(modifyCurrentPageAction(Number(nextPage)));
    },
    [dispatch],
  );

  return (
    <PageListStyle>
      {list.map((pageId) => (
        <Page key={pageId} id={String(pageId)} onClick={onClick} selected={selectedPage === pageId}>
          {pageId}
        </Page>
      ))}
    </PageListStyle>
  );
};

export default PageList;

interface StyledPageProps {
  selected: boolean;
}

const PageListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Page = styled.button<StyledPageProps>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  background-color: ${(props) => props.selected && '#039be5'};
  margin-right: 3px;
`;
