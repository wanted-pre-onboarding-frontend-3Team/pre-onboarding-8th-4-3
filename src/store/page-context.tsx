import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LIMIT_NUM } from '../constants/common';

const PageContext = React.createContext({
  pageArray: [],
});

export const PageContextProvider = (props: { children: JSX.Element }) => {
  const [page, setPage] = useState<number>(0);

  const fetchComments = useCallback(async () => {
    const { data: comments } = await axios.get(`${process.env.REACT_APP_COMMENT_URL}`);
    setPage(comments.length);
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const pageNum = Math.ceil(page / LIMIT_NUM);

  const pageArray = Array.from({ length: pageNum }, (_, i) => i + 1);

  const contextValue = useMemo(
    () => ({
      pageArray,
    }),
    [pageArray],
  );

  // @ts-ignore
  return <PageContext.Provider value={contextValue}>{props.children}</PageContext.Provider>;
};

export default PageContext;
