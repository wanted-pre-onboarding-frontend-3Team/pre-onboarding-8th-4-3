import styled from 'styled-components';

const PageListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Page = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  margin-right: 3px;
`;

const PageList = () => {
  // TODO : 임시로 페이지 번호 지정해두었습니다! 변경필요함
  const pageArray = [1, 2, 3, 4, 5];

  return (
    <PageListStyle>
      {pageArray.map((pageId) => (
        <Page key={pageId}>{pageId}</Page>
      ))}
    </PageListStyle>
  );
};

export default PageList;
