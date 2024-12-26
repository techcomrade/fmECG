import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Row, Col, Breadcrumb, Dropdown, Avatar, Tooltip, Badge } from "antd"; // Import Badge
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import avatar from "../assets/avatar.png";
import { getRoutesByRole, IRouteItem } from "./routes.type";
import { Context } from "../utils/context";
import "./header.scss";
import { FacebookFilled, TwitterSquareFilled, InstagramFilled } from '@ant-design/icons';
import { ClockCircleOutlined } from "@ant-design/icons";
const UserMenu = ({ logOut }: { logOut: () => void }) => {
  return [
    {
      key: "0",
      label: (
        <NavLink to="/account" className="menu-item-link">
          <UserOutlined className="menu-item-icon" />
          Account
        </NavLink>
      ),
    },
    {
      key: "1",
      label: (
        <NavLink to="/settings" className="menu-item-link">
          <SettingOutlined className="menu-item-icon" />
          Settings
        </NavLink>
      ),
    },
    {
      key: "2",
      label: (
        <div className="menu-item-link" onClick={logOut}>
          <LogoutOutlined className="menu-item-icon" />
          Sign out
        </div>
      ),
    },
  ];
};

const NotificationIcon = () => {
    const [notificationCount, setNotificationCount] = useState(3)
    const onNotificationClick = () => {
        setNotificationCount(0);
        console.log('open notification');
    }
    return <Tooltip title="Notification" color="#108ee9">
        <Badge count={notificationCount} onClick={onNotificationClick}>
            <BellOutlined className="header-icon" />
        </Badge>
    </Tooltip>
}
const MessageIcon = () => {
    return <Tooltip title="Messages">
        <MessageOutlined className="header-icon" />
    </Tooltip>
}
const SocialIcons = () => {
  return (
    <div className="header-social-icons">
        <Tooltip title="Facebook">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookFilled className="social-icon" />
            </a>
        </Tooltip>
        <Tooltip title="Twitter">
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterSquareFilled className="social-icon" />
            </a>
        </Tooltip>
        <Tooltip title="Instagram">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramFilled className="social-icon" />
        </a>
        </Tooltip>
    </div>
  );
};

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
      const interval = setInterval(() => {
          setTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
  });

  return (
      <div className="header-clock-container">
          <ClockCircleOutlined className="header-clock-icon"/>
          <span className="header-clock">{formattedTime}</span>
      </div>
  )
};
export const HeaderBar = () => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
    
    const logOut = () => {
        localStorage.removeItem("ui-context");
        document.cookie = `expired_time=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.href = "/";
    };
    const menulist: { [key: string]: IRouteItem } = getRoutesByRole(Context.role);
    
    const getLabelByKey = (key: string) => {
        if (key === "/account") return "Thông tin tài khoản";
        const entry = Object.values(menulist).find((item: any) => item.key === key);
        return entry ? entry.label : null;
    };
    

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Breadcrumb className="header-breadcrumb">
              <Breadcrumb.Item>
              <NavLink to="/">{t("page.breadcrumb.pages")}</NavLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                  {t(getLabelByKey(pathname) ?? "page.side-bar.home")}
              </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="header-right">
          <div className="header-controls">
            <Clock />
            <NotificationIcon />
            <MessageIcon />
            <SocialIcons />
            <Dropdown
              menu={{ items: UserMenu({ logOut }) }}
              trigger={["click"]}
            >
              <Avatar
                className="user-avatar"
                size={27}
                src={avatar}
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};