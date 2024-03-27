import { UserOutlined, HomeOutlined, QuestionCircleOutlined} from '@ant-design/icons';
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
    icon: <QuestionCircleOutlined />,
    isHide: false,
    url: "/user",
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