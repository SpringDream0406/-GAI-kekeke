const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'project-db-stu3.smhrd.com',
    user: 'Insa4_App_final_4',
    password: 'aischool4',
    port: 3307,
    database: 'Insa4_App_final_4',
    waitForConnections: true, // 사용 가능 커넥션 다 사용중이면 대기 false는 오류반환
    connectionLimit: 10, // 최대 동시 커넥션 수
    queueLimit: 0 // 요청 대기 수
});

async function query(sql, values) {
    const connection = await pool.getConnection();
    try {
        let rows;
        if (values) {
            [rows] = await connection.execute(sql, values);
        } else {
            [rows] = await connection.query(sql);
        }
        return rows;
    } finally {
        connection.release();
    }
}
module.exports = { pool, query };
