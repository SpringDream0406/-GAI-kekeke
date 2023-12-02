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


router.post('/cakes', async (req, res) => {
  try {
    const user_ip = req.ip.replace(/^::ffff:/, '');
    console.log(`케이크 둘러보기, ${getNowTime()}`, user_ip);
    console.log(req.body);
    
    let { gu } = req.body;

    let sql = `select 
                    a.prd_id,
                    a.prd_name,
                    b.shop_addr1,
                    c.img_name,
                    c.img_name2,
                    a.tag
                from TB_PRODUCT a
                join TB_SELLER b on a.seller_id = b.seller_id
                join TB_PRODUCT_IMG c on a.prd_id = c.prd_id
                where b.shop_addr1 like ?`;

    let rows = await query(sql, [`%${gu}%`]);

    if (rows.length > 0) {
      console.log('조회 성공');
      res.status(200).send(rows);
    }
    else {
      console.log('조회 데이터 없음');
      res.status(400).send({ message: '잘못된 요청' });
    }
  }
  catch (error) {
    console.error(`SQL 에러: ${error}`);
    res.status(500).send({ message: '서버 에러' });
  }
});



const imgName = 'name';
const imgPath = path.join('public', 'img', 'product');
const storage = imgStorage(imgPath, imgName);
const update2 = multer({ storage: storage, });
// 상품 등록 라우터
router.post('/prdreg', update2.single('image'), async (req, res) => {
  try {
    // 받은 요청 데이터 로깅
    console.log('Received data:', req.body);
    
    if (req.file) {
      console.log('Received file:', req.file);
    }

    const { name, price, seller_id } = req.body;
    let imgFile = req.file
    console.log(imgFile);
  
    let product_img;
    if (req.file) {
      product_img = req.file.filename;
    } else {
      // 적절한 기본값 또는 오류 처리
      product_img = 'default.jpg'; // 예시
    }
    


    // 상품 정보를 TB_PRODUCT 테이블에 저장
    let sqlProduct = `INSERT INTO TB_PRODUCT (PRD_NAME, PRD_AMT, SELLER_ID) VALUES (?, ?, ?)`;
    let resultProduct = await query(sqlProduct, [name, price, seller_id]);
    console.log("123",resultProduct);

    // INSERT 쿼리 실행 후 생성된 상품 ID 가져오기
    const productId = resultProduct.insertId;
    console.log(productId);

    // 이미지 정보가 있을 경우 TB_PRODUCT_IMG 테이블에 저장
    if (product_img) {
      let sqlImage = `INSERT INTO TB_PRODUCT_IMG (PRD_ID, IMG_NAME2) VALUES (?, ?)`;
      let result2 = await query(sqlImage, [productId, product_img]);
      console.log("121313",result2);
    }
    
    
    res.status(200).send("상품 및 이미지 등록 성공");
    
  } catch (error) {
    console.error("상품 및 이미지 등록 실패", error);
    res.status(500).send("상품 및 이미지 등록 오류 발생");
  }
});

module.exports = router;