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
import { convertDateToTime, convertTimeToDate } from "../../utils/dateUtils";
import { findElementById, checkDateTypeKey } from "../../utils/arrayUtils";
import { showNotiSuccess } from "../../components/Notification";
import { ModalControlData } from "../../components/Modal/ModalControlData";
import { getCookie } from "../../utils/storageUtils";
const DeviceTable = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.device);
  const [selectedData, setSelectedData] = useState([]);
  const [dataTable, setData] = useState([]);
  const modalUpdateRef = useRef(null);
  const modalAddRef = useRef(null);
    const user_id = getCookie("user");
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
      dispatch(getDevice());
    }
  }, [dataState.loadUpdateDataStatus]);

  useEffect(() => {
    if (dataState.loadDeleteDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã xoá thiết bị thành công");
      dispatch(getDevice());
    }
  }, [dataState.loadDeleteDataStatus]);

  useEffect(() => {
    if (dataState.loadCreateDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã xoá thiết bị thành công");
      dispatch(getDevice());
    }
  }, [dataState.loadCreateDataStatus]);

  const handleDeleteFunction = (id) => {
    dispatch(deleteDevice({ id: id }));
    dispatch(resetDeleteDataStatus());
  };

  const handleEditFunction = () => {
    const userData = findElementById(dataTable, selectedData[0]);
    modalUpdateRef.current?.open(userData, columns);
  };

  const handleSubmitEditUser = (data) => {
    dispatch(updateDevice(handleData(data)));
    dispatch(resetUpdateDataStatus());
  };

  const handleSubmitAddFunction = (data) => {
    console.log("hello");
    dispatch(createDevice(handleData(data)));
    dispatch(resetCreateDataStatus());
  };
  const handleData = (data) => {
    var deviceData = data;
    Object.keys(data).forEach((key) => {
      if (checkDateTypeKey(key)) {
        deviceData[key] = convertDateToTime(data[key]);
      }
    });
    deviceData.user_id = user_id;
    return deviceData;
  };
  return (
    <>
      <DataTable
        editButton
        editFunction={handleEditFunction}
        addButton
        addFunction={() => modalAddRef.current?.open([], columns)}
        deleteButton
        deleteFunction={handleDeleteFunction}
        name="Bảng quản lý thiết bị"
        data={dataTable}
        column={columns}
        updateSelectedData={setSelectedData}
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
