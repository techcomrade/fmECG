import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import DataTable from "../../components/Table/dataTable";
import { getAllDevices, resetDataLoadingStatus } from "../../redux/deviceSlice";
import { ApiLoadingStatus } from "../../utils/loadingStatus";

export const Device = () => {
  const dispatch = useAppDispatch();
  const dataState = useAppSelector(state => state.device);
  const [dataTable, setDataTable] = React.useState<any[]>([]);

  const columns = [
    {
      title: "Tên thiết bị",
      dataIndex: "device_name",
      key: "device_name",
      type: "text",
      isEdit: true,
    },
    {
      title: "Loại thiết bị",
      dataIndex: "device_type_id",
      key: "birth",
      type: "date",
      isEdit: true,
    },
    {
      title: "Bác sĩ phụ trách",
      dataIndex: "doctor_name",
      key: "doctor_name",
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
      title: "Ngày bắt đầu sử dụng",
      dataIndex: "start_date",
      key: "start_date",
      type: "date",
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
    dispatch(getAllDevices());
  }, []);

  // Get data
  React.useEffect(() => {
    if (dataState.dataLoadingStatus === ApiLoadingStatus.Success) {
      setDataTable(dataState.data);
    }
  }, [dataState.dataLoadingStatus]);

  return (
    <>
      <DataTable
        addButton
        editButton
        deleteButton
        column={columns}
        name="Thông tin thiết bị"
        data={dataTable}
        loading={dataState.dataLoadingStatus === ApiLoadingStatus.Loading}
      />
    </>
  );
};
