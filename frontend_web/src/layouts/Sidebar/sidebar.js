import { Layout, theme, Menu } from "antd";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getRoutesByRole } from "../route";
import { context } from "../../utils/context";
import logo from "../../assets/logo.png";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import "./sidebar.scss";

const { Sider } = Layout;

function ComponentWithLink(props) {
  const { children, path } = props;
  return (
    <NavLink to={path}>
      {({ isActive }) => {
        console.log(isActive);
        return (
          <div
            style={{
              backgroundColor: isActive ? "#e6f4ff" : "#fff",
              borderRadius: "5px",
            }}
          >
            {children(isActive)}
          </div>
        )
      }}
    </NavLink>
  );
}

export const MenuList = () => {
  const navigate = useNavigate();
  const menulist = getRoutesByRole(context.role);

  return menulist
    ? menulist.map((item) => ({
        ...item,
        onClick: () => navigate(item.key),
      }))
    : [];
};

const Sidebar = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  var menulist = getRoutesByRole(context.role);

  menulist = menulist
    ? menulist.map((item) => ({
        ...item,
        onClick: () => navigate(item.key),
      }))
    : [];

  return (
    <Sider width={200} style={{ background: colorBgContainer }}>
      <div className="brand">
        <img src={logo} alt="" />
      </div>
      <Menu mode={"inline"} selectedKeys={["1"]}>
        <ComponentWithLink path="/">
          {(isActive) => (
            <Menu.Item
              className="menu-item"
              style={{ color: isActive ? "#1f93ff" : "#000" }}
            >
              <div className="menu-item-box">
                <span className="menu-item-box-icon">
                  <HomeOutlined />
                </span>
                <span>Trang chủ</span>
              </div>
            </Menu.Item>
          )}
        </ComponentWithLink>
        <Menu.Item className="menu-item-header" key="6">
          Quản lý
        </Menu.Item>
        {menulist.map((item) => {
          console.log("menulist: ", menulist);
          return (
            <ComponentWithLink key={item.key} path={item.key}>
              {({ isActive }) => (
                <Menu.Item
                  key={item.key}
                  className="menu-item"
                  style={{ color: isActive?  "#1f93ff" : "#000" }}
                >
                  <div className="menu-item-box">
                    <span className="menu-item-box-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </Menu.Item>
              )}
            </ComponentWithLink>
          );
        })}
        <Menu.Item className="menu-item-header" key="5">
          Tài Khoản
        </Menu.Item>
        <ComponentWithLink key="account" path="/account">
          {({ isActive }) => (
            <Menu.Item
              className="menu-item"
              style={{ color: isActive ? "#1f93ff" : "#000" }}
            >
              <div className="menu-item-box">
                <span className="menu-item-box-icon">
                  <UserOutlined />
                </span>
                <span>Thông tin tài khoản</span>
              </div>
            </Menu.Item>
          )}
        </ComponentWithLink>
      </Menu>
    </Sider>
  );
};
export default Sidebar;
