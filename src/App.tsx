import React from "react";
import Boards from "./components/Boards";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BoardView from "./components/BoardView";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/" component={Boards} />
            <Route path="/board/:id/:title" component={BoardView} />
          </Switch>
        </Router>
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
