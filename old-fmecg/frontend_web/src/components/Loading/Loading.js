import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import "./Loading.css"
import { useState } from 'react';

const Loading = () => {
  return (
    <>
        <div className="loader-container">
            <Spin 
                spinning={'spinning'}  
                size='large'
                indicator={
                    <LoadingOutlined style={{fontSize: 70,}} spin />
                }
            />
        </div>
    </>
  );
};

export default Loading;