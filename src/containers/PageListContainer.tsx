import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

import { PAGE_LIMIT } from '../const';
import { findLastPage, makePageList } from '../util';
import PageList from '../components/PageList';

const PageListContainer = () => {
  const [lastPage, setLastPage] = useState<number>(0);
  const pageList = useMemo<number[]>(() => makePageList(lastPage), [lastPage]);

  useEffect(() => {
    const requestPagination = async () => {
      const response = await axios(`http://localhost:4000/comments?_page=1&_limit=${PAGE_LIMIT}`);
      if (!response.headers.link) {
        // TODO: Error 처리
        return;
      }

      const lastPage = findLastPage(response.headers.link);

      setLastPage(lastPage);
    };

    requestPagination();
  }, []);

  return <PageList list={pageList} />;
};

export default PageListContainer;
