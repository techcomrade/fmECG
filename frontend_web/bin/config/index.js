require('dotenv').config({ path: ['.env.prod', '.env.dev'] })

const config = {
    default_app_host: process.env.HOST,
    default_app_port: process.env.PORT,
    redirect_url: process.env.REDIRECT_API,
    default_api_url: process.env.DEFAULT_API  
}
console.log(config);

module.exports = config;