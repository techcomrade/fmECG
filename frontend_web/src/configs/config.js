import { getLocalStorage } from "../utils/storageUtils";

export const APP_HOST = process.env.APP_HOST || 'localhost'
export const APP_PORT = process.env.APP_PORT || 3000;
export const API_URL = getLocalStorage("api");
export const JWT_TOKEN = 'token';