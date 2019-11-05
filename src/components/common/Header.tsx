import React, { Component } from "react";
import { Button, Row, Col } from "antd";
import styled, { css } from "styled-components";

interface Props {
  color: string;
}

interface State {}

export default class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    color: "#3560A8"
  };

  render() {
    return (
      <Container color={this.props.color}>
        <Row type="flex">
          <Col span={1}>
            <Button size="large" icon="home" />
          </Col>
          <Col span={4}>
            <Button size="large" icon="search" />
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
