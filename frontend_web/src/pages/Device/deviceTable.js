import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useEffect, useRef, useState } from "react";
import {
  createDevice,
  deleteDevice,
  getDevice,
  getDeviceByDoctorId,
  getDevicesById,
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
import { DeviceDetail } from "./deviceDetail";
import { context } from "../../utils/context";
import {
  DeviceStatus,
  convertDeviceStatusColor,
  convertDeviceStatusToString,
  convertDeviceTypeColor,
  convertDeviceTypeToString,
  userRole,
} from "../../constants";
import { Tag } from "antd";

const DeviceTable = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.device);
  const [selectedData, setSelectedData] = useState([]);
  const [dataTable, setData] = useState([]);
  const [dropdownData, setDropData] = useState([]);
  const modalUpdateRef = useRef(null);
  const modalAddRef = useRef(null);
  const drawerRef = useRef(null);

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
      render: (status) => {
        let color = convertDeviceTypeColor(status);
        return (
          <Tag color={color} key={status}>
            {convertDeviceTypeToString(status)}
          </Tag>
        );
      },
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
      type: "select",
      dataSelect: dropdownData,
      isEdit: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      type: "select",
      dataSelect: DeviceStatus,
      isEdit: true,
      render: (status) => {
        let color = convertDeviceStatusColor(status);
        return (
          <Tag color={color} key={status}>
            {convertDeviceStatusToString(status)}
          </Tag>
        );
      },
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
  ];

  useEffect(() => {
    if (context.role === userRole.doctor) {
      dispatch(getDeviceByDoctorId(context.user_id));
    } else if (context.role === userRole.patient) {
      dispatch(getDevicesById(context.user_id));
    } else {
      dispatch(getDevice());
    }
    const getOptionData = async () => {
      const userData = await httpGetData("/user");
      setDropData(userData.metadata);
    };
    getOptionData();
  }, []);

  // Get data
  useEffect(() => {
    if (dataState.loadDataStatus === loadStatus.Success) {
      const rawData = dataState.data.metadata;
      const data = rawData.map((element) => handleData(element, "render"));
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
    const dataModal = handleData(rowData, "form");
    modalUpdateRef.current?.open(dataModal, columns);
  };

  const handleSubmitEditUser = (data) => {
    const { doctor_id, frequency, ...payload } = { ...data };
    return dispatch(updateDevice(payload));
  };

  const handleSubmitAddFunction = (data) => {
    return dispatch(createDevice(data));
  };

  const handleData = (data, type) => {
    let deviceData = { ...data };

    if (type === "form") {
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          deviceData[key] = dayjs(data[key], "DD/MM/YYYY");
        }
      });
    }

    if (type === "render") {
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          deviceData[key] = convertTimeToDate(data[key]);
        }
      });
    }

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
        handleOpenDrawer={(id) => drawerRef.current?.open(id)}
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
      <DeviceDetail ref={drawerRef} />
    </>
  );
};

export default DeviceTable;
