import React from "react";
import { Modal } from "antd";
import LoginForm from "./LoginForm";

interface Props {
  visible: boolean;
  loginHandler: () => void;
  signUpHandler: () => void;
  tokenToggle: () => void;
}

const UserModal: React.FC<Props> = props => {
  const { visible, loginHandler, signUpHandler, tokenToggle } = props;

  return (
    <Modal visible={visible} onCancel={loginHandler} footer={null}>
      <LoginForm onClose={loginHandler} signUpHandler={signUpHandler} tokenToggle={tokenToggle} />
    </Modal>
  );
};

export default UserModal;
