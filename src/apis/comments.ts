import request from './base';

export const getAllComments = () => {
  return request({ url: `/comments` });
};

export const getCommentsByPage = (page: number, limit: number) => {
  return request({ url: `/comments?_page=${page}&_limit=${limit}` });
};

// export const postComment = (data: CommentType) => {
//   return request({
//     method: 'POST',
//     url: '/comments',
//     data,
//   });
// };

// export const editComment = () => {};

// export const deleteComment = () => {};
