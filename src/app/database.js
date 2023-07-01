const mysql = require('mysql2')
const {MYSQL_DATABASE,MYSQL_PASSWORD,MYSQL_PORT,MYSQL_ROOT,MYSQL_HOST} = require('./config')
const connections =  mysql.createPool({
    host:MYSQL_HOST,
    user:MYSQL_ROOT,
    password:MYSQL_PASSWORD,
    port:MYSQL_PORT,
    database:MYSQL_DATABASE,
    connectionLimit:10
})
// connections.getConnection((err,con)=>{
//     if(err){
//         console.log('database failure',err)
//     }else{
//         console.log('database success')
//     }
// })
module.exports = connections.promise()