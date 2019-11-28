import { Form, Input, Button } from "antd";
import React from "react";
import { FormComponentProps } from "antd/lib/form";
import { login } from "../../helper";

interface loginProps extends FormComponentProps {
  onClose: () => void;
  signUpHandler: () => void;
  tokenToggle: (login: string) => void;
}

class LoginForm extends React.Component<loginProps> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      delete values.confirm;
      if (!err) {
        const result = await login(values);
        if (result) {
          this.props.onClose();
          this.props.tokenToggle("login");
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { signUpHandler } = this.props;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="username">
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item label="password">
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(<Input type="password" placeholder="Password" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          <Button
            onClick={() => {
              signUpHandler();
            }}
          >
            sign up
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create<loginProps>({ name: "login" })(LoginForm);

export default WrappedLoginForm;
