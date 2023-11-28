const express = require('express');
const router = express.Router();
// conn 모듈 및 getNowTime 함수를 import하세요.
const { getNowTime } = require('../config/getNowTime');
const { query } = require('../config/poolDatabase');
const conn = require('../config/database'); // DB 연결
const path = require('path');
const multer = require('multer');
// 케이크 둘러보기 엔드포인트
router.post('/tour-order', async (req, res) => {
    try {
      const { prd_id } = req.body;
  
      let sql = `SELECT p.*, s.*, i.IMG_NAME2
                  FROM TB_PRODUCT p
                  JOIN TB_SELLER s ON p.seller_id = s.seller_id
                  LEFT JOIN TB_PRODUCT_IMG i ON p.prd_id = i.prd_id
                  WHERE p.prd_id = ?;`
              
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


// cust_id 를 가지고 커스텀상품테이블 조회해서 정볼르 검색합니다 // tourcompleteorder에 쓰일 api콜임
router.post('/custom', (req, res) => {
  const { cust_id } = req.body;

  //cust_id를 사용하여 데이터베이스에서 정보를 검색합니다.
  const sql = 'SELECT * FROM TB_CUSTOM_PRODUCT WHERE cust_id = ? ORDER BY CREATED_AT DESC;'; // 데이터베이스 테이블 및 컬럼명을 설정하세요.

  conn.query(sql, [cust_id ], (err, rows) => {
    if (err) {
      console.error(`SQL 에러: ${err}`);
      return res.status(500).json({ error: '서버 에러' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: '제품을 찾을 수 없음' });
    }

    // 제품 정보를 클라이언트에게 응답합니다.
    const custData = rows[0]; // 예시로 첫 번째 행을 가져옴

    res.json(custData);
  });
});



// cust_id 를 가지고 커스텀상품테이블 조회해서 정보를 검색합니다 // 이건 mpordelist에 사용되는 커스텀 api콜임
router.post('/customorderlist', (req, res) => {
  const { cust_id } = req.body;

  //cust_id를 사용하여 데이터베이스에서 정보를 검색합니다.
  const sql = `SELECT 
                TCP.*, 
                TCCR.CONS_OR_OC
                FROM 
                  TB_CUSTOM_PRODUCT AS TCP
                LEFT JOIN 
                  TB_CUSTOM_CHAT_ROOM AS TCCR ON TCP.CUSTOM_ID = TCCR.CUSTOM_ID
                WHERE 
                  TCP.cust_id = ?
                ORDER BY 
                  TCP.CREATED_AT DESC;`; // 데이터베이스 테이블 및 컬럼명을 설정하세요.

  conn.query(sql, [cust_id ], (err, rows) => {
    if (err) {
      console.error(`SQL 에러: ${err}`);
      return res.status(500).json({ error: '서버 에러' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: '제품을 찾을 수 없음' });
    }

    // 제품 정보를 클라이언트에게 응답합니다.
    const custData = rows; // 예시로 첫 번째 행을 가져옴

    res.json(custData);
  });
});




// 리뷰이미지 저장
// 널 값 체크 함수 정의
function nullify(value) {
  return value === undefined || value === null ? null : value;
}
// 이미지 파일 저장을 위한 multer 설정
const imgName = 'REVIEW_IMG';
const imgPath = path.join('public', 'img', 'reviewimg');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, imgName + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// multer 인스턴스 생성
const upload = multer({ storage: storage }).single('image');





// cust_id 를 가지고 커스텀상품테이블 조회해서 정보를 검색합니다 // 이건 mpordelist에 사용되는 커스텀 api콜임
router.get('/get-user-review', (req, res) => {
  const { deal_id } = req.query; // GET 요청의 경우 req.query 사용

  const sql = `SELECT * FROM TB_REVIEW WHERE DEAL_ID = ?;`;

  conn.query(sql, [deal_id], (err, rows) => {
    if (err) {
      console.error(`SQL 에러: ${err}`);
      return res.status(500).json({ error: '서버 에러' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: '리뷰를 찾을 수 없음' });
    }

    const reviewData = rows[0]; // 첫 번째 행 데이터 반환

    res.json(reviewData);
  });
});






// 리뷰 데이터를 데이터베이스에 저장하는 API 엔드포인트
router.post('/reviewcust', upload, async (req, res) => {
  console.log("Received data:", req.body);
  try {
    // 폼 데이터에서 정보 추출 및 널 체크 적용
    
    const custId = req.body.cust_id; // 업데이트할 고객 ID
    const review_msg = nullify(req.body.review_msg);
    const DEAL_ID = nullify(req.body.DEAL_ID);
    const CUSTOM_ID = nullify(req.body.CUSTOM_ID);
    const reviewImage = req.file ? nullify(req.file.path) : null; // 이미지 파일 경로
    
    // 리뷰 메시지가 비어 있는지 확인
    if (!review_msg) {
      return res.status(400).send('리뷰 메시지는 비어 있을 수 없습니다.');
    }
    // SQL 쿼리문 작성
    const sql = `INSERT INTO TB_REVIEW ( CUST_ID,review_msg , DEAL_ID, REVIEW_IMG, CUSTOM_ID) VALUES (?, ?, ?, ?, ?)`;
    await query(sql, [ custId ,review_msg , DEAL_ID, reviewImage, CUSTOM_ID]);

    // 응답 전송
    res.status(200).send('리뷰가 저장되었습니다.');
  } catch (error) {
    // 에러 처리
    console.error(`리뷰 저장 중 오류 발생: ${error}`);
    res.status(500).send('서버 오류 발생');
  }
});


router.get('/check-review-existence', async (req, res) => {
  try {
    const { deal_id, custom_id } = req.query;

    // 매개변수 검사 및 null 처리
    const dealIdParam = deal_id || null;
    const customIdParam = custom_id || null;

    // 해당 ID로 리뷰 조회
    const checkSql = `SELECT * FROM TB_REVIEW WHERE deal_id = ? OR custom_id = ?`;
    const result = await query(checkSql, [dealIdParam, customIdParam]);

    if (result.length > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('리뷰 존재 여부 확인 중 오류 발생:', error);
    res.status(500).json({ error: '서버 오류 발생' });
  }
});



// 리뷰 업데이트를 위한 라우트
router.put('/updateReview', multer().single('image'), async (req, res) => {
  try {
    const { reviewMsg, custId, dealId, customId } = req.body;
    const image = req.file;
    const imagePath = image ? image.path : null;

    let updateSql, queryParams;

    if (dealId) {
      // dealId로 리뷰 업데이트
      updateSql = `UPDATE TB_REVIEW SET cust_id = ?, review_msg = ?, image = ? WHERE deal_id = ?`;
      queryParams = [custId, reviewMsg, imagePath, dealId];
    } else if (customId) {
      // customId로 리뷰 업데이트
      updateSql = `UPDATE TB_REVIEW SET cust_id = ?, review_msg = ?, image = ? WHERE custom_id = ?`;
      queryParams = [custId, reviewMsg, imagePath, customId];
    } else {
      // dealId 또는 customId가 없는 경우 오류 반환
      return res.status(400).json({ error: 'deal_id 또는 custom_id가 필요합니다.' });
    }

    await query(updateSql, queryParams);
    res.status(200).json({ message: '리뷰가 성공적으로 업데이트되었습니다.' });
  } catch (error) {
    console.error('리뷰 업데이트 중 오류 발생:', error);
    res.status(500).json({ error: '리뷰 업데이트 중 오류가 발생했습니다.' });
  }
});



// cust_id 를 가지고 커스텀상품테이블 조회해서 정보를 검색합니다 // 이건 mpordelist에 사용되는 커스텀 api콜임
router.get('/get-custom-review', (req, res) => {
  const { custom_id } = req.query; // GET 요청의 경우 req.query 사용

  const sql = `SELECT * FROM TB_REVIEW WHERE CUSTOM_ID = ?;`;

  conn.query(sql, [custom_id], (err, rows) => {
    if (err) {
      console.error(`SQL 에러: ${err}`);
      return res.status(500).json({ error: '서버 에러' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: '리뷰를 찾을 수 없음' });
    }

    const reviewData = rows[0]; // 첫 번째 행 데이터 반환

    res.json(reviewData);
  });
});



module.exports = router;
