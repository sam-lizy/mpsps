const fs = require('fs')
const path = require('path')
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/public.key'))
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/private.key'))
module.exports = {
    APP_PORT:'8888',
    MYSQL_DATABASE:"blog",
    MYSQL_PASSWORD:"Lzy990413.",
    MYSQL_PORT:"3306",
    MYSQL_ROOT:"root",
    MYSQL_HOST:"localhost",
    PUBLIC_KEY,
    PRIVATE_KEY,
    APP_HOST:"http://localhost"
}
