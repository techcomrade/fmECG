import Home from "../pages/Home/home";
import DetailUser from "../pages/Account/Detail";
import NotFound from "../pages/NotFound/notfound";
import DataTable from "../components/Table/dataTable";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import UserTable from "../pages/User/userTable";
import DeviceTable from "../pages/Device/deviceTable";
import RecordTable from "../pages/Record/recordTable";



export const Routes = () => {
    return (
        <ReactRoutes>
            <Route path="/" element={<Home/>} />
            <Route path="/account" element={<DetailUser/>} />
            <Route path="/user" element={<UserTable/>} />
            <Route path="/device" element={<DeviceTable/>} />
            <Route path="/record" element={<RecordTable/>}/>
            <Route path="*" element={<NotFound/>} />
        </ReactRoutes>
    )
}