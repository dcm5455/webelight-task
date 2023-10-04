import styled from "@emotion/styled";
import Header from "./component/header";
import RepoList from "./component/repolist";

const Main = styled("div")(() => ({
  background: "#92a8d1",
  color: "rgba(0, 128, 0, 1)",
  minHeight: "100vh"
}));

function App() {
  return (
    <Main>
      <Header />
      <RepoList />
    </Main>
  );
}

export default App;
