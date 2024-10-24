import { axiosRequest, axiosMethod } from "../utils/axios";
import { showNotiError } from "../components/Notification";
import { getLocalStorage } from "../utils/storageUtils";

export const httpGetBinData = (url, data) => {
    const API_BIN = getLocalStorage("api");
    return new Promise((resolve, reject) => {
        axiosRequest(`${API_BIN}${url}`, axiosMethod.GET)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            console.log('error get data', error)
            showNotiError(error.message);
        })
    })
}

