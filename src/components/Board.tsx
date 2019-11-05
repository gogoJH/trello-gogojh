import React, { MouseEvent } from "react";
import styled from "styled-components";
import { green3, FColor } from "../Styles";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface BoardProps extends RouteComponentProps {
  data: Data;
}

interface Data {
  id: number;
  user_id: number;
  title: string;
}

const Board: React.FC<BoardProps> = ({ data, history }) => {
  const _boardClick = (event: MouseEvent) => {
    history.push("/board/" + data.id + "/" + data.title);
  };

  return (
    <BoardCT onClick={_boardClick}>
      <BoardContents>{data.title}</BoardContents>
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
