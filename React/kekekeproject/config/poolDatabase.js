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
        const [rows] = await connection.execute(sql, values);
        return rows;
    } finally {
        connection.release(); // 사용이 끝난 커넥션을 다시 풀에 반환
    }
}
module.exports = { pool, query };
