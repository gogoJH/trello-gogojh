import React, { Component, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";
import { setList } from "../helper";

interface ItemProps {
  item: any;
  deleteHandler: Function;
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

  render() {
    const { toggle, title } = this.state;
    const moveToggle = this.state.moveToggle;

    return (
      <div>
        {toggle ? (
          <Items>
            <TitleContainer onClick={this.clickHandler}>{title}</TitleContainer>
            <ButtonContainer>
              <Button icon="arrow-right"></Button>
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

const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  margin: auto;
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
