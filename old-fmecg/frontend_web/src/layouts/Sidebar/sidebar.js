import { Layout, theme, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getRoutesByRole } from "../route";
import { context } from "../../utils/context";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { UserOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons";
import "./sidebar.scss";
import { useTranslation } from 'react-i18next';
const { Sider } = Layout;

const Sidebar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("/");
  var menulist = getRoutesByRole(context.role);
  const { pathname } = useLocation();
  useEffect(() => {
    setSelectedKey(pathname);
  }, [pathname]);
  const { t, i18n } = useTranslation();

  return (
    <Sider width={200} style={{ background: colorBgContainer }} >
      <div className="brand">
        <img src={logo} alt="" />
      </div>

      <Menu
        mode={"inline"}
        selectedKeys={selectedKey}
        defaultSelectedKeys={["/"]}
        className="menu-sidebar"
      >
        <Menu.Item className="menu-item" key="/" onClick={() => navigate("/")}>
          <span className="menu-item-box-icon">
            <HomeOutlined />
          </span>
          <span>{t("page.side-bar.home")}</span>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="6">
          {t("page.side-bar.management")}
        </Menu.Item>
        {menulist.map((item) => {
          return (
            <Menu.Item
              key={item.key}
              className="menu-item"
              onClick={() => navigate(item.key)}
            >
              <span className="menu-item-box-icon">{item.icon}</span>
              <span>{t(item.label)}</span>
            </Menu.Item>
          );
        })}
        <Menu.Item className="menu-item-header" key="5">
         {t("page.side-bar.account-management")}
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/account"
          onClick={() => navigate("/account")}
        >
          <span className="menu-item-box-icon">
            <UserOutlined />
          </span>
          <span>{t("page.side-bar.account-info")}</span>
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/setting"
          onClick={() => navigate("/")}
        >
          <span className="menu-item-box-icon">
          <SettingOutlined />
          </span>
          <span>{t("page.side-bar.setting")}</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default Sidebar;
