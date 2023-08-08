import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";

import { useTranslation } from "react-i18next";

function Login({ onSuccess }) {
  const [displayModal, setDisplayModal] = useState(false);

  const { t } = useTranslation();

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const signinOnClick = () => {
    setDisplayModal(true);
  };

  const onFinish = (data) => {
    login(data)
      .then(() => {
        setDisplayModal(false);
        message.success(t("welcomeBack"));
        onSuccess();
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <>
      <Button
        shape="round"
        onClick={signinOnClick}
        style={{ marginRight: "20px" }}
      >
        {t("login")}
      </Button>
      <Modal
        title={t("login")}
        visible={displayModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form name="normal_login" onFinish={onFinish} preserve={false}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: t("pleaseInputUserName") }]}
          >
            <Input prefix={<UserOutlined />} placeholder={t("username")} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: t("pleaseInputPassword") }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("password")}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("login")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Login;
