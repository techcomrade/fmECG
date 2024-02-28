import { httpGetData } from "../../api/common.api";
import { Button, Space } from "antd";

class UserData {
    getColumnShow(callBack, getColumnSearchProps) {
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
          ...getColumnSearchProps('name'),
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
          ...getColumnSearchProps('email'),
        },
        {
          title: 'Hành động',
          dataIndex: 'action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <Button type="primary" onClick={() => callBack('edit', record.id)}>Edit</Button>
              <Button type="primary" danger onClick={() => callBack('delete', record.id)}>Delete</Button>
            </Space>
          )
        }
      ];

        return columns;
    }

    async getDataShow() {
      const data = await httpGetData('/users');
      return data;
    }

    getInfomationToEdit() {

    }

    getInformationToAdd() {

    }

    getHTMLToAdd () {

    }

    getTypeSelectToAdd() {

    }

    getColumnValidate() {

    }
}
  
  
export default UserData;