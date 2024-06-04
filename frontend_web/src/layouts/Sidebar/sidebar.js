import { Layout, theme, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getRoutesByRole } from "../route";
import { context } from "../../utils/context";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { UserOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons";
import "./sidebar.scss";

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
          <span>Trang chủ</span>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="6">
          Quản lý
        </Menu.Item>
        {menulist.map((item) => {
          return (
            <Menu.Item
              key={item.key}
              className="menu-item"
              onClick={() => navigate(item.key)}
            >
              <span className="menu-item-box-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Menu.Item>
          );
        })}
        <Menu.Item className="menu-item-header" key="5">
          Tài Khoản
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/account"
          onClick={() => navigate("/account")}
        >
          <span className="menu-item-box-icon">
            <UserOutlined />
          </span>
          <span>Thông tin tài khoản</span>
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="/setting"
          onClick={() => navigate("/")}
        >
          <span className="menu-item-box-icon">
          <SettingOutlined />
          </span>
          <span>Cài đặt</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default Sidebar;
