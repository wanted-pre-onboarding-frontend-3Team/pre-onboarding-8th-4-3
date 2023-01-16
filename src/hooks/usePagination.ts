import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';

const usePagination = (slice: number) => {
  const { totalPage } = useSelector((state: RootState) => state.pagination);
  const [page, setPage] = useState<number[]>([]);
  useEffect(() => {
    if (totalPage > slice) {
      const totalPageSlice = Math.floor(totalPage / slice) + 1;
      const pageArr = [];
      for (let i = 1; i <= totalPageSlice; i += 1) {
        pageArr.push(i);
      }
      setPage(pageArr);
    } else {
      setPage([1]);
    }
  }, [totalPage, slice]);

  return page;
};
export default usePagination;
