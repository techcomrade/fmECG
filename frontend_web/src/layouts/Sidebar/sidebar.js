import { UserOutlined, HomeOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import { Layout, theme} from 'antd';
import React from 'react';
import { useNavigate } from "react-router-dom"; 
import MenuBar from '../../components/MenuBar/menubar';

const { Header, Content, Sider } = Layout;

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
    children: [
      {
        key: "users",
        title: "Người dùng",
        isHide: false,
        url: "/users",
      },
      {
        key: "/create-user",
        title: "Tạo người dùng",
        isHide: false,
        url: "/create-user",
      },
    ],
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

  const navigate = useNavigate();

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