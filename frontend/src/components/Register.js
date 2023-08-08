import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { register } from "../utils";
import { useTranslation } from "react-i18next";

function Register() {
  const [displayModal, setDisplayModal] = useState(false);

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const signupOnClick = () => {
    setDisplayModal(true);
  };

  const onFinish = (data) => {
    register(data)
      .then(() => {
        setDisplayModal(false);
        message.success("Successfully signed up");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const { t } = useTranslation();

  return (
    <>
      <Button shape="round" type="primary" onClick={signupOnClick}>
        {t("register")}
      </Button>
      <Modal
        title={t("register")}
        visible={displayModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="normal_register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          preserve={false}
        >
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
            <Input prefix={<LockOutlined />} placeholder={t("password")} />
          </Form.Item>
          <Form.Item
            name="first_name"
            rules={[{ required: true, message: t("pleseInputFirstname") }]}
          >
            <Input placeholder={t("firstname")} />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[{ required: true, message: t("pleaseInputLastname") }]}
          >
            <Input placeholder={t("lastname")} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("register")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Register;
