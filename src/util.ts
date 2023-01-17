export const findLastPage = (linkHeader: string) => {
  const linkHeaderList = linkHeader.split(',');
  const lastPageArray = linkHeaderList[linkHeaderList.length - 1].match(/(?<=_page=)\d*/g) || [];

  return lastPageArray.length === 0 ? 0 : Number(lastPageArray[0]);
};

export const makePageList = (lastPage: number) => {
  const newArray = [];
  if (lastPage === 0) return [];

  for (let i = 1; i <= lastPage; i += 1) {
    newArray.push(i);
  }

  return newArray;
};
