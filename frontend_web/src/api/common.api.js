import { API_URL, JWT_TOKEN } from "../configs/config";
import { setLocalStorage, clearLocalStorage, getLocalStorage} from "../utils/storageUtils";
import { axiosRequest, axiosMethod } from "../utils/axios";
import { showNotiWarning } from "../components/Notification";
// import { checkErrorReturn } from "../../utils/commonUtils";
// import { SpinLoading } from "../../components/Spin/SpinLoading";

// export const showLoading = () => {
//     <SpinLoading />
// }

export const httpPostData = (url, data) => {
    const token = getLocalStorage(JWT_TOKEN);
    return new Promise((resolve, reject) => {
        axiosRequest(API_URL + url, axiosMethod.POST, token, data)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            console.log('error post data', error);
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
        })
    })
}

export const httpUpdateData = (url, data) => {
    const token = getLocalStorage(JWT_TOKEN);
    return new Promise((resolve, reject) => {
        axiosRequest(API_URL + url, axiosMethod.PATCH, token, data)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            console.log('error get data', error)
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
            console.log('error get data', error)
            // checkErrorReturn(error);
            reject(error)
        })
    })
}

