import { httpGetData } from "../../api/common.api";
import { Button, Space } from "antd";

class UserData {
    getColumnShow(callBack) {
      const columns = [
        {
          title: 'Họ và tên',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Ngày sinh',
          dataIndex: 'birth',
          key: 'birth',
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phone_number',
          key: 'phone_number',
        },
      ];

        return columns;
    }

    async getDataShow() {
      const data = await httpGetData('/users');
      return data;
    }
    
}
  
  
export default UserData;