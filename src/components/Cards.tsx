import React, { Component, MouseEvent, KeyboardEvent, ChangeEvent } from "react";
import styled from "styled-components";
import { CardData, addList, deleteList } from "../helper";
import { cardColor } from "../Styles";
import Item from "./Item";
import { Input, Button } from "antd";

interface CardsProps {
  data: CardData;
  allData: CardData[];
  moveHandler: Function;
  deleteHandler: Function;
  getCards: () => void;
}

interface CardsState {
  toggle: boolean;
}

class Cards extends Component<CardsProps, CardsState> {
  constructor(props: CardsProps) {
    super(props);
    this.state = {
      toggle: true
    };
  }

  clickHandler = (e: MouseEvent<HTMLInputElement>) => {
    this.setState({ toggle: !this.state.toggle });
  };

  enterHandler = async (e: KeyboardEvent & ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const id = this.props.data.id;

    await addList(title, id);
    await this.props.getCards();
    this.setState({ toggle: true });
  };

  listDeleteHandler = async (id: number) => {
    await deleteList(id);
    await this.props.getCards();
  };

  cardDeleteHandler = () => {
    const { id } = this.props.data;
    const deleteHandler = this.props.deleteHandler;
    deleteHandler(id);
  };

  render() {
    const { toggle } = this.state;
    const { allData, moveHandler, data } = this.props;
    const { title, list, id } = data;

    console.log("data ", data, "alldata", allData);

    return (
      <CardContents>
        <TitleBox>
          <Title>{title}</Title>
          <ButtonBox>
            <Button icon="close" onClick={this.cardDeleteHandler}></Button>
          </ButtonBox>
        </TitleBox>

        {data.list.map((item: any) => {
          return (
            <Item
              key={item.id}
              deleteHandler={this.listDeleteHandler}
              moveHandler={moveHandler}
              item={item}
              cardId={id}
              allData={allData}
            />
          );
        })}

        {toggle ? (
          <Add onClick={this.clickHandler}>
            {list.length ? "+ Add another list" : "+ Add a list"}
          </Add>
        ) : (
          <Input autoFocus onPressEnter={this.enterHandler} style={{ marginTop: "10px" }} />
        )}
      </CardContents>
    );
  }
}

const TitleBox = styled.div`
  display: flex;
`;

const Title = styled.div`
  width: 100%;
  margin: auto;
`;

const ButtonBox = styled.div`
  width: 100%;
  text-align: right;
`;

const Add = styled.div`
  width: 100%;
  height: 50px;
  padding: 5px;
  margin-top: 10px;
`;

const CardContents = styled.div`
  font-weight:bold
  min-width: 300px;
  padding: 10px;
  background-color: ${cardColor};
  margin-right: 10px;
  border-radius: 10px;
`;

export default Cards;
