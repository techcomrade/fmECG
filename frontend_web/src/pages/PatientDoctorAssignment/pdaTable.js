import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useEffect, useRef, useState } from "react";
import {
  createPda,
  deleteAssignment,
  getAssignment,
  loadStatus,
  resetCreateDataStatus,
  resetLoadDeleteStatus,
  resetLoadUpdateStatus,
  updateAssignment,
} from "../../redux/reducer/pdaSlice";
import { findElementById, checkDateTypeKey } from "../../utils/arrayUtils";
import { convertTimeToDate } from "../../utils/dateUtils";
import { showNotiSuccess } from "../../components/Notification";
import { ModalControlData } from "../../components/Modal/ModalControlData";
import { httpGetData } from "../../api/common.api";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

const PdaTable = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.pda);
  const [dataTable, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const { t } = useTranslation();

  const [dropdownDoctorData, setDropDoctorData] = useState([]);
  const [dropdownPatientData, setDropPatientData] = useState([]);

  const modalUpdateRef = useRef(null);
  const modalAddRef = useRef(null);

  const columns = [
    {
      title: t("column.patient-name"),
      dataIndex: "patient_name",
      key: "patient_name",
      type: "select",
      dataSelect: dropdownPatientData,
      isEdit: true,
    },
    {
      title: t("column.doctor-name"),
      dataIndex: "doctor_name",
      key: "doctor_name",
      type: "select",
      dataSelect: dropdownDoctorData,
      isEdit: true,
    },
    {
      title: t("column.date-started"),
      dataIndex: "start_date",
      key: "start_date",
      type: "date",
      isEdit: true,
    },
    {
      title:  t("column.date-finished"),
      dataIndex: "end_date",
      key: "end_date",
      type: "date",
      isEdit: true,
    },
  ];

  useEffect(() => {
    dispatch(getAssignment());
    const getOptionData = async () => {
      const doctorData = await httpGetData("/user/role/1");
      setDropDoctorData(doctorData.metadata);
      const patientData = await httpGetData("/user/role/2");
      setDropPatientData(patientData.metadata);
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
  useEffect(()=> {
    if(dataState.loadUpdateDataStatus === loadStatus.Success){
      showNotiSuccess("Bạn đã sửa thông tin thành công");
      dispatch(resetLoadUpdateStatus());
      dispatch(getAssignment())
    }
  },[dataState.loadUpdateDataStatus])

  useEffect(()=>{
    if(dataState.loadDeleteDataStatus === loadStatus.Success){
      showNotiSuccess("Bạn đã xoá thông tin thành công");
      dispatch(resetLoadDeleteStatus());
      dispatch(getAssignment())
    }
  },[dataState.loadDeleteDataStatus])

  const handleSubmitAddFunction = (data) => {
    var data_handle = {
      patient_id: data.patient_name,
      doctor_id: data.doctor_name,
      start_date: data.start_date,
      end_date: data.end_date
    }
    return dispatch(createPda(data_handle));
  };
  const handleSubmitEditFunction = (data) => {
    const newData = {
      id: data.id,
      patient_id: data.patient_name,
      doctor_id: data.doctor_name,
      start_date: data.start_date,
      end_date: data.end_date
    }
    return dispatch(updateAssignment(newData));

  }
  const handleEditFunction = (data) => {
    const rowData = findElementById(dataTable,selectedData[0]);
    const dataModal = handleData(rowData, "form");
    modalUpdateRef.current?.open(dataModal,columns);
  }
  const handleDeleteFunction = (id) => {
    return dispatch(deleteAssignment(id))
  }
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
        editButton
        editFunction = {handleEditFunction}
        deleteButton
        deleteFunction = {handleDeleteFunction}
        updateSelectedData={setSelectedData}
        name={t("title.assignment-doctor")}
        data={dataTable}
        column={columns}
        loading={dataState.loadDataStatus === loadStatus.Loading}
      />
      <ModalControlData
        ref={modalAddRef}
        title="Thêm phân công mới"
        submitFunction={(data) => handleSubmitAddFunction(data)}
      />
      <ModalControlData 
      ref={modalUpdateRef}
      title="Sửa thông tin phân công bác sĩ - bệnh nhân"
      submitFunction = {(data) => handleSubmitEditFunction(data)}
      />
    </>
  );
};

export default PdaTable;
