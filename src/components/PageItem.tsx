import { useCallback } from 'react';
import styled from 'styled-components';
import { useCurrentPage } from '../hooks/use-current-page';

const PageItem = ({ pageId, changePage }: { pageId: number; changePage: (pageId: number) => void }) => {
  const pageNum = useCurrentPage();

  const isSelect = useCallback(
    (pageId: number) => {
      if (pageNum !== 0) return pageId === pageNum;
      return pageId === 1;
    },
    [pageNum],
  );

  const changePageHandler = () => changePage(pageId);

  return (
    <Page onClick={changePageHandler} isSelect={isSelect(pageId)}>
      {pageId}
    </Page>
  );
};

type ButtonProps = {
  isSelect: boolean;
};

const Page = styled.button<ButtonProps>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  margin-right: 3px;
  background: ${(props) => (props.isSelect ? 'gray' : 'white')};
  cursor: pointer;
`;

export default PageItem;
