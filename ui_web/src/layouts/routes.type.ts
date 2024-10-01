
export interface IRouteItem {
    key: string;
    i18nKey?: string;
    url: string;
    iconName?: string;
    parentKeys?: string[],
    specificBeadTextKey?: string
}
export const getPage = () => {
    return "Page";
} 

export const routeMapping: { [key: string]: IRouteItem} = {
    Home: {
        key: "home",
        url: "/home"
    },
    User: {
        key: "user",
        url: "/user"
    },
    ErrorPage: {
      key: "error",
      url: "/error"
    },
    LoginFailed: {
      key: "login-failed",
      url: "/login-failed"
    },
    Login: {
      key: "login",
      url: "/login"
    }
}

export const getRouteItemByKey = (routeKey: string) => {
    let currentRouteItem = routeMapping.Home;
    for (const key in routeMapping) {
      const item = routeMapping[key];
      if (item.key === routeKey) {
        currentRouteItem = item;
      }
    }
    return currentRouteItem;
  };


  
export const getRouteItemByUrl = (url: string) => {
    let currentRouteItem = routeMapping.Home;
    for (const key in routeMapping) {
      const item = routeMapping[key];
      if (item.url === url) {
        currentRouteItem = item;
      }
    }
    return currentRouteItem;
  };
  