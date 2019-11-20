import React, { Component } from "react";
import { Button, Row } from "antd";
import styled, { css } from "styled-components";
import { withRouter, RouteComponentProps } from "react-router";
import LoginModal from "../auth/LoginModal";
import SignUpModal from "../auth/SiginUpModal";
import UserInfoModal from "../auth/UserInfoModal";
import { getToken } from "../../helper";

interface Props extends RouteComponentProps {
  color?: string;
  tokenToggle?: () => void;
}

interface State {
  loginVisible: boolean;
  signUpVisible: boolean;
  userInfoVisible: boolean;
}

class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loginVisible: false,
      signUpVisible: false,
      userInfoVisible: false
    };
  }

  static defaultProps = {
    color: "#3560A8"
  };

  homeClickHandler = () => {
    this.props.history.push("/");
  };

  loginHandler = () => {
    this.setState({ loginVisible: !this.state.loginVisible });
  };

  infoHandler = () => {
    this.setState({ userInfoVisible: !this.state.userInfoVisible });
  };

  signUpHandler = () => {
    this.setState({ signUpVisible: !this.state.signUpVisible });
  };

  render() {
    const token = window.localStorage.getItem("token");

    return (
      <Container color={this.props.color}>
        <Row type="flex">
          <Button
            style={{ marginRight: "10px" }}
            size="large"
            icon="home"
            onClick={this.homeClickHandler}
          />

          {token ? (
            <NameBox>
              <Button
                size="large"
                icon="user"
                style={{ marginRight: "10px" }}
                onClick={this.infoHandler}
              ></Button>
              {getToken().username}님 어서오세요!
            </NameBox>
          ) : (
            <Button size="large" icon="login" onClick={this.loginHandler}>
              Login
            </Button>
          )}
        </Row>
        <LoginModal
          visible={this.state.loginVisible}
          loginHandler={this.loginHandler}
          signUpHandler={this.signUpHandler}
          tokenToggle={this.props.tokenToggle}
        ></LoginModal>
        <SignUpModal
          visible={this.state.signUpVisible}
          signUpHandler={this.signUpHandler}
        ></SignUpModal>
        <UserInfoModal
          visible={this.state.userInfoVisible}
          infoHandler={this.infoHandler}
        ></UserInfoModal>
      </Container>
    );
  }
}

const NameBox = styled.div`
  width: 100 px;
  height: 20 px;
  color: white;
`;

const Container = styled.div`
  ${props => {
    return css`
      height: 50px;
      width: 100%;
      background-color: ${props.color};
      padding: 5px;
    `;
  }}
`;

export default withRouter(Header);
