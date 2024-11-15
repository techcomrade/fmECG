import axios from 'axios';
import { getCookie, getLocalStorage } from './storageUtils';
export const axiosMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};
export const axiosRequest = (url, method, data, params) => {
  const axiosConfig = {
    url,
    method,
    headers: {}
  };
  const token = window.hasCookie.access_token;
  if (method !== axiosMethod.GET) {
    axiosConfig.headers['Content-Type'] = `application/json`;
  }
  if (token) {
    axiosConfig.headers['authorization'] = `Bearer ${token}`;
    axiosConfig.headers['X-XSRF-TOKEN'] = token;
  }
  if(data) axiosConfig.data = data;
  if(params) axiosConfig.params = params;

  return axios(axiosConfig);
};
