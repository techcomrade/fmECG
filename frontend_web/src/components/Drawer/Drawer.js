import { Descriptions, Drawer } from 'antd';
import { useEffect, useState } from 'react';

const DrawerComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(()=>{
    setIsOpen(props?.isOpen);
    setData(props?.data);
  },[props])

  return (
    <>
        <Drawer
            closable
            destroyOnClose
            title={props?.title}
            placement="right"
            open={isOpen}
            onClose={() => {
              props?.closed()
              return setIsOpen(false)
            }}
            width={600}
        >
          {props?.customData}
            <Descriptions column={2}>
              {Object.keys(props.labels).map((key) => {
                  const label = props.labels[key];
                  if(label) {
                    return <Descriptions.Item label={label}>{data[key]}</Descriptions.Item>
                  }
                })
              }
            </Descriptions>
      </Drawer>
    </>
  );
};

export const DrawerSide = DrawerComponent;