import React from "react";
import { Modal } from "antd";
import UserInfoForm from "./UserInfoForm";

interface Props {
  visible: boolean;
  infoHandler: () => void;
}

const UserInfoModal: React.FC<Props> = props => {
  const { visible, infoHandler } = props;

  return (
    <Modal visible={visible} onCancel={infoHandler} footer={null}>
      <UserInfoForm onClose={infoHandler} />
    </Modal>
  );
};

export default UserInfoModal;
