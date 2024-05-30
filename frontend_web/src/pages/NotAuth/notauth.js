import React from "react";
import { Button, Result } from "antd";
import { getCookie } from "../../utils/storageUtils";

const NotAuth = () => {
  const redirect_url = getCookie('redirect_api') ? decodeURIComponent(getCookie('redirect_api')) : false;
  return (
    <Result
      status="403"
      title="Error"
      subTitle="Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại."
      extra={<Button type="primary">
        <a href={redirect_url ?? "/login"}>Back to login</a>
      </Button>}
    />
  );
};
export default NotAuth;
