/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

import { Row, Col, Breadcrumb, Button, Input, Dropdown, Avatar } from "antd";
import { getLocalStorage } from "../../utils/storageUtils";
import { context } from "../../utils/context";
import { getRoutesByRole } from "../route";
import "./header.css";
import { NavLink } from "react-router-dom";
import { BellFilled } from "@ant-design/icons";
import { SettingFilled, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

function Header() {
  const handleLogOut = async () => {
    const redirect_url = getLocalStorage("redirect_api");
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const cookieParts = cookie.split("=");
      const cookieName = cookieParts[0].trim();
      document.cookie =
        cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
    localStorage.clear();
    window.location.href = `${redirect_url ?? "/"}`;
  };
  const { pathname } = useLocation();
  const items = [
    {
      label: (
        <a
          href="#/account"
          style={{ display: "flex", justifyContent: "start" }}
        >
          Account
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a href="" style={{ display: "flex", justifyContent: "start" }}>
          Setting
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a style={{ display: "flex" }} onClick={handleLogOut}>
          Sign out
        </a>
      ),
      key: "2",
    },
  ];
  var menulist = getRoutesByRole(context.role);
  function getLabelByKey(key) {
    const entry = Object.values(menulist).find((item) => item.key === key);
    if (key === "/account") return "Thông tin tài khoản";
    return entry ? entry.label : null;
  }
  useEffect(() => window.scrollTo(0, 0));
  return (
    <div className="header-container">
      <Row gutter={[24, 0]}>
        <Col span={24} md={12} className="header-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {getLabelByKey(pathname) ?? "Trang chủ"}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            ></span>
          </div>
        </Col>
        <Col span={24} md={12} className="header-control">
          <div className="header-icon-box">
            <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
              <SettingFilled />
              </Dropdown>
          </div>
          <div className="header-icon-box">
            <NavLink to="/" style={{ color: "#000" }}>
              <BellFilled />
            </NavLink>
          </div>
          
            <div onClick={(e) => e.preventDefault()}>
            <NavLink to="/account" style={{ color: "#000" }}>
              <Avatar
                size={"large"}
                icon={<UserOutlined />}
                className="user-avatar"
              />
              </NavLink>
            </div>
          <Input
            className="header-search"
            placeholder="Type here..."
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Header;
