import React, { Component, ChangeEvent, MouseEvent, KeyboardEvent } from "react";
import { getCards, CardData, moveList, addCard, deleteCard } from "../helper";

import Header from "./common/Header";
import styled, { createGlobalStyle } from "styled-components";
import { green1, green2, green3, FColor } from "../Styles";
import Cards from "./Cards";
import { Input } from "antd";

interface ViewState {
  data: CardData[];
  toggle: Boolean;
}

interface ViewProps {
  match: any;
}

export default class BoardView extends Component<ViewProps, ViewState> {
  constructor(props: ViewProps) {
    super(props);
    this.state = {
      data: [],
      toggle: true
    };
  }

  _getCards = async () => {
    const id = this.props.match.params.id;
    const data = await getCards(id);
    this.setState({ data });
  };

  moveHandler = async (id: number, title: string, newCardId: number) => {
    console.log("id", id, "title", title, "newCardId", newCardId);
    await moveList(id, newCardId, title);
    await this._getCards();
  };

  enterHandler = async (e: KeyboardEvent & ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const boardId = this.props.match.params.id;
    await addCard(boardId, title);
    this.setState({ toggle: true });
    this._getCards();
  };

  toggleHandler = (e: MouseEvent) => {
    const toggle = this.state.toggle;
    this.setState({ toggle: !toggle });
  };

  deleteHandler = async (cardId: number) => {
    console.log("여기");
    await deleteCard(cardId);
    this._getCards();
  };

  componentDidMount() {
    this._getCards();
  }

  render() {
    const title = this.props.match.params.title;
    const { data, toggle } = this.state;

    return (
      <div>
        <GlobalStyle />
        <Header color={green1} />

        <Container>
          <Title>{title}</Title>
          <CardContainer>
            {data.map((card: CardData) => (
              <Cards
                key={card.id}
                deleteHandler={this.deleteHandler}
                moveHandler={this.moveHandler}
                data={card}
                allData={data}
              />
            ))}
            {toggle ? (
              <Add onClick={this.toggleHandler}>
                <AddContents>+ Add a card </AddContents>
              </Add>
            ) : (
              <Input autoFocus onPressEnter={this.enterHandler}></Input>
            )}
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
