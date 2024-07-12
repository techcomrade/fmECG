import Home from "../pages/Home/home";
import DetailUser from "../pages/Account/Detail";
import { Navigate, Route, Routes as ReactRoutes } from "react-router-dom";
import UserTable from "../pages/User/userTable";
import DeviceTable from "../pages/Device/deviceTable";
import RecordTable from "../pages/Record/recordTable";
import PdaTable from "../pages/PatientDoctorAssignment/pdaTable";
import RegisterTable from "../pages/Register/registerTable"
import {
  UserOutlined,
  UnorderedListOutlined,
  WechatWorkOutlined,
  UsergroupAddOutlined,
  DesktopOutlined,
  LineChartOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  OpenAIOutlined
} from "@ant-design/icons";
import { userRole } from "../constants";
import { context } from "../utils/context";
import Chat from "../pages/Chat/chat";
import AITraining from "../pages/AITranningChat/chat";

export const AdminRouterMappingGroup = {
  User: {
    key: "/user",
    label: "page.side-bar.user-info",
    component: <UserTable />,
    icon: <UsergroupAddOutlined />,
  },
  Device: {
    key: "/device",
    label: "page.side-bar.device-info",
    component: <DeviceTable />,
    icon: <DesktopOutlined />,
  },
  Record: {
    key: "/record",
    label:  "page.side-bar.record-info",
    component: <RecordTable />,
    icon: <LineChartOutlined />,
  },
  AssignmentPatientDoctor: {
    key: "/pda",
    label: "page.side-bar.assignment-doctor",
    component: <PdaTable />,
    icon: <UserSwitchOutlined />,
  },
  Register: {
    key: "/registers",
    label: "page.side-bar.register-info",
    component: <RegisterTable />,
    icon: <UserAddOutlined />,
  },
  Chat: {
    key: "/training",
    label: "Training AI",
    component:<AITraining />,
    icon: <OpenAIOutlined />,
  }
};

export const doctorRouterMappingGroup = {
  User: {
    key: "/user",
    label: "Thông tin bệnh nhân",
    component: <UserTable />,
    icon: <UsergroupAddOutlined />,
  },
  Device: {
    key: "/device",
    label: "page.side-bar.record-info",
    component: <DeviceTable />,
    icon: <DesktopOutlined />,
  },
  Record: {
    key: "/record",
    label:  "page.side-bar.record-info",
    component: <RecordTable />,
    icon: <LineChartOutlined />,
  },
  Chat:{
    key:"/chat",
    label: "Chat với bệnh nhân",
    component: <Chat />,
    icon: <WechatWorkOutlined />
  }
};

export const patientRouterMappingGroup = {

  DoctorInformation: {
    key: "/doctor",
    label: "Thông tin bác sĩ",
    component: <UserTable />,
    icon: <UserOutlined />,
  },
  DeviceInformation: {
    key: "/device",
    label: "page.side-bar.device-info",
    component: <DeviceTable />,
    icon: <DesktopOutlined />,
  },
  RecordInformation: {
    key: "/record",
    label:  "page.side-bar.record-info",
    component: <RecordTable />,
    icon: <LineChartOutlined />,
  }
  ,
  Chat:{
    key:"/chat",
    label: "Chat với bác sĩ",
    component: <Chat />,
    icon: <WechatWorkOutlined />
  }
};

export const getRoutesByRole = (role) => {
  switch (role) {
    case userRole.admin:
      return Object.values(AdminRouterMappingGroup);
    case userRole.doctor:
      return Object.values(doctorRouterMappingGroup);
    case userRole.patient:
      return Object.values(patientRouterMappingGroup);
    default:
      return {};
  }
};

const routerMapping = getRoutesByRole(context.role);

export const Routes = () => {
  return (
    <ReactRoutes>
      {routerMapping?.map((item, index) => (
        <Route path={item?.key} element={item.component} key={index} />
      ))}
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<DetailUser />} />
      <Route path="*" element={<Navigate to="/" />} />
    </ReactRoutes>
  );
};
