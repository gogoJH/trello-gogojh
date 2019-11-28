import React, { Component, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";
import { CardData } from "../helper";
import { green3 } from "../Styles";

interface ItemProps {
  item: any;
  allData: CardData[];
  deleteHandler: Function;
  moveHandler: Function;
  setHandler: (id: number, value: string) => void;
  cardId: number;
}

interface ItemState {
  toggle: boolean;
  moveToggle: boolean;
}

class Item extends Component<ItemProps, ItemState> {
  constructor(props: ItemProps) {
    super(props);
    this.state = {
      toggle: true,
      moveToggle: true
    };
  }

  clickHandler = () => {
    const toggle = !this.state.toggle;

    this.setState({ toggle });
  };

  setHandler = (e: KeyboardEvent & ChangeEvent<HTMLInputElement>) => {
    console.log(2222);

    const setHandler = this.props.setHandler;
    const { id } = this.props.item;

    setHandler(id, e.target.value);

    this.setState({
      toggle: true
    });
  };

  deleteHandler = () => {
    const deleteHandler = this.props.deleteHandler;
    const { id } = this.props.item;
    deleteHandler(id);
  };

  moveHandler = (cardId: number) => {
    const moveHandler = this.props.moveHandler;
    const { id, title } = this.props.item;
    moveHandler(id, title, cardId);

    this.setState({ moveToggle: true });
  };

  moveToggleHandler = () => {
    const toggle = this.state.moveToggle;
    this.setState({ moveToggle: !toggle });
  };

  render() {
    const { moveToggle, toggle } = this.state;
    const { allData, cardId, item } = this.props;
    const { title } = item;

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
            onPressEnter={this.setHandler}
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
