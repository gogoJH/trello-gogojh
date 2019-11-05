import React, { Component, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";
import { setList, CardData } from "../helper";
import { green3 } from "../Styles";

interface ItemProps {
  item: any;
  allData: CardData[];
  deleteHandler: Function;
  moveHandler: Function;
  cardId: number;
}

interface ItemState {
  id: number;
  title: string;
  toggle: boolean;
  moveToggle: boolean;
}

class Item extends Component<ItemProps, ItemState> {
  constructor(props: ItemProps) {
    super(props);
    this.state = {
      id: this.props.item.id,
      title: this.props.item.title,
      toggle: true,
      moveToggle: true
    };
  }

  clickHandler = () => {
    const toggle = !this.state.toggle;

    this.setState({ toggle });
  };

  keyDownHandler = (e: KeyboardEvent & ChangeEvent<HTMLInputElement>) => {
    this.setState({
      toggle: true,
      title: e.target.value
    });
    setList(this.props.item.id, this.state.title);
  };

  deleteHandler = () => {
    const deleteHandler = this.props.deleteHandler;
    const { id } = this.state;
    deleteHandler(id);
  };

  moveHandler = (cardId: number) => {
    const moveHandler = this.props.moveHandler;
    const { id, title } = this.state;
    this.setState({ moveToggle: true });
    moveHandler(id, title, cardId);
  };

  moveToggleHandler = () => {
    const toggle = this.state.moveToggle;
    this.setState({ moveToggle: !toggle });
  };

  render() {
    const { toggle, title } = this.state;
    const moveToggle = this.state.moveToggle;
    const { allData, cardId } = this.props;

    return (
      <div>
        {toggle ? (
          <Items>
            <TitleContainer onClick={this.clickHandler}>{title}</TitleContainer>
            <ButtonContainer>
              {moveToggle ? (
                <Button icon="arrow-right" onClick={this.moveToggleHandler}></Button>
              ) : (
                <MoveBox>
                  {allData.map(card => {
                    if (card.id !== cardId) {
                      return (
                        <MoveContents onClick={e => this.moveHandler(card.id)} key={card.id}>
                          {card.title}
                        </MoveContents>
                      );
                    }
                    return null;
                  })}
                </MoveBox>
              )}
              <Button icon="close" onClick={this.deleteHandler}></Button>
            </ButtonContainer>
          </Items>
        ) : (
          <Input
            autoFocus
            defaultValue={title}
            placeholder={title}
            onPressEnter={this.keyDownHandler}
          ></Input>
        )}
      </div>
    );
  }
}
const MoveBox = styled.div`
  z-index: 1;
  width: 100%;
  background-color: ${green3};
  padding: 10px;
  position: absolute;
`;

const MoveContents = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 5px;
  background-color: white;
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  margin: auto;
  position: relative;
`;
const TitleContainer = styled.div`
  width: 100%;
  margin: auto;
`;

const Items = styled.div`
  width: 100%;
  margin-top: 10px;
  background-color: white;
  padding: 5px;
  display: flex;
`;

export default Item;
