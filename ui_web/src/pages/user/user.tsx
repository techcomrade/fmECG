import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import DataTable from "../../components/Table/dataTable";
import { ModalControlData } from "../../components/Modal/ModalControlData";
import { UserDetail } from "./user.details";
import {
  getAllUsers,
  updateUserById,
  deleteUserById,
  resetLoadUpdateDataStatus,
  resetLoadDeleteDataStatus,
} from "../../redux/reducer/userSlice";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { findElementById } from "../../utils/arrayUtils";
import { convertTimeToDate, checkDateTypeKey } from "../../utils/dateUtils";
import {
  gender,
  convertGenderToString,
  convertStringToGender,
  role,
  convertRoleToString,
  convertStringToRole,
} from "../../constraints";
import dayjs from "dayjs";

type UserDetailType = {
  open: (id: string) => void;
};

type EditUserType = {
  open: (data: any[], columns: any[]) => void;
};

export const User = () => {
  const dispatch = useAppDispatch();
  const dataState = useAppSelector((state) => state.user);
  const [dataTable, setDataTable] = React.useState<any[]>([]);
  const [selectedData, setSelectedData] = React.useState<any[]>([]);
  const drawerRef = React.useRef<UserDetailType>(null);
  const modalUpdateRef = React.useRef<EditUserType>(null);
  const columns = [
    {
      title: "Tên người dùng",
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
      dataSelect: gender,
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
      title: "Chức vụ",
      dataIndex: "role_id",
      key: "role_id",
      type: "select",
      dataSelect: role,
      isEdit: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status_id",
      key: "status_id",
      type: "text",
      isEdit: true,
    },
    {
      title: "Thông tin",
      dataIndex: "information",
      key: "information",
      type: "text",
      isEdit: true,
    },
  ];

  const handleData = (data: any, type: string) => {
    let userData = {} as any;

    if (type === "edit-form") {
      userData = {
        ...data,
        gender: convertStringToGender(data.gender),
        role_id: convertStringToRole(data.role_id),
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
        role_id: convertRoleToString(data.role_id),
      };
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          userData[key] = convertTimeToDate(data[key]);
        }
      });
    }

    return userData;
  };

  React.useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  // Get data
  React.useEffect(() => {
    if (dataState.loadDataStatus === ApiLoadingStatus.Success) {
      const rawData = dataState.data;
      const data = rawData.map((element) => handleData(element, "render"));
      setDataTable(data);
    }
  }, [dataState.loadDataStatus]);
  
  React.useEffect(() => {
    if (dataState.loadUpdateDataStatus === ApiLoadingStatus.Success) {
      dispatch(resetLoadUpdateDataStatus());
      dispatch(getAllUsers());
    }
  }, [dataState.loadUpdateDataStatus]);

  React.useEffect(() => {
    if (dataState.loadDeleteDataStatus === ApiLoadingStatus.Success) {
      dispatch(resetLoadDeleteDataStatus());
      dispatch(getAllUsers());
    }
  }, [dataState.loadDeleteDataStatus]);

  const handleEditFunction = () => {
    const userData = findElementById(dataTable, selectedData[0]);
    const dataEdit = handleData(userData, "edit-form");
    modalUpdateRef.current?.open(dataEdit, columns);
  };

  const handleSubmitEditUser = (data: any) => {
    const { account_id, ...payload } = data || {};
    return dispatch(updateUserById(payload));
  };

  const handleDeleteFunction = (id: string) => {
    dispatch(deleteUserById(id));
  };

  return (
    <>
      <DataTable
        addButton
        editButton
        deleteButton
        column={columns}
        name="Thông tin người dùng"
        data={dataTable}
        loading={dataState.loadDataStatus === ApiLoadingStatus.Loading}
        updateSelectedData={setSelectedData}
        editFunction={handleEditFunction}
        deleteFunction={handleDeleteFunction}
        handleOpenDrawer={(id) => drawerRef.current?.open(id)}
      />
      <ModalControlData
        ref={modalUpdateRef}
        title="Thông tin người dùng"
        submitFunction={(data: any) => handleSubmitEditUser(data)}
      />
      <UserDetail ref={drawerRef} />
    </>
  );
};
