const express = require('express');
const router = express.Router();
// conn 모듈 및 getNowTime 함수를 import하세요.
const { getNowTime } = require('../config/getNowTime');
const { query } = require('../config/poolDatabase');
const path = require('path'); // 경로 작성 방법 변경
const multer = require('multer'); // 이미지 처리
const { imgStorage, custom_fileFilter } = require('../config/imgStorage');



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
        await query(insertQuery, [clientNum, cakeSize, clientName, cakeFlavor, cakeDetail, addDetail, formattedPickupDate, formattedPickupTime, custId, custAddr, cakeImagePath,previewImagePath]);

        res.status(200).send({ message: '주문이 성공적으로 처리되었습니다.', cakeImagePath, previewImagePath });
        } catch (error) {
        console.error(`주문 처리 중 오류 발생: ${error}`);
        res.status(500).send({ error: '서버 오류 발생' });
        }
    });



module.exports = router;



