import React, { useState } from "react";
import { Button, Flex, Layout, Menu, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom"; // Dodaj import Outlet

const { Header, Content } = Layout;
import SelectLang from "../organism/SelectLang";
import Sider from "antd/es/layout/Sider";
import { faSignsPost, faCalendar, faBoxesStacked, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

// interface MainLayoutProps {}
// const siderStyle: React.CSSProperties = {
//   // paddingTop: "100px",
//   overflow: "auto",
//   height: "100vh",
//   position: "fixed",
//   insetInlineStart: 0,
//   top: 0,
//   bottom: 0,
//   scrollbarWidth: "thin",
//   scrollbarColor: "unset",
// };
const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const { lang } = useParams();

  // const [miniState, setMiniState] = useState(false);

  // const hideNavigationDescription = () => {
  //   var elements = document.querySelectorAll(".navigation-description");
  //   console.log("elements", elements);
  //   elements.forEach((element) => {
  //     element?.classList.toggle("toggle-navigation-description");
  //   });
  // };
  // const drawerClick = (e: Event) => {
  //   if (miniState) {
  //     setMiniState(false);
  //     e.stopPropagation();
  //   } else {
  //     setMiniState(true);
  //   }
  // };
  const essentialLinks = [
    {
      key: "1",
      label: "Apiaries",
      icon: (
        <Link to={`/${lang}/apiaries`} className="text-link">
          <FontAwesomeIcon icon={faSignsPost} />
        </Link>
      ),
      // link: "apiaries",
      // route: "apiaries",
    },
    {
      key: "2",

      label: "Calendar",
      icon: (
        <Link to={`/${lang}/calendar`} className="text-link">
          <FontAwesomeIcon icon={faCalendar} />
        </Link>
      ),

      // link: "calendar",
      // route: "calendar",
    },
    {
      key: "3",

      label: "Beehives",
      icon: (
        <Link to={`/${lang}/beehives`} className="text-link">
          <FontAwesomeIcon icon={faBoxesStacked} />
        </Link>
      ),

      // link: "beehives",
      // route: "beehives",
    },
    {
      key: "4",

      label: "Login",
      icon: (
        <Link to={`/${lang}/login`} className="text-link">
          <FontAwesomeIcon icon={faSignInAlt} />
        </Link>
      ),

      // link: "login",
      // route: "login",
    },
    {
      key: "5",

      label: "Register",
      icon: (
        <Link to={`/${lang}/register`} className="text-link">
          <FontAwesomeIcon icon={faUserPlus} />
        </Link>
      ),
    },
  ];
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={essentialLinks}></Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "black" }}>
          <Flex>
            <Button
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={(event: any) => {
                // hideNavigationDescription();
                // drawerClick(event);
                setCollapsed(!collapsed);
              }}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <SelectLang />
          </Flex>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
