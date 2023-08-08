import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { Menu, Button, Drawer } from "antd";
import {
  EyeOutlined,
  YoutubeOutlined,
  VideoCameraOutlined,
  StarFilled,
} from "@ant-design/icons";

import { useTranslation } from "react-i18next";

const { SubMenu } = Menu;

function Favorites({ favoriteItems }) {
  const { t } = useTranslation();
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const { videos, streams, clips } = favoriteItems;

  const onDrawerClose = () => {
    setDisplayDrawer(false);
  };

  const onFavoriteClick = () => {
    setDisplayDrawer(true);
  };

  return (
    <>
      <Button
        type="primary"
        shape="round"
        onClick={onFavoriteClick}
        icon={<StarFilled />}
      >
        {t("myFavorite")}
      </Button>
      <Drawer
        title="My Favorites"
        placement="right"
        width={720}
        visible={displayDrawer}
        onClose={onDrawerClose}
      >
        <Menu
          mode="inline"
          defaultOpenKeys={["streams"]}
          style={{ height: "100%", borderRight: 0 }}
          selectable={false}
        >
          <SubMenu key={"streams"} icon={<EyeOutlined />} title={t("streams")}>
            <MenuItem items={streams} />
          </SubMenu>
          <SubMenu
            key={"videos"}
            icon={<YoutubeOutlined />}
            title={t("videos")}
          >
            <MenuItem items={videos} />
          </SubMenu>
          <SubMenu
            key={"clips"}
            icon={<VideoCameraOutlined />}
            title={t("clips")}
          >
            <MenuItem items={clips} />
          </SubMenu>
        </Menu>
      </Drawer>
    </>
  );
}

export default Favorites;
