import axios from 'axios';
import { getCookie } from './storageUtils';
export const axiosMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};
const token = document.cookies;
export const axiosRequest = (url, method, data) => {
  const axiosConfig = {
    url,
    method,
    headers: {}
  };
  const token = getCookie("access-token");
  if (method !== axiosMethod.GET) {
    axiosConfig.headers['Content-Type'] = `application/json`;
  }
  if (token) {
    axiosConfig.headers['authorization'] = `Bearer ${token}`;
    axiosConfig.headers['X-XSRF-TOKEN'] = token;
  }
  axiosConfig.data = data;
  return axios(axiosConfig);
};
