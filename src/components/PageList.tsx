import styled from 'styled-components';
import useNowPage from '../hooks/use-now-page';
import usePaginate from '../hooks/use-paginate';

const PageList = () => {
  const page = useNowPage();
  const { totalPage, pageArray, changePage, changePageArray } = usePaginate(page);

  return (
    <PageListStyle>
      {pageArray[0] > 1 && (
        <Page type="button" onClick={() => changePageArray('prev')} isSelect={false}>
          이전
        </Page>
      )}
      {pageArray.map((pageId) => (
        <Page key={pageId} onClick={() => changePage(pageId)} isSelect={pageId === page}>
          {pageId}
        </Page>
      ))}
      {pageArray[pageArray.length - 1] < totalPage && (
        <Page type="button" onClick={() => changePageArray('next')} isSelect={false}>
          다음
        </Page>
      )}
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
