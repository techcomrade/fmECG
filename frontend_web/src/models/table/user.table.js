import { httpGetData } from "../../api/common.api";
import { Button, Space } from "antd";

class UserData {
    getColumnShow(callBack) {
      const columns = [
        {
          title: 'STT',
          dataIndex: 'index',
          key: 'id',
        },
        {
          title: 'Họ và tên',
          dataIndex: 'name',
          key: 'name',
          // render: (text) => <a>{text}</a>
        },
        {
          title: 'Giới tính',
          dataIndex: 'gender',
          key: 'gender',
        },
        {
          title: 'Ngày sinh',
          dataIndex: 'birthday',
          key: 'birthday',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
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