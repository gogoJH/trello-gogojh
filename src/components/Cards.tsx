import React, { Component, MouseEvent, KeyboardEvent, ChangeEvent } from "react";
import styled from "styled-components";
import { CardData, addList, deleteList } from "../helper";
import { cardColor } from "../Styles";
import Item from "./Item";
import { Input } from "antd";

interface CardsProps {
  data: CardData;
}

interface CardsState {
  id: number;
  title: string;
  list: [];
  toggle: boolean;
}

class Cards extends Component<CardsProps, CardsState> {
  constructor(props: CardsProps) {
    super(props);
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      list: this.props.data.list,
      toggle: true
    };
  }

  clickHandler = (e: MouseEvent<HTMLInputElement>) => {
    this.setState({ toggle: !this.state.toggle });
  };

  enterHandler = async (e: KeyboardEvent & ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const id = this.state.id;

    const { data } = await addList(title, id);

    this.setState({ toggle: true, list: data });
  };

  deleteHandler = async (id: number) => {
    const cardId = this.state.id;
    const { data } = await deleteList(id, cardId);

    this.setState({ list: data });
  };

  render() {
    const { title, list, toggle } = this.state;

    console.log(this.state.list);

    return (
      <CardContents>
        {title}

        {list.map((list: any) => {
          return <Item key={list.id} deleteHandler={this.deleteHandler} item={list} />;
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
