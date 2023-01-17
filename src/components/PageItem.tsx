import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

const PageItem = ({ pageId, activePage }: { pageId: number; activePage: string | null }) => {
  const navigate = useNavigate();

  const selectPageHandler = () => {
    if (pageId !== 1) navigate(`?page=${pageId}`);
    else navigate('/');
  };

  const isActive = useCallback(() => {
    if (activePage !== null) return pageId === +activePage;
    return pageId === 1;
  }, [activePage, pageId]);

  return (
    <Page onClick={selectPageHandler} active={isActive()}>
      {pageId}
    </Page>
  );
};

const Page = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  margin-right: 3px;

  ${(props: { active: boolean }) =>
    !props.active &&
    css`
      background: white;
    `}
`;

export default PageItem;
