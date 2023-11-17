const express = require('express');
const router = express.Router();
const conn = require('../config/database');


router.post('/cakes', (req, res) => {
    let { gu } = req.body;
    console.log(`케이크 둘러보기, $`);

    let sql = `select 
                a.prd_id,
                a.prd_name,
                b.shop_addr1,
                c.img_name2
               from TB_PRODUCT a
               join TB_SELLER b on a.seller_id = b.seller_id
               join TB_PRODUCT_IMG c on a.prd_id = c.prd_id
               where b.shop_addr1 like ?
               `
    conn.query(sql, [`%${gu}%`], (err, rows) => {
        if (err) {
            console.error(`sql 에러, ${err}`);
            res.status(500).send({ message: '서버 에러' });
        }
        else {
            if (rows.length > 0) {
                console.log('조회 성공');
                res.status(200).send(rows);
            }
            else {
                console.log('조회 데이터 없음');
                res.status(400).send({ message: '잘못된 요청' });
            }
        }
    })
})

module.exports = router;