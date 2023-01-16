import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/store';
import { PageData, setPage, setTotalPage } from '../store/paginationSlice';
import axios from 'axios';

const Comment = styled.div`
  padding: 7px 10px;
  text-align: left;

  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const Button = styled.div`
  text-align: right;
  margin: 10px 0;
  & > a {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

const CommentList = () => {
  const { currPage, pageData } = useSelector((state: RootState) => state.pagination);
  const dispatch = useDispatch();
  const getData = useCallback(async () => {
    const { data, status } = await axios.get('http://localhost:4000/comments');
    if (status < 300) {
      dispatch(setPage({ pageData: data }));
      dispatch(setTotalPage({ totalPage: data.length }));
      // TODO: Partial 다시 사용해보기..
    }
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {pageData.slice((currPage - 1) * 5, currPage * 5).map((comment) => (
        <Comment key={comment.id}>
          <img src={comment.profile_url} alt="" />
          {comment.author}
          <CreatedAt>{comment.createdAt}</CreatedAt>
          <Content>{comment.content}</Content>
          <Button>
            <a>수정</a>
            <a>삭제</a>
          </Button>
          <hr />
        </Comment>
      ))}
    </>
  );
};

export default CommentList;
