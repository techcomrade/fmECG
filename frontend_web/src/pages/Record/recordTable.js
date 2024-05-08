import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useEffect, useRef, useState } from "react";
import {
  createRecord,
  deleteRecord,
  getRecord,
  resetCreateDataStatus,
  resetDeleteDataStatus,
  resetUpdateDataStatus,
  updateRecord,
  loadStatus
} from "../../redux/reducer/recordSlice";
import { convertDateToTime, convertTimeToDate } from "../../utils/dateUtils";
import { findElementById, checkDateTypeKey } from "../../utils/arrayUtils";
import { showNotiSuccess } from "../../components/Notification";
import { ModalControlData } from "../../components/Modal/ModalControlData";
import { getCookie, getLocalStorage } from "../../utils/storageUtils";
const RecordTable = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.record);
  const [selectedData, setSelectedData] = useState([]);
  const [dataTable, setData] = useState([]);
  const modalUpdateRef = useRef(null);
  const modalAddRef = useRef(null);
    const user_id = getLocalStorage("user");
  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "user_id",
      key: "user_id",
      type: "text",
      isEdit: true,
    },
    {
      title: "Tên thiết bị",
      dataIndex: "device_id",
      key: "device_id",
      type: "text",
      isEdit: true,
    },
    {
        title: "Loại bản ghi",
        dataIndex: "device_type",
        key: "information",
        type: "text",
        isEdit: true,
      },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_time",
      key: "start_time",
      type: "date",
      isEdit: true,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_time",
      key: "end_time",
      type: "date",
      isEdit: true,
    },
  ];
  useEffect(() => {
    dispatch(getRecord());
  }, []);

  // Get data
  useEffect(() => {
    if (dataState.loadDataStatus === loadStatus.Success) {
      const rawData = dataState.data.metadata;
      const data = rawData.map((element, index) => ({
        ...element,
        start_time: convertTimeToDate(element.start_time),
        end_time: convertTimeToDate(element.end_time),
      }));
      setData(data);
    }
  }, [dataState.loadDataStatus]);

  useEffect(() => {
    if (dataState.loadUpdateDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã sửa thiết bị thành công");
      dispatch(getRecord());
    }
  }, [dataState.loadUpdateDataStatus]);

  useEffect(() => {
    if (dataState.loadDeleteDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã xoá thiết bị thành công");
      dispatch(getRecord());
    }
  }, [dataState.loadDeleteDataStatus]);

  useEffect(() => {
    if (dataState.loadCreateDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã xoá thiết bị thành công");
      dispatch(getRecord());
    }
  }, [dataState.loadCreateDataStatus]);

  const handleDeleteFunction = (id) => {
    dispatch(deleteRecord({ id: id }));
    dispatch(resetDeleteDataStatus());
  };

  const handleEditFunction = () => {
    const userData = findElementById(dataTable, selectedData[0]);
    modalUpdateRef.current?.open(userData, columns);
  };

  // const handleSubmitEditUser = (data) => {
  //   dispatch(updateRecord(handleData(data)));
  //   dispatch(resetUpdateDataStatus());
  // };

  // const handleSubmitAddFunction = (data) => {
  //   dispatch(createRecord(handleData(data)));
  //   dispatch(resetCreateDataStatus());
  // };
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
        addFunction={() => modalAddRef.current?.open({}, columns)}
        deleteButton
        deleteFunction={handleDeleteFunction}
        name="Bảng quản lý record"
        data={dataTable}
        column={columns}
        updateSelectedData={setSelectedData}
      />
      {/* <ModalControlData
        ref={modalUpdateRef}
        title="Sửa thông tin record"
        submitFunction={(data) => handleSubmitEditUser(data)}
      />
      <ModalControlData
        ref={modalAddRef}
        title="Thêm record mới"
        submitFunction={(data) => handleSubmitAddFunction(data)}
      /> */}
    </>
  );
};

export default RecordTable;
