export const APP_HOST = process.env.APP_HOST || '127.0.0.1'
export const APP_PORT = process.env.APP_PORT || 3000;
export const API_URL = `http://${APP_HOST}:${APP_PORT}/api`;
export const JWT_TOKEN = 'token';