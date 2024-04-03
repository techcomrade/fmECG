import { createUser, deleteUser, getUser, updateUser } from "../../redux/reducer/userSlice";

class UserData {
    getColumnShow() {
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

    getFunction() {
      return {
        createData: createUser,
        getData: getUser,
        updateData: updateUser,
        deleteData: deleteUser
      }
    }
}
  
  
export default UserData;