import { useSearchParams } from 'react-router-dom';

export const useCurrentPage = () => {
  const [searchParams] = useSearchParams();
  const pageNum = Number(searchParams.get('page'));

  return pageNum;
};
