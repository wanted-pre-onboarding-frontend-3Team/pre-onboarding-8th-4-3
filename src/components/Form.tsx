import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/config';

const FormStyle = styled.div`
  & > form {
    padding: 0 10px;
    margin-bottom: 50px;
  }
  & > form > textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }
  & > form > input[type='text'] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }
  & > form > button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

const Form = () => {
  const { commentData, mode } = useSelector((state: RootState) => state.form);
  console.log(commentData);
  const handleSubmit = () => {
    if (mode === 'edit') {
      console.log(mode);
    } else {
      console.log(mode);
    }
  };
  return (
    <FormStyle>
      <form onSubmit={handleSubmit}>
        <input
          defaultValue={commentData.profile_url}
          type="text"
          name="profile_url"
          placeholder="https://picsum.photos/id/1/50/50"
          required
        />
        <input type="text" name="author" placeholder="작성자" defaultValue={commentData.author} />
        <textarea name="content" placeholder="내용" defaultValue={commentData.content} required />
        <input type="text" name="createdAt" defaultValue={commentData.createdAt} placeholder="2020-05-30" required />
        <button type="submit">등록</button>
      </form>
    </FormStyle>
  );
};

export default Form;
