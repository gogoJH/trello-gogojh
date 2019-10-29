import React, { Component } from "react";
import { Button, Row, Col } from "antd";
import styled from "styled-components";

interface Props {}

interface State {}

export default class Header extends Component<Props, State> {
  render() {
    return (
      <Container>
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
  height: 50px;
  width: 100%;
  background-color: #3560a8;
  padding: 5px;
`;
