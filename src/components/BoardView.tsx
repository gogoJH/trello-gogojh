import React, { Component } from "react";
import { getCards, CardData } from "../helper";

import Header from "./common/Header";
import styled, { createGlobalStyle } from "styled-components";
import { green1, green2, green3, FColor } from "../Styles";
import Cards from "./Cards";

interface ViewState {
  data: CardData[];
}

interface ViewProps {
  match: any;
}

export default class BoardView extends Component<ViewProps, ViewState> {
  constructor(props: ViewProps) {
    super(props);
    this.state = {
      data: []
    };
  }

  _getData = async () => {
    const id = this.props.match.params.id;
    const data = await getCards(id);
    this.setState({ data });
  };

  componentDidMount() {
    this._getData();
  }

  render() {
    const title = this.props.match.params.title;
    const data = this.state.data;

    return (
      <div>
        <GlobalStyle />
        <Header color={green1} />

        <Container>
          <Title>{title}</Title>
          <CardContainer>
            {data.map((card: CardData) => (
              <Cards key={card.id} data={card}></Cards>
            ))}
            <Add>
              <AddContents>+ Add a card </AddContents>
            </Add>
          </CardContainer>
        </Container>
      </div>
    );
  }
}

const Add = styled.div`
  width: 200px;
  height: 50px;
  background-color: ${green3};
  border-radius: 10px;
  display: flex;
`;

const AddContents = styled.div`
  margin: auto 20px;
  color: ${FColor};
  font-weight: bold;
  font-size: 15pt;
`;

const Title = styled.div`
  width: 100px;
  height: 50px;
  font-size: 20pt;
  font-weight: bold;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Container = styled.div`
  padding: 10px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color : ${green2}
    margin : 0px;
    pending : 0px;
  }
`;
