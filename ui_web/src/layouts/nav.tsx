import { Layout, theme, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { getRoutesByRole } from "../route";
// import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import {
  UserOutlined,
  HomeOutlined,
  DesktopOutlined,
  SettingOutlined,
  ScheduleOutlined,
  TeamOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import "./nav.scss";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";

const { Sider } = Layout;

export const Nav = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState(["/"]);

  return (
    <Sider width={200} style={{ background: colorBgContainer }}>
      <div className="brand">
        <img alt="ecg admin" src={logo} />
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

        <Menu.Item
          key="/user"
          className="menu-item"
          onClick={() => navigate("/user")}
        >
          <span className="menu-item-box-icon">
          <TeamOutlined />
          </span>
          <span>Thông tin người dùng</span>
        </Menu.Item>

        <Menu.Item
          key="/device"
          className="menu-item"
          onClick={() => navigate("/device")}
        >
          <span className="menu-item-box-icon">
            <DesktopOutlined />
          </span>
          <span>Thông tin thiết bị</span>
        </Menu.Item>

        <Menu.Item
          key="/record"
          className="menu-item"
          onClick={() => navigate("/record")}
        >
          <span className="menu-item-box-icon">
          <LineChartOutlined />
          </span>
          <span>Thông tin bản ghi</span>
        </Menu.Item>

        <Menu.Item
          key="/schedule"
          className="menu-item"
          onClick={() => navigate("/schedule")}
        >
          <span className="menu-item-box-icon">
            <ScheduleOutlined />
          </span>
          <span>Thông tin lịch khám</span>
        </Menu.Item>

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
