const express = require('express');
const router = express.Router();
// conn 모듈 및 getNowTime 함수를 import하세요.
const { getNowTime } = require('../config/getNowTime');
const { query } = require('../config/poolDatabase');

// 케이크 둘러보기 엔드포인트
router.post('/tour-order', async (req, res) => {
    try {
      const { prd_id } = req.body;
  
      let sql = `SELECT p.*, s.*
                 FROM TB_PRODUCT p
                 JOIN TB_SELLER s ON p.seller_id = s.seller_id
                 WHERE p.prd_id = ?;`;
  
      const rows = await query(sql, [prd_id]);
  
      if (rows.length > 0) {
        res.status(200).send(rows);
      } else {
        res.status(404).send({ message: '제품을 찾을 수 없음' });
      }
    } catch (error) {
      console.error(`SQL 에러: ${error}`);
      res.status(500).send({ message: '서버 에러' });
    }
  });


// 특정 prd_id에 해당하는 제품 정보 가져오기 엔드포인트
router.get('/store/:prd_id', (req, res) => {
    const { prd_id } = req.params;
  
    // prd_id를 사용하여 데이터베이스에서 정보를 검색합니다.
    const sql = 'SELECT * FROM TB_PRODUCT WHERE prd_id = ?;'; // 데이터베이스 테이블 및 컬럼명을 설정하세요.
  
    conn.query(sql, [prd_id], (err, rows) => {
      if (err) {
        console.error(`SQL 에러: ${err}`);
        return res.status(500).json({ error: '서버 에러' });
      }
  
      if (rows.length === 0) {
        return res.status(404).json({ error: '제품을 찾을 수 없음' });
      }
  
      // 제품 정보를 클라이언트에게 응답합니다.
      const productData = rows[0]; // 예시로 첫 번째 행을 가져옴
  
      res.json(productData);
    });
});

module.exports = router;
