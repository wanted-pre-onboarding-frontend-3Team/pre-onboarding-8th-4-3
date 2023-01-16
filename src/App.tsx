import CommentListContainer from "./containers/CommentListContainer";
import FormContainer from "./containers/FormContainer";
import PageListContainer from "./containers/PageListContainer";

const App = () => {
  return (
    <div>
      <CommentListContainer />
      <PageListContainer />
      <FormContainer />
    </div>
  );
};

export default App;
