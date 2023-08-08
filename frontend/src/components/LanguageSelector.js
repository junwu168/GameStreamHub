import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleClick = ({ key }) => {
    i18n.changeLanguage(key);
  };

  const languageMap = {
    // map language keys to their display names
    en: "English",
    zh: "中文",
    // add more languages here
  };

  const menu = (
    <Menu onClick={handleClick}>
      {Object.keys(languageMap).map((langKey) => (
        <Menu.Item key={langKey}>{languageMap[langKey]}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button
        style={{ background: "#001529", color: "white", marginRight: "20px" }}
      >
        <GlobalOutlined /> {i18n.language === "zh" ? "中文" : "English"}
      </Button>
    </Dropdown>
  );
}

export default LanguageSelector;
