import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useEffect, useRef, useState } from "react";
import {
  createPda,
  getAssignment,
  getPatientByDoctorId,
  loadStatus,
  resetCreateDataStatus,
} from "../../redux/reducer/pdaSlice";
import { findElementById, checkDateTypeKey } from "../../utils/arrayUtils";
import { convertTimeToDate } from "../../utils/dateUtils";
import { showNotiSuccess } from "../../components/Notification";
import { ModalControlData } from "../../components/Modal/ModalControlData";
import { httpGetData } from "../../api/common.api";
import dayjs from "dayjs";

const PdaTable = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.pda);
  const [dataTable, setData] = useState([]);
  const [dropdownData, setDropData] = useState([]);
  const modalUpdateRef = useRef(null);
  const modalAddRef = useRef(null);

  const columns = [
    {
      title: "Tên bệnh nhân",
      dataIndex: "patient_name",
      key: "patient_name",
      type: "text",
      isEdit: true,
    },
    {
      title: "Tên bác sĩ",
      dataIndex: "doctor_name",
      key: "doctor_name",
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
    dispatch(getAssignment());
    const getOptionData = async () => {
      const pdaData = await httpGetData("/pda");
      setDropData(pdaData.metadata);
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
    if (dataState.loadCreateDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã tạo assigment thành công");
      dispatch(resetCreateDataStatus());
      dispatch(getAssignment());
    }
  }, [dataState.loadCreateDataStatus]);

  const handleSubmitAddFunction = (data) => {
    return dispatch(createPda(handleData(data, "form")));
  };

  const handleData = (data, type) => {
    let pdaData = { ...data };

    if (type === "form") {
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          pdaData[key] = dayjs(data[key], "DD/MM/YYYY");
        }
      });
    }

    if (type === "render") {
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          pdaData[key] = convertTimeToDate(data[key]);
        }
      });
    }

    return pdaData;
  };

  return (
    <>
      <DataTable
        addButton
        addFunction={() => modalAddRef.current?.open({}, columns)}
        name="Bảng quản lý assignment"
        data={dataTable}
        column={columns}
        loading={dataState.loadDataStatus === loadStatus.Loading}
      />
      <ModalControlData
        ref={modalAddRef}
        title="Thêm thiết bị mới"
        submitFunction={(data) => handleSubmitAddFunction(data)}
      />
    </>
  );
};

export default PdaTable;
