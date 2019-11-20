import React, { Component } from "react";
import { getUserData, setUserData } from "../../helper";
import styled from "styled-components";
import { Form, Button, Input, Icon, Tooltip } from "antd";
import { FormComponentProps } from "antd/lib/form";

interface InfoProps extends FormComponentProps {
  onClose: () => void;
}

interface InfoState {
  confirmDirty: boolean;
  userData: any;
}

class UserInfoForm extends Component<InfoProps, InfoState> {
  constructor(props: InfoProps) {
    super(props);
    this.state = {
      confirmDirty: false,
      userData: {}
    };
  }

  _getUserData = async () => {
    console.log("여기");
    const data = await getUserData();
    this.setState({ userData: data });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        setUserData(values);
        this.props.onClose();
      }
    });
  };

  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  componentDidMount() {
    this._getUserData();
  }

  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const { email, nickname } = this.state.userData;

    return (
      <Form style={{ marginTop: "20px" }} {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              { required: true, message: "Please input your nickname!", whitespace: true },
              {
                type: "email",
                message: "The input is not valid E-mail!"
              }
            ],
            initialValue: email
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("nickname", {
            rules: [{ required: true, message: "Please input your nickname!", whitespace: true }],
            initialValue: nickname
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            수정하기
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedInfoForm = Form.create<InfoProps>({ name: "replace" })(UserInfoForm);

export default WrappedInfoForm;
