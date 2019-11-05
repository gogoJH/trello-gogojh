import React, { Component } from "react";
import { Button, Row, Col } from "antd";
import styled, { css } from "styled-components";
import { withRouter, RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps {
  color?: string;
}

interface State {}

class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    color: "#3560A8"
  };

  homeClickHandler = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <Container color={this.props.color}>
        <Row type="flex">
          <Col span={1}>
            <Button size="large" icon="home" onClick={this.homeClickHandler} />
          </Col>
          <Col span={4}>
            <Button size="large" icon="user" />
          </Col>
        </Row>
      </Container>
    );
  }
}

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
