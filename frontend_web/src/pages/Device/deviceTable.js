import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useEffect, useRef, useState } from "react";
import {
  createDevice,
  deleteDevice,
  getDevice,
  loadStatus,
  resetCreateDataStatus,
  resetDeleteDataStatus,
  resetUpdateDataStatus,
  updateDevice,
} from "../../redux/reducer/deviceSlice";
import { convertTimeToDate } from "../../utils/dateUtils";
import { findElementById, checkDateTypeKey } from "../../utils/arrayUtils";
import { showNotiSuccess } from "../../components/Notification";
import { ModalControlData } from "../../components/Modal/ModalControlData";
import { httpGetData } from "../../api/common.api";
import dayjs from "dayjs";

const DeviceTable = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.device);
  const [selectedData, setSelectedData] = useState([]);
  const [dataTable, setData] = useState([]);
  const [dropdownData, setDropData] = useState([]);
  const modalUpdateRef = useRef(null);
  const modalAddRef = useRef(null);

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
      dataIndex: "device_type",
      key: "device_type",
      type: "text",
      isEdit: true,
    },
    {
      title: "Tên người dùng",
      dataIndex: "user_id",
      key: "user_id",
      type: "select",
      dataSelect: dropdownData,
      isEdit: true,
      hidden: true
    },
    {
      title: "Thông tin thiết bị",
      dataIndex: "information",
      key: "information",
      type: "text",
      isEdit: true,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
      key: "start_date",
      type: "date",
      isEdit: true,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      key: "end_date",
      type: "date",
      isEdit: true,
    },
  ];

  useEffect(() => {
    dispatch(getDevice());
    const getOptionData = async() => {
      const userData = await httpGetData('/user');
      setDropData(userData.metadata);
    }
    getOptionData();
  }, []);

  // Get data
  useEffect(() => {
    if (dataState.loadDataStatus === loadStatus.Success) {
      const rawData = dataState.data.metadata;
      const data = rawData.map((element, index) => ({
        ...element,
        start_date: convertTimeToDate(element.start_date),
        end_date: convertTimeToDate(element.end_date),
      }));
      setData(data);
    }
  }, [dataState.loadDataStatus]);

  useEffect(() => {
    if (dataState.loadUpdateDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã sửa thiết bị thành công");
      dispatch(resetUpdateDataStatus());
      dispatch(getDevice());
    }
  }, [dataState.loadUpdateDataStatus]);

  useEffect(() => {
    if (dataState.loadDeleteDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã xoá thiết bị thành công");
      dispatch(resetDeleteDataStatus());
      dispatch(getDevice());
    }
  }, [dataState.loadDeleteDataStatus]);

  useEffect(() => {
    if (dataState.loadCreateDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã tạo thiết bị thành công");
      dispatch(resetCreateDataStatus());
      dispatch(getDevice());
    }
  }, [dataState.loadCreateDataStatus]);

  const handleDeleteFunction = (id) => {
    dispatch(deleteDevice({ id: id }));
  };

  const handleEditFunction = () => {
    const rowData = findElementById(dataTable, selectedData[0]);
    const dataModal = handleData(rowData);
    modalUpdateRef.current?.open(dataModal, columns);
  };

  const handleSubmitEditUser = (data) => {
    return dispatch(updateDevice(handleData(data)));
  };

  const handleSubmitAddFunction = (data) => {
    return dispatch(createDevice(handleData(data)));
  };

  const handleData = (data) => {
    let deviceData = {...data};
    Object.keys(data).forEach((key) => {
      if (checkDateTypeKey(key)) {
        deviceData[key] = dayjs(data[key], "DD/MM/YYYY");      
      }
    });
    return deviceData;
  };

  return (
    <>
      <DataTable
        editButton
        editFunction={handleEditFunction}
        addButton
        addFunction={() => modalAddRef.current?.open({}, columns)}
        deleteButton
        deleteFunction={handleDeleteFunction}
        name="Bảng quản lý thiết bị"
        data={dataTable}
        column={columns}
        updateSelectedData={setSelectedData}
        loading={dataState.loadDataStatus === loadStatus.Loading}
      />
      <ModalControlData
        ref={modalUpdateRef}
        title="Sửa thông tin thiết bị"
        submitFunction={(data) => handleSubmitEditUser(data)}
      />
      <ModalControlData
        ref={modalAddRef}
        title="Thêm thiết bị mới"
        submitFunction={(data) => handleSubmitAddFunction(data)}
      />
    </>
  );
};

export default DeviceTable;
