import { useSearchParams } from 'react-router-dom';

const useNowPage = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));

  if (page === 0) return 1;
  return page;
};

export default useNowPage;
