import { API_URL, JWT_TOKEN } from "../configs/config";
import { setLocalStorage, clearLocalStorage, getLocalStorage} from "../utils/storageUtils";
import { axiosRequest, axiosMethod } from "../utils/axios";
import { showNotiError, showNotiWarning } from "../components/Notification";

export const httpPostData = (url, data) => {
    const token = getLocalStorage(JWT_TOKEN);
    return new Promise((resolve, reject) => {
        axiosRequest(API_URL + url, axiosMethod.POST, token, data)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            console.log('error post data', error);
            showNotiError(error?.response?.data?.message)
            // checkErrorReturn(error);
            reject(error)
        })
    })
}

export const httpGetData = (url, data) => {
    const token = getLocalStorage(JWT_TOKEN);
    return new Promise((resolve, reject) => {
        axiosRequest(API_URL + url, axiosMethod.GET, token, data)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            console.log('error get data', error)
            if(error.response.status === 401 || error.response.status === 403){
                showNotiWarning('Bạn đã hết phiên đăng nhập');
                window.location.href = '/login';
                reject(error)
            }
            else {
                showNotiError(error.message);
            }
        })
    })
}

export const httpUpdateData = (url, data) => {
    const token = getLocalStorage(JWT_TOKEN);
    return new Promise((resolve, reject) => {
        axiosRequest(API_URL + url, axiosMethod.PUT, token, data)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            console.log('error get data', error)
            showNotiError(error.response.data)
            // checkErrorReturn(error);
            reject(error)
        })
    })
}

export const httpDeleteData = (url, data) => {
    const token = getLocalStorage(JWT_TOKEN);
    return new Promise((resolve, reject) => {
        axiosRequest(API_URL + url, axiosMethod.DELETE, token, data)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            console.log('error delete data', error)
            showNotiError(error.response.data)
            // checkErrorReturn(error);
            reject(error)
        })
    })
}

export const httpGetDataTable = async (table, filter = null) => {
    return new Promise((resolve, reject) => {
        let dataUpload = null;
        if(!!filter) {
            filter['table'] = table;
            dataUpload = filter;
        }
        else {
            dataUpload = {table: table};
        }
        return httpPostData(API_URL + 'customers/report',dataUpload)
        .then((result) => {
            let data = result.data;
            if(data.result[0].id !== undefined)
            for (let i = 0; i < data.result.length; i++) data.result[i].idf = i;
            else 
            for (let i = 0; i < data.result.length; i++) data.result[i].id = i;
            // check filter is right?
            // ManagerData.checkTableInfoUpdate(tableName,data.result);
            resolve(data.result);
          })
          .catch((error) => {
            console.log('error get data', error)
            showNotiError(error.response.data)
            // checkErrorReturn(error);
            reject(error)
        });
        });
}

