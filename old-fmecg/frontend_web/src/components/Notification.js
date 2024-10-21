import React from 'react';
import { Button, notification, Space } from 'antd';

export const showNotiSuccess = (descript) => {
    notification.success({
        message: "Thành công",
        description: descript,
        placement: 'topRight'
      });
};

export const showNotInfo = (descript) => {
  notification.info({
      message: "Thông tin",
      description: descript,
      placement: 'topRight'
    });
};

export const showNotiError = (descript) => {
  notification.error({
      message: "Error",
      description: descript,
      placement: 'topRight'
    });
};

export const showNotiWarning = (descript) => {
  notification.warning({
      message: "Cảnh báo",
      description: descript,
      placement: 'topRight'
    });
};