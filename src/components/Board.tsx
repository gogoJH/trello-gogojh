import React, { MouseEvent } from "react";
import styled from "styled-components";
import { green3, FColor } from "../Styles";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { Button } from "antd";

interface BoardProps extends RouteComponentProps {
  data: Data;
  getData: () => void;
  deleteHandler: (boardId: number) => void;
}

interface Data {
  id: number;
  user_id: number;
  title: string;
}

const Board: React.FC<BoardProps> = ({ data, deleteHandler, getData }) => {
  const _boardClick = (event: MouseEvent) => {};

  const _deleteClick = () => {
    deleteHandler(data.id);
  };

  return (
    <BoardCT>
      <BoardContents>
        <Link to={`/board/${data.id}/${data.title}`}>{data.title} </Link>
      </BoardContents>

      <Button onClick={_deleteClick}>X</Button>
    </BoardCT>
  );
};

const BoardCT = styled.div`
  width: 200px;
  height: 100px;
  background-color: ${green3};
  margin: 0 10px;
  display: flex;
  border-radius: 10px;
  cursor: pointer;
`;

const BoardContents = styled.div`
  font-size: 20px;
  text-align: center;
  color: ${FColor};
  font-weight: bold;
  margin: auto;
`;

export default withRouter(Board);
