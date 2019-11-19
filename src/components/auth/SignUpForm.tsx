import React, { ChangeEvent } from "react";
import { Form, Input, Tooltip, Icon, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import styled from "styled-components";
import { signUp, check } from "../../helper";
import _ from "lodash";

interface SignUpProps extends FormComponentProps {
  onClose: () => void;
}

interface SignUpState {
  confirmDirty: boolean;
}

class SignUpForm extends React.Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);
    this.state = {
      confirmDirty: false
    };

    this.checkHandler = _.debounce(this.checkHandler, 500);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values: any) => {
      delete values.confirm;
      if (!err) {
        signUp(values);
        alert("가입 되셨습니다.");
        this.props.form.resetFields();
        this.props.onClose();
      } else {
        alert("모두 입력해주세요.");
      }
    });
  };

  checkHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const values = this.props.form.getFieldValue("username");
    const result = await check(values);

    if (!result) {
      this.props.form.setFields({
        username: {
          value: "",
          name: "username",
          touched: true,
          dirty: false,
          errors: [
            {
              message: "Duplicate username!",
              field: "username"
            }
          ],
          validating: false
        }
      });
    }
  };

  handleConfirmBlur = (e: any) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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

  render() {
    const { getFieldDecorator } = this.props.form;

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

    return (
      <Container>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="User ID">
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "Please input your username!" }]
            })(<Input placeholder="Username" onChange={this.checkHandler} />)}
          </Form.Item>
          <Form.Item label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
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
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
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
              rules: [
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Container>
    );
  }
}

const WrappedSignUpForm = Form.create<SignUpProps>({ name: "register" })(SignUpForm);

const Container = styled.div`
  margin-top: 30px;
`;

export default WrappedSignUpForm;
