import { createUser, deleteUser, getUser, resetLoadDataStatus, resetCreateDataStatus, resetUpdateDataStatus, resetDeleteDataStatus, updateUser } from "../../redux/reducer/userSlice";

class UserData {
    getColumnShow() {
      const columns = [
        {
          title: 'Họ và tên',
          dataIndex: 'username',
          key: 'username',
          isEdit: true
        },
        {
          title: 'Ngày sinh',
          dataIndex: 'birth',
          key: 'birth',
          isEdit: true
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phone_number',
          key: 'phone_number',
          isEdit: true
        },
        {
          title: 'Thiết bị',
          dataIndex: 'devices',
          key: 'devices',
          isEdit: false
        },
      ];

        return columns;
    }

    getFunction() {
      return {
        createData: createUser,
        getData: getUser,
        updateData: updateUser,
        deleteData: deleteUser,
        resetLoadDataStatus: resetLoadDataStatus,
        resetCreateDataStatus: resetCreateDataStatus,
        resetDeleteDataStatus: resetDeleteDataStatus,
        resetUpdateDataStatus: resetUpdateDataStatus
      }
    }

    checkDateIndex(index) {
      const dateIndex = ['birth']
      return dateIndex.includes(index);
  }
}
  
  
export default UserData;