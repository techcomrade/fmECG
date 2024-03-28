import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import "./Loading.css"
import { useState } from 'react';

const Loading = (props) => {
  const backdrop =  document.getElementsByClassName('loader-container')[0].classList;
  if(props.loading){
    backdrop.remove('none')
  }
  else {
    backdrop.add('none')
  }

  return (
    <>
        <div className="loader-container none">
            <Spin 
                spinning={props.loading}  
                size='large'
                indicator={
                    <LoadingOutlined style={{fontSize: 80,}} spin />
                }
            />
        </div>
    </>
  );
};

export default Loading;