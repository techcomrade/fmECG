require('dotenv').config();

const config = {
    default_app_host: process.env.REACT_APP_HOST || "127.0.0.1",
    default_app_port: process.env.REACT_APP_PORT || "3001",
    redirect_url: process.env.REACT_APP_REDIRECT_API || "http://127.0.0.1:3002",
    default_api_url: process.env.REACT_APP_DEFAULT_API  || "http://127.0.0.1:3000"
}

module.exports = config;