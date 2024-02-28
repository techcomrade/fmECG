import Home from "../pages/Home/home";
import LoginPage from "../pages/Login/Login";
import DetailUser from "../pages/Account/Detail";
import NotFound from "../pages/NotFound/notfound";
import DataTable from "../components/Table/dataTable";
import CreateUser from "../pages/User/CreateUser";

const publicRoute =[
    {path: '/', component: Home},
    {path: '/login', component: LoginPage, layout: null},

    // Question route
    {path: '/account', component: DetailUser},
    // User route
    {path: '/users', component: DataTable},
    {path: '/create-user', component: CreateUser},

    {path: '*', component: NotFound},
]

const privateRoute = [
];

export {publicRoute, privateRoute}