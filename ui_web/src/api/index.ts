import * as ApiClientFactory from "./api-generated";

export * from "./api-generated";

const api_url: string = "http://localhost:3000";

// define authorize common function, we also can config interceptors here
const authorizedFetchFunction = (
  url: RequestInfo,
  init: RequestInit
): Promise<Response> => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  init = init || {};
  init.headers = Object.assign({}, init.headers, headers);
  return fetch(url, init);
};

const userClient = new ApiClientFactory.UserControllerClient(api_url, {
  fetch: authorizedFetchFunction,
});

const deviceClient = new ApiClientFactory.DeviceControllerClient(api_url, {
  fetch: authorizedFetchFunction,
});

const deviceDetailClient = new ApiClientFactory.DeviceDetailControllerClient(
  api_url,
  {
    fetch: authorizedFetchFunction,
  }
);

const recordClient = new ApiClientFactory.RecordControllerClient(api_url, {
  fetch: authorizedFetchFunction,
});

interface IService {
  userService: ApiClientFactory.UserControllerClient;
  deviceService: ApiClientFactory.DeviceControllerClient;
  deviceDetailService: ApiClientFactory.DeviceDetailControllerClient;
  recordService: ApiClientFactory.RecordControllerClient;
}

export const Service: IService = {
  userService: userClient,
  deviceService: deviceClient,
  deviceDetailService: deviceDetailClient,
  recordService: recordClient,
};
