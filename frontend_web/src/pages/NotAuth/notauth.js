import React from "react";
import { Button, Result } from "antd";

const NotAuth = () => {
  const redirectAPI = process.env.REACT_APP_BIN;

  return (
    <Result
      status="403"
      title="Error"
      subTitle="Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại."
      extra={<Button type="primary">
        <a href={redirectAPI}>Back to login</a>
      </Button>}
    />
  );
};
export default NotAuth;
