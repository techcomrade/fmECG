import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  createRecord,
  deleteRecord,
  getRecord,
  resetCreateDataStatus,
  resetDeleteDataStatus,
  resetUpdateDataStatus,
  updateRecord,
  loadStatus,
  resetLoadDataStatus,
  checkRecordFile,
  resetCheckRecordStatus,
  downloadRecordFile,
  getRecordByDoctorId,
  getRecordByUser,
} from "../../redux/reducer/recordSlice";
import { convertTimeToDateTime } from "../../utils/dateUtils";
import { findElementById, checkDateTypeKey } from "../../utils/arrayUtils";
import { showNotiSuccess } from "../../components/Notification";
import { getLocalStorage } from "../../utils/storageUtils";
import ModalChart from "../../components/Modal/ModalChart";
import { Button, Modal } from "antd";
import { httpGetData } from "../../api/common.api";
import { ModalControlData } from "../../components/Modal/ModalControlData";
import { CloudDownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { RecordDetail } from "./recordDetail";
import FilterRecord from "./filterRecord";
import { context } from "../../utils/context";
import { userRole } from "../../constants";

const RecordTable = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.record);
  const [selectedData, setSelectedData] = useState([]);
  const [dataTable, setData] = useState([]);
  const [openChart, setOpenChart] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  const [dropdownData, setDropData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalUpdateRef = useRef(null);
  const user_id = getLocalStorage("user");
  const drawerRef = useRef(null);

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
      isEdit: false,
    },
    {
      title: "Tên người dùng",
      dataIndex: "user_id",
      key: "user_id",
      type: "select",
      dataSelect: dropdownData.user,
      isEdit: true,
      hidden: true,
    },
    {
      title: "Tên thiết bị",
      dataIndex: "device_name",
      key: "device_name",
      isEdit: false,
    },
    {
      title: "Tên thiết bị",
      dataIndex: "device_id",
      key: "device_id",
      type: "select",
      dataSelect: dropdownData.device,
      isEdit: true,
      hidden: true,
    },
    {
      title: "Loại bản ghi",
      dataIndex: "record_type",
      key: "record_type",
      type: "text",
      isEdit: true,
    },
    {
      title: "Tên bản ghi",
      dataIndex: "record_name",
      key: "record_name",
      type: "text",
      isEdit: false,
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start_time",
      key: "start_time",
      type: "time",
      isEdit: true,
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "end_time",
      key: "end_time",
      type: "time",
      isEdit: true,
    },
  ];

  useEffect(() => {
    if (context.role === userRole.doctor) {
      dispatch(getRecordByDoctorId(context.user_id));
    } else if (context.role === userRole.patient) {
      dispatch(getRecordByUser(context.user_id));
    } else {
      dispatch(getRecord());
    }
    const getOptionData = async () => {
      const userData = await httpGetData("/user");
      const deviceData = await httpGetData("/device");
      setDropData({
        user: userData.metadata,
        device: deviceData.metadata,
      });
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
    dispatch(resetLoadDataStatus());
  }, [dataState.loadDataStatus]);

  useEffect(() => {
    if (dataState.loadUpdateDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã sửa thiết bị thành công");
      dispatch(resetUpdateDataStatus());
      dispatch(getRecord());
    }
  }, [dataState.loadUpdateDataStatus]);

  useEffect(() => {
    if (dataState.loadDeleteDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã xoá thiết bị thành công");
      dispatch(resetDeleteDataStatus());
      dispatch(getRecord());
    }
  }, [dataState.loadDeleteDataStatus]);

  useEffect(() => {
    if (dataState.loadCreateDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã thêm thiết bị thành công");
      dispatch(resetCreateDataStatus());
      dispatch(getRecord());
    }
  }, [dataState.loadCreateDataStatus]);

  const handleDeleteFunction = (id) => {
    dispatch(deleteRecord({ id: id }));
  };

  const handleEditFunction = () => {
    const rowData = findElementById(dataTable, selectedData[0]);
    const dataModal = handleData(rowData, 'form');
    modalUpdateRef.current?.open(dataModal, columns);
  };

  const handleSubmitEditUser = (data) => {
    return dispatch(updateRecord(data));
  };

  const handleSubmitAddFunction = (data) => {
    return dispatch(createRecord(data));
  };

  const handleData = (data, type) => {
    let deviceData = { ...data };

    if (type === "form") {
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          deviceData[key] = dayjs(data[key], "HH:mm DD/MM/YYYY");
        }
      });

      deviceData = {
        ...deviceData,
        user_id: user_id,
        data_rec_url: "http",
      };
    }

    if (type === "render") {
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          deviceData[key] = convertTimeToDateTime(data[key]);
        }
      });
    }
    return deviceData;
  };

  const renderDownloadButton = () => (
    <>
      <>
        <Button
          icon={<CloudDownloadOutlined />}
          disabled={selectedData.length !== 1}
          className="edit-btn"
          onClick={() => {
            dispatch(checkRecordFile(selectedData[0]));
            setIsModalOpen(true);
          }}
        >
          Download
        </Button>
      </>
    </>
  );

  const handleOk = () => {
    downloadRecordFile(selectedData[0]);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(resetCheckRecordStatus());
  };
  const renderMessageDownload = (loadStatus) => {
    switch (loadStatus) {
      case loadStatus.Success:
        return "Bản ghi đã sẵn sàng tải về";
      case loadStatus.Loading:
        return "Đang chuẩn bị file  tải xuống";
      default:
        return "Không tìm thấy bản ghi";
    }
  };
  return (
    <>
      <DataTable
        editButton
        editFunction={handleEditFunction}
        deleteButton
        deleteFunction={handleDeleteFunction}
        name="Bảng quản lý record"
        data={dataTable}
        column={columns}
        updateSelectedData={setSelectedData}
        loading={dataState.loadDataStatus === loadStatus.Loading}
        chartButton
        openChart={() => setOpenChart(true)}
        customButton={renderDownloadButton()}
        handleOpenDrawer={(id) => drawerRef.current?.open(id)}
        customData={<FilterRecord />}
      />

      <ModalControlData
        ref={modalUpdateRef}
        title="Sửa thông tin record"
        submitFunction={(data) => handleSubmitEditUser(data)}
      />

      <ModalChart
        isOpen={openChart}
        setIsOpen={setOpenChart}
        selectedDevice={selectedData}
      />

      <Modal
        title="Download record status"
        open={isModalOpen}
        onOk={handleOk}
        okText="Download"
        confirmLoading={dataState.loadCheckRecordStatus === loadStatus.Loading}
        onCancel={handleCancel}
      >
        {renderMessageDownload(dataState.loadCheckRecordStatus)}
      </Modal>

      <RecordDetail ref={drawerRef} />
    </>
  );
};

export default RecordTable;
