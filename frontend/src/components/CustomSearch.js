import React, { useState } from "react";
import { searchGameByName } from "../utils";
import { message, Button, Modal, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function CustomSearch({ onSuccess }) {
  const { t } = useTranslation();

  const [displayModal, setDisplayModal] = useState(false);

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const searchOnClick = () => {
    setDisplayModal(true);
  };

  const onSubmit = (data) => {
    searchGameByName(data.game_name)
      .then((data) => {
        setDisplayModal(false);
        onSuccess(data);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <>
      <Button
        shape="round"
        onClick={searchOnClick}
        icon={<SearchOutlined />}
        style={{ marginLeft: "20px", marginTop: "20px" }}
      >
        {t("customSearch")}
      </Button>
      <Modal
        title={t("customSearch")}
        visible={displayModal}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="custom_search" onFinish={onSubmit}>
          <Form.Item
            name="game_name"
            rules={[{ required: true, message: t("pleaseInputGameName") }]}
          >
            <Input placeholder={t("gameName")} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("search")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CustomSearch;
