import Home from "../pages/Home/home";
import DetailUser from "../pages/Account/Detail";
import NotFound from "../pages/NotFound/notfound";
import { Navigate, Route, Routes as ReactRoutes } from "react-router-dom";
import UserTable from "../pages/User/userTable";
import DeviceTable from "../pages/Device/deviceTable";
import RecordTable from "../pages/Record/recordTable";
import PdaTable from "../pages/PatientDoctorAssignment/pdaTable";
import {
  UserOutlined,
  UnorderedListOutlined,
  WechatWorkOutlined,
  UsergroupAddOutlined,
  DesktopOutlined,
  LineChartOutlined
} from "@ant-design/icons";
import { userRole } from "../constants";
import { context } from "../utils/context";
// import Chat from "../pages/Chat/chat";

export const AdminRouterMappingGroup = {
  User: {
    key: "/user",
    label: "Thông tin người dùng",
    component: <UserTable />,
    icon: <UsergroupAddOutlined />,
  },
  Device: {
    key: "/device",
    label: "Thông tin thiết bị",
    component: <DeviceTable />,
    icon: <DesktopOutlined />,
  },
  Record: {
    key: "/record",
    label: "Thông tin bản ghi",
    component: <RecordTable />,
    icon: <LineChartOutlined />,
  },
  AssignmentPatientDoctor: {
    key: "/pda",
    label: "Thông tin assignment",
    component: <PdaTable />,
    icon: <UnorderedListOutlined />,
  }
};

export const doctorRouterMappingGroup = {
  User: {
    key: "/user",
    label: "Quản lý bệnh nhân",
    component: <UserTable />,
    icon: <UsergroupAddOutlined />,
  },
  Device: {
    key: "/device",
    label: "Quản lý thiết bị",
    component: <DeviceTable />,
    icon: <DesktopOutlined />,
  },
  Record: {
    key: "/record",
    label: "Quản lý bản ghi",
    component: <RecordTable />,
    icon: <LineChartOutlined />,
  },
  // Chat:{
  //   key:"/chat",
  //   label: "Chat với bác sĩ",
  //   component: <Chat />,
  //   icon: <WechatWorkOutlined />
  // }
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
    label: "Thông tin thiết bị",
    component: <DeviceTable />,
    icon: <DesktopOutlined />,
  },
  RecordInformation: {
    key: "/record",
    label: "Dữ liệu sức khoẻ",
    component: <RecordTable />,
    icon: <LineChartOutlined />,
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
