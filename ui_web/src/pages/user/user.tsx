import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import DataTable from "../../components/Table/dataTable";
import { getAllUsers, resetDataLoadingStatus } from "../../redux/userSlice";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { convertGenderToString } from "../../constraints"

export const UserTable = () => {
  const dispatch = useAppDispatch();
  const dataState = useAppSelector(state => state.user);
  const [dataTable, setDataTable] = React.useState<any[]>([]);

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
      type: "text",
      isEdit: true,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      type: "text",
      isEdit: true,
    },
    {
      title: "Ngày sinh",
      dataIndex: "birth",
      key: "birth",
      type: "date",
      isEdit: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
      type: "text",
      isEdit: true,
    },
    {
      title: "Chức vụ",
      dataIndex: "role_id",
      key: "role_id",
      type: "text",
      isEdit: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status_id",
      key: "status_id",
      type: "text",
      isEdit: true,
    },
    {
      title: "Thông tin",
      dataIndex: "information",
      key: "information",
      type: "text",
      isEdit: true,
    }
  ];
  React.useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  // Get data
  React.useEffect(() => {
    if (dataState.dataLoadingStatus === ApiLoadingStatus.Success) {
      const data = dataState.data.map((user: any) => ({
        ...user,
        gender: convertGenderToString(user.gender),
      }));
      setDataTable(data);
    }
  }, [dataState.dataLoadingStatus]);

  return (
    <>
      <DataTable
        addButton
        editButton
        deleteButton
        column={columns}
        name="Thông tin người dùng"
        data={dataTable}
        loading={dataState.dataLoadingStatus === ApiLoadingStatus.Loading}
      />
    </>
  );
};
