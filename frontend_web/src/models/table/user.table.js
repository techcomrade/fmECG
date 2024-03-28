
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
}
  
  
export default UserData;