export const findLastPage = (linkHeader: string) => {
  const linkHeaderList = linkHeader.split(',');
  const lastPageArray = linkHeaderList[linkHeaderList.length - 1].match(/(?<=_page=)\d*/g) || [];

  return lastPageArray.length === 0 ? 0 : Number(lastPageArray[0]);
};
