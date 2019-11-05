import React, { Component } from "react";
import Header from "./common/Header";
import Board from "./Board";
import { ServerData, getData } from "../helper";
import { Container, addColor } from "../Styles";
import styled from "styled-components";
import { Icon } from "antd";

interface BoardsProps {}

interface BoardsState {
  data: ServerData[];
}

export default class Boards extends Component<BoardsProps, BoardsState> {
  constructor(props: BoardsProps) {
    super(props);
    this.state = {
      data: []
    };
  }

  _getData = async () => {
    const data = await getData("boards");
    this.setState({ data });
  };

  componentDidMount() {
    this._getData();
  }

  render() {
    const data = this.state.data;
    const boards = data.map(data => <Board key={data.id} data={data}></Board>);

    console.log(getData("boards"));

    return (
      <Container>
        <Header />
        <TitleContainer>
          <Icon type="user" style={{ margin: "auto 10px", fontSize: "1.5rem" }} />
          <Title>Personal Boards</Title>
        </TitleContainer>
        <ContentContainer>
          {boards}
          <Add>
            <AddContents>Create new board</AddContents>
          </Add>
        </ContentContainer>
      </Container>
    );
  }
}

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
`;

const Title = styled.div`
  width: 300px;
  padding: 6px 0 0 0;
  font-size: 20pt;
  font-weight: bold;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
`;

const Add = styled.div`
  width: 200px;
  height: 100px;
  background-color: ${addColor};
  display: flex;
  border-radius: 10px;
  cursor: pointer;
`;

const AddContents = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin: auto;
`;
