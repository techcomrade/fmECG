import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';


const MenuBar = ({ menuList, mode, className, ...props }) => {
  const navigate = useNavigate()

  return (
    <Menu
      mode={mode}
      className={className}
      selectedKeys={['1']}
      defaultOpenKeys={[]}
    >
      {
        menuList.filter(item=> !item.isHide)
        .map((item, index) => {
          if(item.children && item.children.length > 0) {
            return (
              <Menu.SubMenu
                title={item.title}
                key={item.title}
                icon={item.icon}
              >
                {
                  item.children.filter(subMenu => !subMenu.isHide)
                  .map(subMenu => (
                    <Menu.Item
                      onClick={() => {
                        navigate(subMenu.url)
                      }}
                      key={subMenu.title}
                    >
                      {subMenu.title}
                    </Menu.Item>
                    )
                  )}
              </Menu.SubMenu>
            )
          }
          else {
            return (
              <Menu.Item
                key={item.title}
                icon={item.icon}
                onClick={() => {
                navigate(item.url)
              }}
              >
                {item.title}
              </Menu.Item>
            )
          }
        })
      }
    </Menu>
  )
}

export default MenuBar;