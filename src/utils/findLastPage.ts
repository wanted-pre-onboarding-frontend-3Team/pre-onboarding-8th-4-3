export const findLastPage = (linkHeader: string) => {
  console.log(linkHeader);
  const linkHeaderList = linkHeader.split(',');
  const lastPageArray = linkHeaderList[linkHeaderList.length - 1].match(/(?<=_page=)\d*/g) || [];
  console.log(lastPageArray);
  return lastPageArray.length === 0 ? 0 : Number(lastPageArray[0]);
};
