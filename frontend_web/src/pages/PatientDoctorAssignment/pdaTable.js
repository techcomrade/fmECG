import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useEffect, useRef, useState } from "react";
import {
  getAssignment,
  getPatientByDoctorId,
  loadStatus,
} from "../../redux/reducer/pdaSlice";
import { convertTimeToDate } from "../../utils/dateUtils";
import { httpGetData } from "../../api/common.api";
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
      const data = rawData.map((element, index) => ({
        ...element,
        start_date: convertTimeToDate(element.start_date),
      }));
      setData(data);
    }
  }, [dataState.loadDataStatus]);

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
    </>
  );
};

export default PdaTable;
