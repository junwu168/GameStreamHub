import { Layout, Row, Col, Button } from "antd";
import Register from "./Register";
import Login from "./Login";
import React from "react";
import Favorites from "./Favorites";

import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const { Header } = Layout;

function PageHeader({
  loggedIn,
  signoutOnClick,
  signinOnSuccess,
  favoriteItems,
}) {
  const { t } = useTranslation();

  return (
    <Header>
      <Row justify="space-between">
        <Col>{loggedIn && <Favorites favoriteItems={favoriteItems} />}</Col>
        <Col>
          <LanguageSelector />
          {loggedIn && (
            <Button shape="round" onClick={signoutOnClick}>
              {t("signout")}
            </Button>
          )}
          {!loggedIn && (
            //empty tag, like div
            <>
              <Login onSuccess={signinOnSuccess} />
              <Register />
            </>
          )}
        </Col>
      </Row>
    </Header>
  );
}

export default PageHeader;
