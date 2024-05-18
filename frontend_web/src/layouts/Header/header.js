import React, { useEffect } from "react";
import { Input, Button, Dropdown, Space } from "antd";
import "./header.css";
import {
  SettingOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";



const Header = (item) => {

  const handleLogOut = async () => {
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const cookieParts = cookie.split('=');
    const cookieName = cookieParts[0].trim();
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });
  localStorage.clear();
  window.location.reload()
  };
  
  const items = [
    {
      label: (
        <a href="" style={{ display: "flex", justifyContent: "start" }}>
          Account
        </a>
      ),
      key: "0",
      icon: <UserOutlined />,
    },
    {
      label: (
        <a href="" style={{ display: "flex", justifyContent: "start" }}>
          Setting
        </a>
      ),
      key: "1",
      icon: <SettingOutlined />,
    },
    {
      label: (
        <a style={{ display: "flex" }} onClick={handleLogOut}>
          Sign out
        </a>
      ),
      key: "2",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <>
      <header className="header">
        <span className="header-logo">ECG Admin</span>
        <Input
          placeholder="Tìm kiếm nội dung"
          prefix={<SearchOutlined />}
          className="input-search"
        />
        <span className="user-button-header">
          {(!!item.token) ? <Dropdown
                menu={{
                items,
                }}
                trigger={["click"]}
            >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Button >{item.userName}</Button>
                  </Space>
                </a>
            </Dropdown>
            :<Button href="/login">Login</Button>
            }            
        </span>
      </header>
    </>
  );
};

export default Header;
