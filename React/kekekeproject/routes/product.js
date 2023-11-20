const express = require('express');
const router = express.Router();
// const conn = require('../config/database');
const { getNowTime } = require('../config/getNowTime');
const { query } = require('../config/poolDatabase');

router.post('/cakes', async (req, res) => {
    try {
        let { gu } = req.body;
        console.log(`케이크 둘러보기, ${getNowTime()}`, gu);

        let sql = `select 
                    a.prd_id,
                    a.prd_name,
                    b.shop_addr1,
                    c.img_name,
                    c.img_name2
                from TB_PRODUCT a
                join TB_SELLER b on a.seller_id = b.seller_id
                join TB_PRODUCT_IMG c on a.prd_id = c.prd_id
                where b.shop_addr1 like ?`;

        const rows = await query(sql, [`%${gu}%`]);

        if (rows.length > 0) {
            console.log('조회 성공');
            res.status(200).send(rows);
        } else {
            console.log('조회 데이터 없음');
            res.status(400).send({ message: '잘못된 요청' });
        }
    }
    catch (error) {
        console.error(`SQL 에러: ${error}`);
        res.status(500).send({ message: '서버 에러' });
    }
});


// router.post('/cakes', (req, res) => {
//     let { gu } = req.body;
//     console.log(`케이크 둘러보기, ${getNowTime()}`, gu);

//     let sql = `select 
//                 a.prd_id,
//                 a.prd_name,
//                 b.shop_addr1,
//                 c.img_name2
//                from TB_PRODUCT a
//                join TB_SELLER b on a.seller_id = b.seller_id
//                join TB_PRODUCT_IMG c on a.prd_id = c.prd_id
//                where b.shop_addr1 like ?
//                `
//     conn.query(sql, [`%${gu}%`], (err, rows) => {
//         if (err) {
//             console.error(`sql 에러, ${err}`);
//             res.status(500).send({ message: '서버 에러' });
//         }
//         else {
//             if (rows.length > 0) {
//                 console.log('조회 성공');
//                 res.status(200).send(rows);
//             }
//             else {
//                 console.log('조회 데이터 없음');
//                 res.status(400).send({ message: '잘못된 요청' });
//             }
//         }
//     })
// })

// 특정 prd_id에 해당하는 제품 정보를 가져오는 엔드포인트 설정
router.get('/products/:prd_id', (req, res) => {
    const { prd_id } = req.params;
  
    // prd_id를 사용하여 데이터베이스에서 정보를 검색합니다.
    const sql = 'SELECT * FROM TB_PRODUCT_ORDER WHERE prd_id = ?'; // 데이터베이스 테이블 및 컬럼명을 설정하세요.
  
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