import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PAGE_LIMIT } from '../constants/common';
import { RootState } from '../store/config';

const usePaginate = (nowPage: number = 1) => {
  const navigate = useNavigate();
  const [pageArray, setPageArray] = useState<number[]>([]);
  const [totalPageArray, setTotalPageArray] = useState<number[]>([]);

  const totalPage = useSelector((state: RootState) => state.comments.totalPage);

  useEffect(() => {
    if (totalPage > 0) {
      const newPageArray = new Array(totalPage).fill(0).map((_, idx) => idx + 1);
      setTotalPageArray(newPageArray);

      let startIndex;
      if (nowPage % PAGE_LIMIT === 0) startIndex = nowPage - PAGE_LIMIT;
      else startIndex = Math.floor(nowPage / PAGE_LIMIT) * PAGE_LIMIT;
      setPageArray(newPageArray.slice(startIndex, startIndex + PAGE_LIMIT));
    }
  }, [nowPage, totalPage]);

  const changePage = (pageId: number) => {
    if (pageId === 1) navigate('/');
    else navigate(`?page=${pageId}`);
  };

  const changePageArray = (direction: string) => {
    let startIndex = 0;
    if (direction === 'prev' && pageArray[0] > 1) {
      startIndex = pageArray[0] - PAGE_LIMIT - 1;
      setPageArray(totalPageArray.slice(startIndex, startIndex + PAGE_LIMIT));
    } else if (direction === 'next' && pageArray[pageArray.length - 1] < totalPage) {
      startIndex = pageArray[0] + PAGE_LIMIT - 1;
      setPageArray(totalPageArray.slice(startIndex, startIndex + PAGE_LIMIT));
    }
    changePage(startIndex + 1);
  };

  return { totalPage, pageArray, changePage, changePageArray };
};

export default usePaginate;
