// DataBase 연결
const mysql = require('mysql2') // mysql

const conn = mysql.createConnection({
    'host' : 'project-db-stu3.smhrd.com',
    'user' : 'Insa4_App_final_4',
    'password' : 'aischool4',
    'port' : 3307,
    'database' : 'Insa4_App_final_4'
})

conn.connect()

module.exports = conn;