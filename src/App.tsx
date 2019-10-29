import React from "react";
import BoardList from "./components/BoardList";
import { createGlobalStyle } from "styled-components";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <BoardList />
      </React.Fragment>
    );
  }
}

const GlobalStyle = createGlobalStyle`
  body {
    margin : 0px;
    pending : 0px;
  }
`;

export default App;
