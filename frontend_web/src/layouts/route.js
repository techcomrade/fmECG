import Home from "../pages/Home/home";
import DetailUser from "../pages/Account/Detail";
import NotFound from "../pages/NotFound/notfound";
import DataTable from "../components/Table/dataTable";
import CreateUser from "../pages/User/CreateUser";
import { Route, Routes as ReactRoutes } from "react-router-dom";



export const Routes = () => {
    return (
        <ReactRoutes>
            <Route path="/" element={<Home/>} />
            <Route path="/account" element={<DetailUser/>} />
            <Route path="/user" element={<DataTable/>} />
            <Route path="/create-user" element={<CreateUser/>} />
            <Route path="*" element={<NotFound/>} />
        </ReactRoutes>
    )
}