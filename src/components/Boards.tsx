import React, { Component, KeyboardEvent, ChangeEvent } from "react";
import Header from "./common/Header";
import Board from "./Board";
import { ServerData, getData, getToken, addBoard, deleteBoard } from "../helper";
import { Container, addColor } from "../Styles";
import styled from "styled-components";
import { Icon, Input } from "antd";

interface BoardsProps {}

interface BoardsState {
  data: ServerData[];
  token: boolean;
  addToggle: boolean;
}

export default class Boards extends Component<BoardsProps, BoardsState> {
  constructor(props: BoardsProps) {
    super(props);
    this.state = {
      data: [],
      token: false,
      addToggle: false
    };
  }

  _deleteHandler = async (boardId: number) => {
    await deleteBoard(boardId);
    await this._getData();
  };

  _enterHandler = async (e: KeyboardEvent & ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const { id } = getToken();

    await addBoard(title, id);
    await this._getData();
    this.setState({ addToggle: !this.state.addToggle });
  };

  _toggleHandler = () => {
    this.setState({ addToggle: !this.state.addToggle });
  };

  _tokenToggle = async () => {
    this.setState({ token: true });
  };

  _getData = async () => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const { id } = getToken();
      const data = await getData(id);
      this.setState({ data });
    }
  };

  componentDidMount() {
    this._getData();
  }

  render() {
    const { data, addToggle } = this.state;
    const boards = data.map(data => (
      <Board key={data.id} data={data} deleteHandler={this._deleteHandler}></Board>
    ));
    const token = window.localStorage.getItem("token");

    return (
      <Container>
        <Header tokenToggle={this._tokenToggle} />
        <TitleContainer>
          <Icon type="user" style={{ margin: "auto 10px", fontSize: "1.5rem" }} />
          <Title>Personal Boards</Title>
        </TitleContainer>
        {token ? (
          <ContentContainer>
            {boards}
            <Add onClick={this._toggleHandler}>
              {addToggle ? (
                <Input style={{ margin: "auto" }} autoFocus onPressEnter={this._enterHandler} />
              ) : (
                <AddContents>Create new board</AddContents>
              )}
            </Add>
          </ContentContainer>
        ) : (
          <LoginContainer>Login please !</LoginContainer>
        )}
      </Container>
    );
  }
}
const LoginContainer = styled.div`
  margin: 50px;
  font-size: 30pt;
  font-weight: bold;
`;

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
  margin-left: 10px;
`;

const AddContents = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin: auto;
`;
