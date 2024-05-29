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
  HomeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import DocTorInformation from "../pages/DoctorInformation/doctorInfomation";
import DeviceInformation from "../pages/DeviceInformation/deviceInformation";
import { userRole } from "../constants";
import { context } from "../utils/context";

export const AdminRouterMappingGroup = {
  Home: {
    key: "/",
    label: "Trang chủ",
    component: <Home />,
    icon: <HomeOutlined />,
  },
  User: {
    key: "/user",
    label: "Thông tin người dùng",
    component: <UserTable />,
    icon: <UnorderedListOutlined />,
  },
  Device: {
    key: "/device",
    label: "Thông tin thiết bị",
    component: <DeviceTable />,
    icon: <UnorderedListOutlined />,
  },
  Record: {
    key: "/record",
    label: "Thông tin bản ghi",
    component: <RecordTable />,
    icon: <UnorderedListOutlined />,
  },
  AssignmentPatientDoctor: {
    key: "/pda",
    label: "Quản lý assignment",
    component: <PdaTable />,
    icon: <UnorderedListOutlined />,
  },
  Account: {
    key: "/account",
    label: "Tài khoản",
    component: <DetailUser />,
    icon: <UserOutlined />,
  },
};

export const doctorRouterMappingGroup = {
  Home: {
    key: "/",
    label: "Trang chủ",
    component: <Home />,
    icon: <HomeOutlined />,
  },
  User: {
    key: "/user",
    label: "Quản lý bệnh nhân",
    component: <UserTable />,
    icon: <UnorderedListOutlined />,
  },
  Device: {
    key: "/device",
    label: "Quản lý thiết bị",
    component: <DeviceTable />,
    icon: <UnorderedListOutlined />,
  },
  Record: {
    key: "/record",
    label: "Quản lý bản ghi",
    component: <RecordTable />,
    icon: <UnorderedListOutlined />,
  },
  Account: {
    key: "/account",
    label: "Tài khoản",
    component: <DetailUser />,
    icon: <UserOutlined />,
  },
};

export const patientRouterMappingGroup = {
  Home: {
    key: "/",
    label: "Trang chủ",
    component: <Home />,
    icon: <HomeOutlined />,
  },
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
    icon: <UserOutlined />,
  },
  Account: {
    key: "/account",
    label: "Tài khoản",
    component: <DetailUser />,
    icon: <UserOutlined />,
  },
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
      {routerMapping?.map((item,index)=> (
        <Route path={item?.key} element={item.component} key={index}/>
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </ReactRoutes>
  );
};
