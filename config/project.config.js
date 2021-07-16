import path from 'path'
const debug = require('debug')('app:config:project') //debug for application
const ip = require('ip')

require('dotenv').config() //get configuration from file env


// configurasi all access from env file
const config = {
   env: process.env.NODE_ENV || 'development',
   version: process.env.VERSION,
   res_log_level: process.env.RESPONSE_LOG_LEVEL,

   // ----------------------------------
   // Project Structure
   // ----------------------------------
   path_base: path.resolve(__dirname, '..'),
   dir_client: 'src',
   dir_dist: 'dist',
   dir_public: 'src/static',
   dir_server: 'server',
   dir_test: 'tests',

   // server configuration
   server_host: ip.address(),
   server_port: process.env.LOCAL_PORT || 5555,
   api_host: process.API_HOST || 'localhost',
   api_port: process.NODE_PORT || process.env.API_PORT || 3002,
   api_version: process.env.API_VERSION,
   api_prefix: process.env.API_PREFIX,

   // database configuration 
   db_host: process.env.DB_HOST || '127.0.0.1',
   db_port: process.env.DB_PORT || process.env.SEQ_MYSQL_PORT || 3306,
   db_user: process.env.DB_USER || process.env.SEQ_MYSQL_PORT || 'root',
   db_pwd: process.env.DB_PASS || null,
   db_name: process.env.DB_NAME || 'sequelize_test',
   db_dialect: process.env.DB_DIALECT,
   db_logging: process.env.DB_LOGGING,

   image_url: process.env.IMAGE_HOST ? `${process.env.IMAGE_PROTOCOL}://${process.env.IMAGE_HOST}:${process.env.IMAGE_PORT}${process.env.IMAGE_VERSION}/` : 'https://storage.googleapis.com:443/wievent/',

   auth_by: process.env.AUTH_BY,
   auth_secret: process.env.AUTH_SECRET,
   auth_expire: process.env.AUTH_EXPIRE,
   auth_cookie_secret: process.env.AUTH_COOKIE_SECRET,
   auth_cookie_name: process.env.AUTH_COOKIE_NAME,

   docs_host: process.env.DOCS_HOST || 'localhost:5000',
   docs_path: process.env.DOCS_PATH || '/',

}

debug(`Build default configuration [${config.env}]`) // create debug for info app
debug(`Database host = ${config.db_host} && ${config.api_host}`) // create debug for info database setting
if (config && config.env === 'development') {
   debug(`Documentation = http://${config.docs_host}/api-docs`)
}
debug(`Logging = ${config.db_logging}`)

module.exports = config