import React, { Component } from "react";
import Header from "./common/Header";
import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_HOST;

interface Props {}

interface Board {
  title: string;
}

interface State {
  boards: Board[];
}

interface ServerResponse {
  data: ServerData;
}

interface ServerData {
  id: number;
  user_id: number;
  title: string;
}

export default class BoardList extends Component<Props, State> {
  state: State = {
    boards: []
  };

  _getData = () => {
    console.log("aaaa");
    axios
      .request<ServerData>({
        url: `${URL}/boards`,
        transformResponse: (r: ServerResponse) => r.data
      })
      .then(response => {
        // `response` is of type `AxiosResponse<ServerData>`
        const { data } = response;
        // `data` is of type ServerData, correctly inferred
        console.log(data);
      });
  };

  componentDidMount() {
    this._getData();
  }

  render() {
    return <Header />;
  }
}
