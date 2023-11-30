const express = require('express');
const router = express.Router();
// conn 모듈 및 getNowTime 함수를 import하세요.
const { getNowTime } = require('../config/getNowTime');
const { query } = require('../config/poolDatabase');
const path = require('path'); // 경로 작성 방법 변경
const multer = require('multer'); // 이미지 처리
const { imgStorage, custom_fileFilter } = require('../config/imgStorage');
const conn = require('../config/database');



// 상품주문페이지 주문 데이터받기(tourOrder페이지)
router.post('/orders', async (req, res) => {
    console.log(req.body)
    
    try {
        // 클라이언트에서 보낸 주문 데이터 추출
        const {
            cake_name, //
            add_require, //
            cake_size,//
            cake_flavor,//
            cake_price,//
            seller_id,
            prd_id,//
            cust_id,  //
            lettering,//
            order_name,//
            order_num,//
            pickup_date,//
            pickup_time,//
        } = req.body;

        console.log(req.body);

           // 클라이언트에서 ISO 8601 형식 ('YYYY-MM-DDTHH:mm:ss.sssZ')으로 받은 pickup_date와 pickup_time
            const pickupDateTime = new Date(pickup_date);
            const pickupTimeTime = new Date(pickup_time);

            // ISO 8601 형식을 'YYYY-MM-DD' 형식으로 변환 (날짜만)
            const formattedPickupDate = pickupDateTime.toISOString().split('T')[0];

            // ISO 8601 형식을 'HH:mm' 형식으로 변환 (시간만)
            const formattedPickupTime = pickupTimeTime.toISOString().split('T')[1].slice(0, 5);
            
        // 주문 데이터를 데이터베이스에 삽입하는 로직
        const insertQuery = `INSERT INTO TB_PRODUCT_ORDER (CAKE_NAME, ADD_REQUIRE, CAKE_SIZE, CAKE_FLAVOR, CAKE_PRICE, SELLER_ID, PRD_ID, CUST_ID, LETTERING, ORDER_USER, ORDER_NUM, PICKUP_DATE, PICKUP_TIME) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        await query(insertQuery, [cake_name, add_require, cake_size, cake_flavor, cake_price, seller_id, prd_id, cust_id, lettering, order_name, order_num, formattedPickupDate, formattedPickupTime]);

        res.status(200).send({ message: '주문이 성공적으로 처리되었습니다.' });
    } catch (error) {
        console.error(`주문 처리 중 오류 발생: ${error}`);
        res.status(500).send({ error: '서버 오류 발생' });
    }
});






// multer 설정
const imgName = 'CUSTOM_ID';
const imgPath = path.join('public', 'img', 'custproduct');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imgPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, imgName + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }).fields([
    { name: 'cakeImage', maxCount: 1 },
    { name: 'previewImage', maxCount: 1 }
  ]);
  
  router.post('/custorders', upload, async (req, res) => {
    try {
      // 이미지 파일 경로 처리
      const cakeImagePath = req.files.cakeImage ? req.files.cakeImage[0].path : null;
      const previewImagePath = req.files.previewImage ? req.files.previewImage[0].path : null;
  
  
      // 폼 데이터 처리
      const {
          clientNum, 
          cakeSize, 
          clientName, 
          cakeFlavor, 
          cakeDetail, 
          addDetail, 
          pickupDate, 
          pickupDateTime, 
          custId,
          custAddr
      } = req.body;

        // ISO 8601 형식을 'YYYY-MM-DD' 및 'HH:mm' 형식으로 변환
        const pickupDateTime2 = new Date(pickupDate);
        const formattedPickupDate = pickupDateTime2.toISOString().split('T')[0];
        const pickupTimeTime2 = new Date(pickupDateTime);
        const formattedPickupTime = pickupTimeTime2.toISOString().split('T')[1].slice(0, 5);

        // 주문 데이터를 데이터베이스에 삽입하는 로직
        const insertQuery = `INSERT INTO TB_CUSTOM_PRODUCT (CLIENT_NUM,CAKE_SIZE,CLIENT_NAME,CAKE_FLAVOR,CKAE_DETAIL,ADD_DETAIL,PICKUP_DATE,PICKUP_TIME,CUST_ID,CUST_ADDR, CUSTOM_IMG,CUST_DRAW) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
        let rows = await query(insertQuery, [clientNum, cakeSize, clientName, cakeFlavor, cakeDetail, addDetail, formattedPickupDate, formattedPickupTime, custId, custAddr, cakeImagePath,previewImagePath]);
        if (rows.affectedRows > 0){
        res.status(200).send({ message: '주문이 성공적으로 처리되었습니다.', cakeImagePath, previewImagePath })};
        } catch (error) {
        console.error(`주문 처리 중 오류 발생: ${error}`);
        res.status(500).send({ error: '서버 오류 발생' });
        }
    });

    //판매자 페이지에서 옵션 저장
    router.post('/saveoption', async (req, res) => {
        try {
          const { flavors, sizes, letteringGuide, sellerId } = req.body;
      
          await query('START TRANSACTION');
      
          // 셀러 ID에 해당하는 기존 옵션 삭제
          await query('DELETE FROM TB_FLAVOR_OPT WHERE SELLER_ID = ?', [sellerId]);
          await query('DELETE FROM TB_SIZE_OPT WHERE SELLER_ID = ?', [sellerId]);
          await query('DELETE FROM TB_LET WHERE SELLER_ID = ?', [sellerId]);
      
          // 새 옵션 데이터 추가
          for (const flavorData of flavors) {
            let sql1 = 'INSERT INTO TB_FLAVOR_OPT (FLAVOR_NAME, ADD_MONEY, SELLER_ID) VALUES (?, ?, ?)';
            await query(sql1, [flavorData.flavor, flavorData.cost, sellerId]);
          }
          
          for (const sizeData of sizes) {
            let sql2 = 'INSERT INTO TB_SIZE_OPT (SIZE, ADD_MONEY, SELLER_ID) VALUES (?, ?, ?)';
            await query(sql2, [sizeData.size, sizeData.cost, sellerId]);
          }
      
          let sql3 = 'INSERT INTO TB_LET (LET_TEXT, SELLER_ID) VALUES (?, ?)';
          await query(sql3, [letteringGuide, sellerId]);
      
          await query('COMMIT');
          res.status(200).send({ message: '옵션 저장 성공' });
        } catch (error) {
          await query('ROLLBACK');
          console.error(`SQL 에러 : ${error}`);
          res.status(500).send({ message: '서버 오류 발생' });
        }
      });

      //둘러보기페이지 사용자가입력한 옵션 보여주기
      router.post('/loadoption', async (req, res) => {
        try {
          const { seller_id } = req.body;
      
          // 케이크 맛 옵션을 가져오는 쿼리
          const flavorQuery = 'SELECT * FROM TB_FLAVOR_OPT WHERE SELLER_ID = ?';
          const flavors = await query(flavorQuery, [seller_id]);
      
          // 케이크 크기 옵션을 가져오는 쿼리
          const sizeQuery = 'SELECT * FROM TB_SIZE_OPT WHERE SELLER_ID = ?';
          const sizes = await query(sizeQuery, [seller_id]);
      
          // 클라이언트에 반환할 데이터
          const options = {
            flavors,
            sizes
          };
      
          res.status(200).json(options);
        } catch (error) {
          console.error(`데이터 로드 중 에러 발생: ${error}`);
          res.status(500).send({ error: '서버 오류 발생' });
        }
      });


      // 제안대기 

      router.post('/prdcustom', async (req,res)=>{
        try{

          conn.query(`SELECT * FROM TB_CUSTOM_PRODUCT 
                      WHERE CUSTOM_ID NOT IN (SELECT CUSTOM_ID FROM TB_SELLER_APPLY);`, (error, results, fields) => {
            if (error) {
              throw error;
            }
      
            res.json(results); // 결과를 JSON 형식으로 클라이언트에게 전송
          });
        } catch (err) {
          console.error('Database query error:', err);
          res.status(500).send('Server error');
        }
      });
      // 제안완료
      router.post('/sellerapply', async (req,res)=>{
        try{

          conn.query(`SELECT a.* FROM TB_CUSTOM_PRODUCT a
                    ,TB_SELLER_APPLY b
                    WHERE a.CUSTOM_ID = b.CUSTOM_ID;`, (error, results, fields) => {
            if (error) {
              throw error;
            }
      
            res.json(results); // 결과를 JSON 형식으로 클라이언트에게 전송
            console.log();
          });
        } catch (err) {
          console.error('Database query error:', err);
          res.status(500).send('Server error');
        }
      });




  router.post('/adproduct', async(req,res)=>{
    try{
      const { seller_id } = req.body;
      conn.query(`SELECT a.*, b.IMG_NAME2, 
                  COALESCE(po.prd_order_count, 0) AS total_product_orders
                  FROM TB_PRODUCT a
                  JOIN TB_PRODUCT_IMG b ON a.prd_id = b.prd_id
                  LEFT JOIN (
                  SELECT PRD_ID, COUNT(PRD_ID) AS prd_order_count
                  FROM TB_PRODUCT_ORDER
                  GROUP BY PRD_ID
                  ) po ON a.prd_id = po.PRD_ID
                  WHERE a.SELLER_ID = ?;`, [seller_id], (error, results) => {
                if (error) {
          console.log('데이터 오류', error);
          res.status(500).json({ error: '데이터 오류' });
          return;
        }
  
        // 쿼리 결과(results)를 클라이언트에게 응답합니다.
        res.json(results);
      });
    } catch (error) {
      console.log('데이터 오류', error);
      res.status(500).json({ error: '데이터 오류' });
    }
  });

module.exports = router;



