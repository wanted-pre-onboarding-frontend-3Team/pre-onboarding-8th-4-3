# 프로젝트 소개

- 개발 기간: 2023.01.16 ~ 2023.01.18
- 개발 스택: TypeScript, React, Styled Components, Redux Toolkit, Redux-Loger
- 팀장: 안지웅
- 팀원: 이윤진, 박혜선, 최주은

### 배포

- .env.local

```
REACT_APP_BASE_URL=http://localhost:4000
```

### 실행 방법

1. 서버 가동

```
npm run api
```

2. 프로젝트 시작

```
npm install
npm start
```

### 기능

API 서버와 통신해서 작동하는 댓글 프로젝트를 Redux를 통해 구현

### 문제 해결

- #### 페이지네이션

페이지를 이동할 때마다 search parameter에 현재 페이지를 입력한 url로 navigate 하도록 구현했습니다.

```typescript
// /src/hooks/use-paginate.ts

const usePaginate = (nowPage: number = 1) => {
  // ...
  const changePage = (pageId: number) => {
    if (pageId === 1) navigate('/');
    else navigate(`?page=${pageId}`);
  };
  // ...
};
```

```typescript
// /src/components/PageList.tsx

const PageList = () => {
  const pageNum = useCurrentPage();
  const { totalPage, pageArray, changePage, changePageArray } = usePaginate(pageNum === 0 ? 1 : pageNum);

  return (
    <PageListStyle>
      // ...
      {pageArray.map((pageId) => (
        <PageItem key={pageId} pageId={pageId} changePage={changePage} />
      ))}
      // ...
    </PageListStyle>
  );
};
```

또한 댓글 목록을 요청할 때마다 응답 헤더에 있는 `'x-total-count'` 값을 이용해 전체 페이지 수를 계산했습니다.

```typescript
const totalPage = Math.ceil(Number(response.headers['x-total-count']) / COMMENT_LIMIT);
```

해당 페이지로 이동했을 때는 해당 페이지에 대한 댓글 목록을 Redux Toolkit Thunk를 이용해 서버에 요청하도록 했습니다. (코드 후술)

- #### Redux Toolkit의 Thunk를 이용한 비동기 처리

현재 페이지의 댓글 목록을 불러오는 비동기 요청을 `createAsyncThunk`를 이용하여 처리했습니다.

```typescript
// /src/store/slices/commentSlice.ts

export const getCommentList = createAsyncThunk('comment/read', async (page: number) => {
  const response = await getCommentsByPage(page, COMMENT_LIMIT);
  const totalPage = Math.ceil(Number(response.headers['x-total-count']) / COMMENT_LIMIT);

  return {
    comments: response.data as CommentType[],
    totalPage,
  };
});
```

`commentSlice`에서 `extraReducers`로 `getCommentList`가 `pending`, `fulfilled`, `rejected`일 때 각각 처리할 수 있었습니다.
현재는 `fulfilled`일 경우에만 댓글 목록 상태를 변경하도록 구현했습니다.

```typescript
const commentSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {
    // ...
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentList.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getCommentList.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.totalPage = action.payload.totalPage;
      state.status = 'complete';
    });
    builder.addCase(getCommentList.rejected, (state, action) => {
      state.comments = [];
      state.totalPage = 0;
      state.status = 'fail';
    });
  },
});
```

- #### Redux Toolkit을 이용한 상태관리

```typescript
const formData = {
  id: 0,
  author: '',
  content: '',
  createdAt: '',
  profile_url: '',
} as CommentType;

const initialState = {
  comments: [] as CommentType[],
  status: 'welcome',
  totalPage: 0,
  formData,
};

reducers: {
  setCommentForm(state, action) {
    state.formData = { ...state.formData, [action.payload.key]: action.payload.data };
  },

  setEditCommentForm(state, action) {
    state.formData = action.payload;
  },

  resetCommentForm(state) {
    state.formData = formData;
  },
},
```

formData를 추가해 input 입력할때 `setCommentForm`을 이용해 각 key에 맞는 value를 업데이트 시키고 수정 버튼 클릭시 `setEditCommentForm`을 이용해 수정을 누른 comment 데이터를 가져와 수정하였습니다.
`resetCommentForm`을 이용해 추가 / 수정 버튼을 클릭시 data를 초기값으로 변경했습니다.

- #### 댓글 작성, 수정, 삭제 후 동작
  searchParams로 페이지별로 params를 이용해 page를 구분하기 때문에
  각 동작에 맞는 `navigate`를 통해 구현했습니다.

```typescript
// Add 시 1페이지로
await postComment({
  profile_url: formData.profile_url,
  author: formData.author,
  content: formData.content,
  createdAt: formData.createdAt,
});

dispatch(getCommentList(1));
navigate('/');

// DELETE시 1페이지로
await deleteComment(Number(comment.id));

dispatch(getCommentList(1));

navigate('/');
```

# Commit Convention

| Tag Name  | Description                                                                                   |
| :-------: | :-------------------------------------------------------------------------------------------- |
|   Feat    | 새로운 기능을 추가                                                                            |
|    Fix    | 버그 수정                                                                                     |
|  Design   | CSS 등 사용자 UI 디자인 변경                                                                  |
| !BREAKING | CHANGE 커다란 API 변경의 경우                                                                 |
|  !HOTFIX  | 급하게 치명적인 버그를 고쳐야하는 경우                                                        |
|   Style   | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우                                         |
| Refactor  | 프로덕션 코드 리팩토링                                                                        |
|  Comment  | 필요한 주석 추가 및 변경                                                                      |
|   Docs    | 문서 수정                                                                                     |
|   Test    | 테스트 코드, 리펙토링 테스트 코드 추가, Production Code(실제로 사용하는 코드) 변경 없음       |
|   Chore   | 빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, Production Code 변경 없음 |
|  Rename   | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우                                            |
|  Remove   | 파일을 삭제하는 작업만 수행한 경우                                                            |
