import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';

const usePagination = () => {
  const { totalPage, currPage } = useSelector((state: RootState) => state.pagination);
  const [page, setPage] = useState<number[]>([]);

  useEffect(() => {
    const pageArr = [];
    let start = 1;
    if (currPage % 5 === 1) {
      start = currPage;
      for (let i = start; i < start + 5; i += 1) {
        if (i > totalPage) {
          break;
        }
        pageArr.push(i);
      }
      setPage(pageArr);
    } else if (currPage % 5 === 0) {
      for (let i = currPage - 4; i <= currPage; i += 1) {
        pageArr.push(i);
      }
      setPage(pageArr);
    }
  }, [totalPage, currPage]);

  return page;
};
export default usePagination;
