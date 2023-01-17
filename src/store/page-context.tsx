import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const PageContext = React.createContext({
  pageArray: [],
});

export const PageContextProvider = (props: { children: JSX.Element }) => {
  const [page, setPage] = useState<number>(0);

  const fetchComments = useCallback(async () => {
    const { data: comments } = await axios.get('http://localhost:4000/comments');
    setPage(comments.length);
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const pageNum = Math.ceil(page / 4);

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
