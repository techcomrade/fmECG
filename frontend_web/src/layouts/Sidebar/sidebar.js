import { UserOutlined, HomeOutlined, UnorderedListOutlined} from '@ant-design/icons';
import { Layout, theme, Menu} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

export const MenuList = () => {
  const navigate = useNavigate()

  return [
    {
      key: "/",
      label: "Trang chủ",
      icon: <HomeOutlined />,
      onClick: () => {
        navigate('/')
      }
    },
    {
      key: "/manage_users",
      label: "Quản lí người dùng",
      icon: <UnorderedListOutlined />,
      onClick: () => {
        navigate('/user')
      }
    },
    {
      key: "/manage_devices",
      label: "Quản lí thiết bị",
      icon: <UnorderedListOutlined />,
      onClick: () => {
        navigate('/device')
      }
    },
    {
      key: "/manage_records",
      label: "Quản lí record",
      icon: <UnorderedListOutlined />,
      onClick: () => {
        navigate('/record')
      }
    },
    {
      key: "/my_account",
      label: "Tài khoản",
      icon: <UserOutlined />,
      onClick: () => {
        navigate('/account')
      }
    },
  ];
} 

const Sidebar = ({children}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Sider
        width={200}
        style={{ background: colorBgContainer,}}
    >
        <Menu
          mode={"inline"}
          selectedKeys={['1']}
          defaultOpenKeys={[]}
          items={MenuList()}
        >
        </Menu>
    </Sider>
  )
    
};
export default Sidebar;