import React, { Component } from "react";
import styled from "styled-components";
//import Card from "./Card";

interface Props {}

interface Card {
  index: number;
}

interface State {
  cards: Card[];
}

class Board extends Component<Props, State> {
  state: State = {
    cards: []
  };

  componentDidMount() {}

  render() {
    const cards = this.state.cards;

    return (
      <Container>
        {cards.map(item => (
          <Card>{item.index}</Card>
        ))}
      </Container>
    );
  }
}

const Container = styled.div`
  border: solid 5px red;
  margin: 10px;
  width: 100%;
  height: 50vh;
`;

const Card = styled.div`
  width: 200px;
  height: 200px;
`;

export default Board;
