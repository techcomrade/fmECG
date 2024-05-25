import React from "react";
import { Button, Result } from "antd";
import { getCookie, getLocalStorage } from "../../utils/storageUtils";

const NotAuth = () => {
  const redirect_url = decodeURIComponent(getCookie('redirect_api'));
  

  return (
    <Result
      status="403"
      title="Error"
      subTitle="Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại."
      extra={<Button type="primary">
        <a href={redirect_url ?? "/"}>Back to login</a>
      </Button>}
    />
  );
};
export default NotAuth;
