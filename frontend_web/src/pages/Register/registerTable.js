import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useEffect, useRef, useState } from "react";
import {
  getCheckRegister,
  loadStatus,
} from "../../redux/reducer/registerSlice";
import { Tag } from "antd";
import { convertTimeToDate } from "../../utils/dateUtils";
import {
  UserStatus,
  convertGenderToString,
  convertRegisterStatusToString,
  convertRoleToString,
  convertStatusToString,
  convertStringToGender,
  convertStringToRole,
  userRole,
} from "../../constants";
import { ModalControlData } from "../../components/Modal/ModalControlData";
import { findElementById, checkDateTypeKey } from "../../utils/arrayUtils";
import { showNotiSuccess } from "../../components/Notification";
import { GENDER, ROLE } from "../../constants";
import dayjs from "dayjs";

const RegisterTable = (props) => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.register);
  const [dataTable, setDataTable] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const modalUpdateRef = useRef(null);
  const drawerRef = useRef(null);

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "username",
      key: "username",
      type: "text",
      isEdit: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      type: "text",
      isEdit: true,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      type: "select",
      dataSelect: GENDER,
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
      title: "Tác vụ",
      dataIndex: "role",
      key: "role",
      type: "select",
      dataSelect: ROLE,
      isEdit: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      type: "select",
      dataSelect: UserStatus,
      isEdit: true,
      render: (status) => {
        let color = "";
        if(status === 2 ) color =  "volcano";
        if(status === 1) color = "#95ea78";
        if( status === 0 ) color = "geekblue";
        return (
          <Tag color={color} key={status}>
            {convertRegisterStatusToString(status)}
          </Tag>
        );
      },
    },
    {
      title: "Thông tin",
      dataIndex: "information",
      key: "information",
      type: "text",
      isEdit: true,
    },
  ];

  const handleData = (data, type) => {
    let userData = {};

    if (type === "form") {
      userData = {
        ...data,
        gender: convertStringToGender(data.gender),
        role: convertStringToRole(data.role),
      };

      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          userData[key] = dayjs(data[key], "DD/MM/YYYY");
        }
      });
    }

    if (type === "render") {
      userData = {
        ...data,
        gender: convertGenderToString(data.gender),
        role: convertRoleToString(data.role),
      };

      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          userData[key] = convertTimeToDate(data[key]);
        }
      });
    }

    return userData;
  };

  useEffect(() => {
    dispatch(getCheckRegister());
  }, []);

  // Get data
  useEffect(() => {
    if (dataState.loadDataStatus === loadStatus.Success) {
      const rawData = dataState.data.metadata;
      console.log(rawData)
      const data = rawData.map((element) => handleData(element, "render"));
      setDataTable(data);
    }
  }, [dataState.loadDataStatus]);

  return (
    <>
      <DataTable
        column={columns}
        name={"Thông tin người dùng đăng kí"}
        data={dataTable}
        loading={dataState.loadDataStatus === loadStatus.Loading}
        //   handleOpenDrawer={(id) => drawerRef.current?.open(id)}
      />
      {/* <ModalControlData
        ref={modalUpdateRef}
        title= {getTitleTable()}
        submitFunction={(data) => handleSubmitEditUser(data)}
      /> */}
      {/* <UserDetail ref={drawerRef} /> */}
    </>
  );
};

export default RegisterTable;


