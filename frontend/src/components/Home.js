import React from "react";
import { Button, Card, List, message, Tabs, Tooltip } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { addFavoriteItem, deleteFavoriteItem } from "../utils";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;
const tabKeys = {
  Streams: "stream",
  Videos: "videos",
  Clips: "clips",
};

const processUrl = (url) =>
  url
    .replace("%{height}", "252")
    .replace("%{width}", "480")
    .replace("{height}", "252")
    .replace("{width}", "480");

const renderCardTitle = (item, loggedIn, favs = [], favOnChange, t) => {
  const title = `${item.broadcaster_name} - ${item.title}`;

  const isFav = favs.find((fav) => fav.twitch_id === item.twitch_id);

  const favOnClick = () => {
    if (isFav) {
      deleteFavoriteItem(item)
        .then(() => {
          favOnChange();
        })
        .catch((err) => {
          message.error(t(err.message));
        });

      return;
    }

    addFavoriteItem(item)
      .then(() => {
        favOnChange();
      })
      .catch((err) => {
        message.error(t(err.message));
      });
  };

  return (
    <>
      {loggedIn && (
        <Tooltip
          title={isFav ? "Remove from favorite list" : "Add to favorite list"}
        >
          <Button
            shape="circle"
            icon={isFav ? <StarFilled /> : <StarOutlined />}
            onClick={favOnClick}
          />
        </Tooltip>
      )}
      <div
        style={{ overflow: "hidden", textOverflow: "ellipsis", width: "auto" }}
      >
        <Tooltip title={title} placement="top">
          <span>{title}</span>
        </Tooltip>
      </div>
    </>
  );
};

const renderCardGrid = (data, loggedIn, favs, favOnChange, t) => {
  return (
    //adjust number of columns based on screen size
    <List
      grid={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginRight: "20px" }}>
          <Card title={renderCardTitle(item, loggedIn, favs, favOnChange)}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%", height: "100%" }}
            >
              <img
                alt="Placeholder"
                src={processUrl(item.thumbnail_url)}
                style={{ width: "100%", height: "100%" }}
                onError={(e) => {
                  e.target.onerror = null; // prevent infinite loop if default image doesn't exist
                  e.target.src = "https://placehold.co/480x252?text=No+Preview"; // replace with default image URL
                }}
              />
            </a>
          </Card>
        </List.Item>
      )}
    />
  );
};

const Home = ({ resources, loggedIn, favoriteItems, favoriteOnChange }) => {
  const { videos, streams, clips } = resources;
  const {
    videos: favVideos,
    streams: favStreams,
    clips: favClips,
  } = favoriteItems;

  const { t } = useTranslation();

  return (
    <Tabs defaultActiveKey={tabKeys.Streams}>
      <TabPane tab={t("streams")} key={tabKeys.Streams} forceRender={true}>
        {renderCardGrid(streams, loggedIn, favStreams, favoriteOnChange)}
      </TabPane>
      <TabPane tab={t("videos")} key={tabKeys.Videos} forceRender={true}>
        {renderCardGrid(videos, loggedIn, favVideos, favoriteOnChange)}
      </TabPane>
      <TabPane tab={t("clips")} key={tabKeys.Clips} forceRender={true}>
        {renderCardGrid(clips, loggedIn, favClips, favoriteOnChange)}
      </TabPane>
    </Tabs>
  );
};

export default Home;
