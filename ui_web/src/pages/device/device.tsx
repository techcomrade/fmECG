import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import DataTable from "../../components/Table/dataTable";
import { ModalControlData } from "../../components/Modal/ModalControlData";
import { DeviceDetail } from "./device.details";
import {
  getAllDevices,
  updateDeviceById,
  deleteDeviceById,
  resetLoadAddDataStatus,
  resetLoadUpdateDataStatus,
  resetLoadDeleteDataStatus,
  addDevice,
} from "../../redux/reducer/deviceSlice";
import { getAllDoctors } from "../../redux/reducer/userSlice";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { convertTimeToDate, checkDateTypeKey } from "../../utils/dateUtils";
import { findElementById } from "../../utils/arrayUtils";
import {
  deviceType,
  convertDeviceTypeToString,
  convertStringToDeviceType,
  deviceStatus,
  convertDeviceStatusToString,
  convertStringToDeviceStatus,
} from "../../constants";
import dayjs from "dayjs";

type DeviceDetailType = {
  open: (id: string) => void;
};

type AddEditDeviceType = {
  open: (data: any[], columns: any[]) => void;
};

export const Device = () => {
  const dispatch = useAppDispatch();
  const dataState = useAppSelector((state) => state.device);
  const doctorState = useAppSelector((state) => state.user);
  const [dataTable, setDataTable] = React.useState<any[]>([]);
  const [doctorDropDown, setDoctorDropDown] = React.useState<any[]>([]);
  const [selectedData, setSelectedData] = React.useState<any[]>([]);
  const drawerRef = React.useRef<DeviceDetailType>(null);
  const modalAddRef = React.useRef<AddEditDeviceType>(null);
  const modalUpdateRef = React.useRef<AddEditDeviceType>(null);

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
      key: "device_type_id",
      type: "select",
      isEdit: true,
      dataSelect: deviceType,
    },
    {
      title: "Bác sĩ phụ trách",
      dataIndex: "doctor_name",
      key: "doctor_name",
      type: "select",
      isEdit: false,
    },
    {
      title: "Bác sĩ phụ trách",
      dataIndex: "doctor_id",
      key: "doctor_id",
      type: "select",
      isEdit: true,
      hidden: true,
      dataSelect: doctorDropDown.map((doctor) => ({
        value: doctor.id,
        label: doctor.username,
      })),
    },
    {
      title: "Trạng thái",
      dataIndex: "status_id",
      key: "status_id",
      type: "select",
      isEdit: true,
      dataSelect: deviceStatus,
    },
    {
      title: "Thông tin",
      dataIndex: "information",
      key: "information",
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
  ];

  const handleData = (data: any, type: string) => {
    let deviceData = {} as any;

    if (type === "edit-form") {
      deviceData = {
        ...data,
        status_id: convertStringToDeviceStatus(data.status_id),
        device_type_id: convertStringToDeviceType(data.device_type_id),
      };
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          deviceData[key] = dayjs(data[key], "DD/MM/YYYY");
        }
      });
    }

    if (type === "render") {
      deviceData = {
        ...data,
        status_id: convertDeviceStatusToString(data.status_id),
        device_type_id: convertDeviceTypeToString(data.device_type_id),
      };
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          deviceData[key] = convertTimeToDate(data[key]);
        }
      });
    }

    return deviceData;
  };

  React.useEffect(() => {
    dispatch(getAllDevices());
    dispatch(getAllDoctors());
  }, []);

  // Get data
  React.useEffect(() => {
    if (dataState.loadDataStatus === ApiLoadingStatus.Success) {
      const rawData = dataState.data.map((device) =>
        handleData(device, "render")
      );
      setDataTable(rawData);
    }
  }, [dataState.loadDataStatus]);

  React.useEffect(() => {
    if (doctorState.loadDoctorDataStatus === ApiLoadingStatus.Success) {
      setDoctorDropDown(doctorState.doctorData);
    }
  }, [doctorState.loadDoctorDataStatus]);

  React.useEffect(() => {
    if (dataState.loadAddDataStatus === ApiLoadingStatus.Success) {
      dispatch(resetLoadAddDataStatus());
      dispatch(getAllDevices());
    }
  }, [dataState.loadAddDataStatus]);

  React.useEffect(() => {
    if (dataState.loadUpdateDataStatus === ApiLoadingStatus.Success) {
      dispatch(resetLoadUpdateDataStatus());
      dispatch(getAllDevices());
    }
  }, [dataState.loadUpdateDataStatus]);

  React.useEffect(() => {
    if (dataState.loadDeleteDataStatus === ApiLoadingStatus.Success) {
      dispatch(resetLoadDeleteDataStatus());
      dispatch(getAllDevices());
    }
  }, [dataState.loadDeleteDataStatus]);

  const handleEditFunction = () => {
    const deviceData = findElementById(dataTable, selectedData[0]);
    const dataEdit = handleData(deviceData, "edit-form");
    modalUpdateRef.current?.open(dataEdit, columns);
  };

  const handleSubmitAddFunction = (data: any) => {
    console.log("Payload được gửi:", data);
    return dispatch(addDevice(data));
  };

  const handleSubmitEditDevice = (data: any) => {
    const { ...payload } = data || {};
    return dispatch(updateDeviceById(payload));
  };

  const handleDeleteFunction = (id: string) => {
    dispatch(deleteDeviceById(id));
  };

  const initData: any = {
    device_name: "",
    device_type_id: "",
    doctor_id: "",
    status_id: "",
    information: "",
  };

  return (
    <>
      <DataTable
        addButton
        editButton
        deleteButton
        column={columns}
        name="Thông tin thiết bị"
        data={dataTable}
        loading={dataState.loadDataStatus === ApiLoadingStatus.Loading}
        updateSelectedData={setSelectedData}
        addFunction={() => modalAddRef.current?.open(initData, columns)}
        editFunction={handleEditFunction}
        deleteFunction={handleDeleteFunction}
        handleOpenDrawer={(id) => drawerRef.current?.open(id)}
      />
      <ModalControlData
        ref={modalAddRef}
        title="Thêm thiết bị mới"
        submitFunction={(data: any) => handleSubmitAddFunction(data)}
        className="add-device"
      />
      <ModalControlData
        ref={modalUpdateRef}
        title="Sửa thông tin thiết bị"
        submitFunction={(data: any) => handleSubmitEditDevice(data)}
      />
      <DeviceDetail ref={drawerRef} />
    </>
  );
};
