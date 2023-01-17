import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import PageContext from '../store/page-context';
import PageItem from './PageItem';

const PageList = () => {
  const [searchParams] = useSearchParams();
  const { pageArray } = useContext(PageContext);

  return (
    <PageListStyle>
      {pageArray.map((pageId) => (
        <PageItem key={pageId} pageId={pageId} activePage={searchParams.get('page')} />
      ))}
    </PageListStyle>
  );
};

const PageListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

export default PageList;
