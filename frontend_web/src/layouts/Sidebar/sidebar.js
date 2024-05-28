import { Layout, theme, Menu} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoutesByRole } from '../route';
import { context } from '../../utils/context';

const { Sider } = Layout;

export const MenuList = () => {
  const navigate = useNavigate()
  const menulist = getRoutesByRole(context.role);

  return menulist ? menulist.map(item => ({
    ...item,
    onClick: () => navigate(item.key)
  })) : []

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
