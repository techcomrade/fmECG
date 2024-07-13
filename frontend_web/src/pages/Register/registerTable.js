import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useEffect, useRef, useState } from "react";
import {
  acceptedRegister,
  getCheckRegister,
  loadStatus,
  rejectedRegister,
  resetAcceptStatus,
  resetRejectStatus,
} from "../../redux/reducer/registerSlice";
import { Tag } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
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
import { Button, Modal } from "antd";
import { ModalControlData } from "../../components/Modal/ModalControlData";
import { findElementById, checkDateTypeKey } from "../../utils/arrayUtils";
import { showNotiSuccess } from "../../components/Notification";
import { GENDER, ROLE } from "../../constants";
import dayjs from "dayjs";
import { UserAddOutlined, DeleteOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
const { confirm } = Modal;

const RegisterTable = (props) => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.register);
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
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      render: (status) => {
        let color = "";
        if (status === 2) color = "volcano";
        if (status === 1) color = "#95ea78";
        if (status === 0) color = "geekblue";
        return (
          <Tag color={color} key={status}>
            {convertRegisterStatusToString(status)}
          </Tag>
        );
      },
    },
    {
      title: t("column.note"),
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
      const data = rawData.map((element) => handleData(element, "render"));
      setDataTable(data);
    }
  }, [dataState.loadDataStatus]);

  useEffect(() => {
    if (dataState.loadAcceptStatus === loadStatus.Success) {
      showNotiSuccess("Tài khoản đã được phê duyệt vào hệ thống");
      dispatch(resetAcceptStatus());
      dispatch(getCheckRegister());
    }
  }, [dataState.loadAcceptStatus]);

  useEffect(() => {
    if (dataState.loadRejectStatus === loadStatus.Success) {
      showNotiSuccess("Tài khoản đã bị từ chối thành công");
      dispatch(resetRejectStatus());
      dispatch(getCheckRegister());
    }
  }, [dataState.loadRejectStatus]);

  const renderButton = () => (
    <>
      <Button
        icon={<UserAddOutlined />}
        disabled={selectedData.length !== 1}
        className="edit-btn"
        onClick={() => {
          confirm({
            title: "Phê duyệt tài khoản",
            icon: <ExclamationCircleFilled />,
            content: "Bạn có chắc chắn muốn phê duyệt tài khoản này không",
            okText: "Đồng ý",
            okType: "primary",
            cancelText: "Không",
            async onOk() {
              dispatch(acceptedRegister({ id: selectedData[0] }));
            },
            onCancel() {},
          });
        }}
      >
        Chấp nhận
      </Button>
      <Button
        icon={<UserDeleteOutlined />}
        disabled={selectedData.length !== 1}
        className="edit-btn"
        onClick={() => {
          confirm({
            title: "Từ chối tài khoản",
            icon: <ExclamationCircleFilled />,
            content: "Bạn có chắc chắn muốn từ chối tài khoản này không",
            okText: "Đồng ý",
            okType: "danger",
            cancelText: "Không",
            async onOk() {
              dispatch(rejectedRegister({ id: selectedData[0] }));
            },
            onCancel() {},
          });
        }}
      >
        Từ chối
      </Button>
      <Button
        icon={<DeleteOutlined />}
        disabled={selectedData.length !== 1}
        className="edit-btn"
        // onClick={() => {
        //   dispatch(checkRecordFile(selectedData[0]));
        //   setIsModalOpen(true);
        // }}
      >
        Xoá 
      </Button>
    </>
  );

  return (
    <>
      <DataTable
        column={columns}
        name={t("title.register-info")}
        data={dataTable}
        loading={dataState.loadDataStatus === loadStatus.Loading}
        customButton={renderButton()}
        updateSelectedData={setSelectedData}

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
