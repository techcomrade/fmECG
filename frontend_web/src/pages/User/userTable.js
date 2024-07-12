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
  getPatient,
  getDoctor,
} from "../../redux/reducer/userSlice";
import { Tag } from 'antd';
import { convertTimeToDate } from "../../utils/dateUtils";
import {
  UserStatus,
  convertGenderToString,
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
import { UserDetail } from "./userDetail";
import { context } from "../../utils/context";
import { useTranslation } from "react-i18next";

const UserTable = (props) => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.user);
  const [dataTable, setDataTable] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const modalUpdateRef = useRef(null);
  const drawerRef = useRef(null);

  const { t } = useTranslation();
  const columns = [
    {
      title: t("column.user-name"),
      dataIndex: "username",
      key: "username",
      type: "text",
      isEdit: true,
    },
    {
      title: t("column.sex"),
      dataIndex: "gender",
      key: "gender",
      type: "select",
      dataSelect: GENDER,
      isEdit: true,
    },
    {
      title: t("column.birth"),
      dataIndex: "birth",
      key: "birth",
      type: "date",
      isEdit: true,
    },
    {
      title: t("column.phone-number"),
      dataIndex: "phone_number",
      key: "phone_number",
      type: "text",
      isEdit: true,
    },
    {
      title: t("column.role"),
      dataIndex: "role",
      key: "role",
      type: "select",
      dataSelect: ROLE,
      isEdit: true,
    },
    {
      title: t("column.status"),
      dataIndex: "status",
      key: "status",
      type: "select",
      dataSelect: UserStatus,
      isEdit: true,
      render: (status)=>{
        let color = status === 0 ? 'geekblue' : 'volcano'
       return ( <Tag color={color} key={status}>
       {convertStatusToString(status)}
     </Tag>)
      }
    }
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
    if (context.role === userRole.doctor) {
      dispatch(getPatient(context.user_id));
    } else if (context.role === userRole.patient) {
      dispatch(getDoctor(context.user_id))
    } else {
      dispatch(getUser());
    }
  }, []);

  // Get data
  useEffect(() => {
    if (dataState.loadDataStatus === loadStatus.Success) {
      const rawData = dataState.data.metadata;
      const data = rawData.map((element) => handleData(element, "render"));
      setDataTable(data);
    }
  }, [dataState.loadDataStatus]);

  useEffect(() => {
    if (dataState.loadUpdateDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã sửa thông tin người dùng thành công");
      dispatch(resetUpdateDataStatus());
      dispatch(getUser());
    }
  }, [dataState.loadUpdateDataStatus]);

  useEffect(() => {
    if (dataState.loadDeleteDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã xoá người dùng thành công");
      dispatch(resetDeleteDataStatus());
      dispatch(getUser());
    }
  }, [dataState.loadDeleteDataStatus]);

  const handleDeleteFunction = (id) => {
    dispatch(deleteUser({ id: id }));
  };

  const handleEditFunction = () => {
    const userData = findElementById(dataTable, selectedData[0]);
    const dataEdit = handleData(userData, "form");
    modalUpdateRef.current?.open(dataEdit, columns);
  };

  const handleSubmitEditUser = (data) => {
    const { account_id, devices, role, records, status, ...payload } = { ...data };
    return dispatch(updateUser(payload));
  };

  const getTitleTable = () => {
    if (context.role === userRole.doctor) {
      return "Thông tin bệnh nhân";
    } else if (context.role === userRole.patient) {
      return "Bác sĩ điều trị";
    } else {
      return t("title.user-info");
    }
  };
  return (
    <>
      <DataTable
        editButton
        editFunction={handleEditFunction}
        deleteButton
        deleteFunction={handleDeleteFunction}
        hasCheckBox
        updateSelectedData={setSelectedData}
        column={columns}
        name={getTitleTable()}
        data={dataTable}
        loading={dataState.loadDataStatus === loadStatus.Loading}
        handleOpenDrawer={(id) => drawerRef.current?.open(id)}
      />
      <ModalControlData
        ref={modalUpdateRef}
        title= {getTitleTable()}
        submitFunction={(data) => handleSubmitEditUser(data)}
      />
      <UserDetail ref={drawerRef} />
    </>
  );
};

export default UserTable;
