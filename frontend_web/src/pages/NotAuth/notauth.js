import React from 'react';
import { Button, Result } from 'antd';

const NotAuth = () => (
  <Result
    status="403"
    title="Error"
    subTitle="Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại."
    extra={<Button type="primary">Back to login</Button>}
  />
);
export default NotAuth;