import { Descriptions, Drawer, Table } from 'antd';
import { useEffect, useState } from 'react';
import './Drawer.scss'

const DrawerComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(()=>{
    setIsOpen(props?.isOpen);
    setData(props?.data);
  }, [props]);

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
            <Descriptions column={1}>
              {Object.keys(props.labels).map((key) => {
                  const label = props.labels[key];
                  const customKey = Object.keys(props?.customDetail);                  
                  if (label) {
                    if (customKey.includes(key)) {
                      return (
                        <Descriptions.Item label={label} key={label}>
                          {props.customDetail?.[key]}
                        </Descriptions.Item>
                      )
                    }
                    else {
                      return <Descriptions.Item label={label} key={label}>{data[key]}</Descriptions.Item>
                    }
                  }
                })
              }
            </Descriptions>
            
      </Drawer>
    </>
  );
};

export const DrawerSide = DrawerComponent;