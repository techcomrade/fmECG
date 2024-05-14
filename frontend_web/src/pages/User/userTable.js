import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useEffect, useRef, useState } from "react";
import {
  getUser,
  loadStatus,
  resetUpdateDataStatus,
  updateUser,
  deleteUser,
  resetDeleteDataStatus,
} from "../../redux/reducer/userSlice";
import { convertDateToTime, convertGenderToString, convertTimeToDate } from "../../utils/dateUtils";
import { ModalControlData } from "../../components/Modal/ModalControlData";
import { findElementById, checkDateTypeKey } from "../../utils/arrayUtils";
import { showNotiSuccess } from "../../components/Notification";

const UserTable = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.user);
  const [dataTable, setDataTable] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const modalUpdateRef = useRef(null);
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "username",
      key: "username",
      type: "text",
      isEdit: true,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      type: "select",
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
      title: "Thiết bị",
      dataIndex: "devices",
      key: "devices",
      type: "text",
      isEdit: false,
    },
    {
      title: "Số lượng bản ghi",
      dataIndex: "records",
      key: "records",
      type: "text",
      isEdit: false,
    },
  ];
  useEffect(() => {
    dispatch(getUser());
  }, []);

  // Get data
  useEffect(() => {
    if (dataState.loadDataStatus === loadStatus.Success) {
      const rawData = dataState.data.metadata;
      const data = rawData.map((element, index) => ({
        ...element,
        birth: convertTimeToDate(element.birth),
        gender: convertGenderToString(element.gender)
      }));
      setDataTable(data);
    }
  }, [dataState.loadDataStatus]);

  useEffect(() => {
    if (dataState.loadUpdateDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã sửa user thành công");
      dispatch(getUser());
    }
  }, [dataState.loadUpdateDataStatus]);

  useEffect(() => {
    if (dataState.loadDeleteDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã xoá user thành công ");
      dispatch(getUser());
    }
  }, [dataState.loadDeleteDataStatus]);

  const handleDeleteFunction = (id) => {
    dispatch(deleteUser({ id: id }));
    dispatch(resetDeleteDataStatus());
  };

  const handleEditFunction = () => {
    const userData = findElementById(dataTable, selectedData[0]);
    modalUpdateRef.current?.open(userData, columns);
  };

  const handleSubmitEditUser = (data) => {
    var userData = data;
    Object.keys(data).forEach((key) => {
      if (checkDateTypeKey(key)) {
        userData[key] = convertDateToTime(data[key]);
      }
    });
    dispatch(updateUser(userData));
    dispatch(resetUpdateDataStatus());
  };

  return (
    <>
      <DataTable
        editButton
        editFunction={handleEditFunction}
        deleteButton
        deleteFunction={handleDeleteFunction}
        addDeviceButton
        hasCheckBox
        updateSelectedData={setSelectedData}
        column={columns}
        name="Bảng người dùng"
        data={dataTable}
        loading={dataState.loadDataStatus === loadStatus.Loading}
      />
      <ModalControlData
        ref={modalUpdateRef}
        title="Sửa thông tin người dùng"
        submitFunction={(data) => handleSubmitEditUser(data)}
      />
    </>
  );
};

export default UserTable;
