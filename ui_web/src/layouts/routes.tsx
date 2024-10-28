import * as React from "react";
import { Navigate, Route, Routes as ReactRouterRoutes } from "react-router-dom";
import { Home } from "../pages/home";
import { User } from "../pages/user";
import { Device } from "../pages/device";
import { routeMapping } from "./routes.type";
import { Record } from "../pages/record";
import { Schedule } from "../pages/schedule";
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
      <Route path={routeMapping.User.url} element={<User />} />
      <Route path={routeMapping.Device.url} element={<Device />} />
      <Route path={routeMapping.Record.url} element={<Record />} />
      <Route path={routeMapping.Schedule.url} element={<Schedule />} />
      {!isConsentBackUrl() && (
        <Route
          path="*"
          element={<Navigate to={routeMapping.Home.url ?? ""} />}
        />
      )}
    </ReactRouterRoutes>
  );
};
