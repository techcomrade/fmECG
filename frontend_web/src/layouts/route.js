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
import { getLocalStorage } from "../utils/storageUtils";

export const routerMappingGroup = {
  Home: {
    key: "/",
    label: "Trang chủ",
    component: <Home />,
    icon: <HomeOutlined />,
  },
  User: {
    key: "/user",
    label: "Quản lý người dùng",
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
export const userRole = getLocalStorage("role") ?? "";
export const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={routerMappingGroup.Home.component} />
      <Route path="/account" element={<DetailUser />} />
      <Route path="/user" element={<UserTable />} />
      <Route path="/device" element={<DeviceTable />} />
      <Route path="/record" element={<RecordTable />} />
      <Route path="/pda" element={<PdaTable />} />
      <Route path="*" element={<Navigate to="/" />} />
    </ReactRoutes>
  );
};

