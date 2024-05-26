import { Button, Descriptions, Drawer, Space } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

const DrawerComponent = (props, ref) => {
  const [isOpen, setIsOpen] = useState(props?.isOpen);
  const [data, setData] = useState([]);

  useImperativeHandle(ref, () => ({
    open: (data) => {
      console.log(data);
      setData(data);
      setIsOpen(true);
    },
  }));

  return (
    <>
        <Drawer
            closable
            destroyOnClose
            title={props?.title}
            placement="right"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            width={600}
        >
            <Descriptions column={2}>
              {Object.keys(props?.labels).map((key) => {
                  const label = props?.labels?.[key];
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

export const DrawerSide = forwardRef(DrawerComponent);