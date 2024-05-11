import { UserOutlined, HomeOutlined, UnorderedListOutlined} from '@ant-design/icons';
import { Layout, theme} from 'antd';
import React from 'react';
import MenuBar from '../../components/MenuBar/menubar';

const { Sider } = Layout;

export const MenuList = () => [
  {
    key: "/",
    title: "Trang chủ",
    icon: <HomeOutlined />,
    isHide: false,
    url: "/",
  },
  {
    key: "/manage_users",
    title: "Quản lí người dùng",
    icon: <UnorderedListOutlined />,
    isHide: false,
    url: "/user",
  },
  {
    key: "/manage_devices",
    title: "Quản lí thiết bị",
    icon: <UnorderedListOutlined />,
    isHide: false,
    url: "/device",
  },
  {
    key: "/manage_records",
    title: "Quản lí record",
    icon: <UnorderedListOutlined />,
    isHide: false,
    url: "/record",
  },
  {
    key: "/my_account",
    title: "Tài khoản",
    icon: <UserOutlined />,
    isHide: false,
    url: "/account",
  },
];

const Sidebar = ({children}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Sider
        width={200}
        style={{ background: colorBgContainer,}}
    >
        <MenuBar menuList={MenuList()} mode="inline" />
    </Sider>
  )
    
};
export default Sidebar;