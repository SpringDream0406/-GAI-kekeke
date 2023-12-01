const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const { sellerjoin_check, join_res } = require('../config/join');
const { md5Hash } = require('../config/crypto');
const { getNowTime } = require('../config/getNowTime');
const { imgStorage, seller_fileFilter } = require('../config/imgStorage');
const { query } = require('../config/poolDatabase');
const { route } = require('./store');
const conn = require('../config/database'); // DB 연결




// 샘플 케이크 판매자 정보조회및 등록상품조회

router.post('/samplecake', async (req, res) => {
  try {
    const { prd_id } = req.body;
    console.log(req.body);

    // prd_id가 정의되지 않았는지 확인
    if (prd_id === undefined) {
      return res.status(400).send({ message: 'prd_id가 제공되지 않았습니다.' });
    }

  
      // 첫 번째 쿼리: 특정 제품과 판매자 정보 조회
      let sql = `SELECT p.*, s.*, c.*
                  FROM TB_PRODUCT p
                  JOIN TB_SELLER s ON p.seller_id = s.seller_id
                  LEFT JOIN TB_PRODUCT_IMG c ON p.prd_id = c.prd_id
                  WHERE p.prd_id = ?;`;
  
      const productInfo = await query(sql, [prd_id]);
      
  
      if (productInfo.length === 0) {
        return res.status(404).send({ message: '제품을 찾을 수 없음' });
      }
  
      // 해당 판매자의 ID를 얻음
      const seller_id = productInfo[0].SELLER_ID;
      console.log(seller_id)
  
      // 두 번째 쿼리: 해당 판매자가 등록한 모든 상품 조회
      sql = `SELECT A.*, B.*
            FROM TB_PRODUCT A
            LEFT JOIN TB_PRODUCT_IMG B ON A.prd_id = B.prd_id
            WHERE A.seller_id = ?;`;
            const sellerProducts = await query(sql, [seller_id]);
        
      // 최종 응답
      res.status(200).send({
        productInfo: productInfo[0],
        sellerProducts: sellerProducts
      });
    } catch (error) {
      console.error(`SQL 에러: ${error}`);
      res.status(500).send({ message: '서버 에러' });
    }
  });

  

  router.post('/review', async (req, res) => {
    try {
        const { prd_id } = req.body;
        console.log(req.body);

        // prd_id가 정의되지 않았는지 확인
        if (prd_id === undefined) {
            return res.status(400).send({ message: 'prd_id가 제공되지 않았습니다.' });
        }

        // 첫 번째 쿼리: 특정 제품과 판매자 정보 조회
        let sql = `SELECT p.*, s.*, c.*
                    FROM TB_PRODUCT p
                    JOIN TB_SELLER s ON p.seller_id = s.seller_id
                    LEFT JOIN TB_PRODUCT_IMG c ON p.prd_id = c.prd_id
                    WHERE p.prd_id = ?;`;

        const productInfo = await query(sql, [prd_id]);
       

        if (productInfo.length === 0) {
            return res.status(404).send({ message: '제품을 찾을 수 없음' });
        }

        // 해당 판매자의 ID를 얻음
        const seller_id = productInfo[0].SELLER_ID;
        console.log("셀러다",seller_id);
        console.log("셀러다22",productInfo);
      
       
        // 두 번째 쿼리: 판매자 리뷰 및 해당 리뷰의 거래 ID에 해당하는 상품 주문 정보 조회
        sql =`SELECT r.*, o.*, p.*, i.IMG_NAME, i.IMG_ORIGINAL_NAME, i.IMG_NAME2, c.NICK_NAME
              FROM TB_REVIEW r
              JOIN TB_PRODUCT_ORDER o ON r.DEAL_ID = o.DEAL_ID
              JOIN TB_PRODUCT p ON o.PRD_ID = p.PRD_ID
              LEFT JOIN TB_PRODUCT_IMG i ON p.PRD_ID = i.PRD_ID
              LEFT JOIN TB_CUSTOMER c ON o.CUST_ID = c.CUST_ID
              WHERE r.SELLER_ID = ?;`;


        const sellerReviews = await query(sql, [seller_id]);

        console.log("데이터다",sellerReviews);

        // 최종 응답
        res.status(200).send({
            productInfo: productInfo[0],
            sellerReviews: sellerReviews
        });
    } catch (error) {
        console.error(`SQL 에러: ${error}`);
        res.status(500).send({ message: '서버 에러' });
    }
});



router.post('/mainreview', async (req, res) => {
  try {
    let sql = `SELECT R.REVIEW_MSG, R.CREATED_AT, R.DEAL_ID, PO.CAKE_NAME, CUST.NICK_NAME, TPI.IMG_NAME2
    FROM TB_REVIEW R
    JOIN TB_PRODUCT_ORDER PO ON R.DEAL_ID = PO.DEAL_ID
    JOIN TB_PRODUCT_IMG TPI ON PO.PRD_ID = TPI.PRD_ID
    JOIN TB_CUSTOMER CUST ON R.CUST_ID = CUST.CUST_ID;`;
    const mainreview = await query(sql);
    console.log(mainreview);

    if (mainreview.length === 0) {
      return res.status(404).send({ message: '리뷰 데이터를 찾을 수 없습니다.' });
    }

    res.status(200).send({
      mainreview: mainreview
    });
  } catch (error) {
    console.error(`SQL 에러: ${error}`);
    res.status(500).send({ message: '서버 에러' });
  }
});

  module.exports = router;
