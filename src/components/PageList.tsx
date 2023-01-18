import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import usePaginate from '../hooks/use-paginate';

const PageList = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));
  const { totalPage, pageArray, changePage, changePageArray } = usePaginate(page === 0 ? 1 : page);

  const isSelect = useCallback(
    (pageId: number) => {
      if (page !== 0) return pageId === page;
      return pageId === 1;
    },
    [page],
  );

  return (
    <PageListStyle>
      <Page type="button" disabled={!(pageArray[0] > 1)} onClick={() => changePageArray('prev')} isSelect={false}>
        이전
      </Page>
      {pageArray.map((pageId) => (
        <Page key={pageId} onClick={() => changePage(pageId)} isSelect={isSelect(pageId)}>
          {pageId}
        </Page>
      ))}
      <Page
        type="button"
        disabled={!(pageArray[pageArray.length - 1] < totalPage)}
        onClick={() => changePageArray('next')}
        isSelect={false}
      >
        다음
      </Page>
    </PageListStyle>
  );
};

type ButtonProps = {
  isSelect: boolean;
};

const PageListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Page = styled.button<ButtonProps>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  margin-right: 3px;
  background: ${(props) => (props.isSelect ? 'gray' : 'white')};
`;

export default PageList;
