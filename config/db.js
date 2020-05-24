var mysql = require('mysql2/promise');
require('dotenv').config()
var pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: process.env.DB_CONNECTIONLIMIT,
});

const dbTest = async() => {
    try {
        var d = Date(Date.now())
        const row = await pool.query('select 1');
        console.log("데이터베이스에 정상적으로 연결되었습니다.", d.toString());
        return row;
    } catch (err) {
        console.log("Error : ", err);
        return false;
    }
}

dbTest();

module.exports = pool;