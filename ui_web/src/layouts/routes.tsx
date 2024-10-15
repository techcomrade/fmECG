import * as React from "react";
import { Navigate, Route, Routes as ReactRouterRoutes } from "react-router-dom";
import { Home } from "../pages/home";
import { UserTable } from "../pages/user";
import { routeMapping } from "./routes.type";
interface IProps {}

export const Routes = (props: IProps) => {
  const isConsentBackUrl = () => {
    // const params = ["code=", "id_token=", "error="];
    // const checkSearch =
    //   location.search.startsWith("?") && params.some((i) => location.search.includes(i));
    // const checkHash =
    //   location.hash.startsWith("#") && params.some((i) => location.hash.includes(i));
    // return checkHash || checkSearch;
    return false;
  };

  return (
    <ReactRouterRoutes>
      <Route path={routeMapping.ErrorPage.url} />
      <Route path={routeMapping.Home.url} element={<Home />} />
      <Route path={routeMapping.User.url} element={<UserTable />} />
      {!isConsentBackUrl() && (
        <Route
          path="*"
          element={<Navigate to={routeMapping.Home.url ?? ""} />}
        />
      )}
    </ReactRouterRoutes>
  );
};
