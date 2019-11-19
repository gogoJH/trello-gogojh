import React from "react";
import { Modal } from "antd";
import SignUpForm from "./SignUpForm";

interface Props {
  visible: boolean;
  signUpHandler: () => void;
}

const SignUpModal: React.FC<Props> = props => {
  const { visible, signUpHandler } = props;

  return (
    <Modal visible={visible} onCancel={signUpHandler} footer={null}>
      <SignUpForm onClose={signUpHandler} />
    </Modal>
  );
};

export default SignUpModal;
