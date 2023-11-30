const express = require('express'); // 미들웨어인 express
const router = express.Router(); // express 기능 중 router 기능
const conn = require('../config/database'); // DB 연결
const { query } = require('../config/poolDatabase');

// 다른 설정과 라우터 설정

//구매자 채팅방 연결
router.post('/userchatroom', async (req, res) => {
    try {
        const { custId } = req.body;
        console.log('Received custId:', custId); // custId를 로그에 출력

        let sql = `SELECT
        TCR.CHAT_ROOM_ID,
        TCR.CREATED_ID,
        TCR.DEAL_ID,
        TCR.CONS_OR_OC,
        TCR.SELLER_ID,
        TS.STORE_NAME,
        TS.START_TIME,
        TS.END_TIME,
        TS.SELLER_PROFILE1
    FROM
        TB_CHAT_ROOM AS TCR
    JOIN
        TB_SELLER AS TS ON TCR.SELLER_ID = TS.SELLER_ID
    WHERE
        TCR.CUST_ID = ?;`;
        
        const userchatroom = await query(sql, [custId])
        console.log('Fetched user chat rooms:', userchatroom);
        
        if (userchatroom.length === 0) {
          return res.status(404).send({ message: '채팅룸을 찾을 수 없음' });
        }
        res.status(200).send(userchatroom);
          
    } catch (error) {
        console.error(`SQL 에러 : ${error}`);
        res.status(500).send({ message: '서버에러'});
    }
})

//판매자 채팅방 연결
router.post('/sellerchatroom', async (req, res) => {
    try {
        const { sellerId } = req.body;
        console.log('Received custId:', sellerId); // custId를 로그에 출력

        let sql = `SELECT
        TCR.CHAT_ROOM_ID,
        TCR.CREATED_ID,
        TCR.DEAL_ID,
        TCR.CONS_OR_OC,
        TCR.CUST_ID,
        TC.NICK_NAME,
        TC.PROFILE_IMG
    FROM
        TB_CHAT_ROOM AS TCR
    JOIN
        TB_CUSTOMER AS TC ON TCR.CUST_ID = TC.CUST_ID
    WHERE
        TCR.SELLER_ID = ?`;
        
        const sellerchatroom = await query(sql, [sellerId])
        console.log('Fetched user chat rooms:', sellerchatroom);
        
        if (sellerchatroom.length === 0) {
          return res.status(404).send({ message: '채팅룸을 찾을 수 없음' });
        }
        res.status(200).send(sellerchatroom);
          
    } catch (error) {
        console.error(`SQL 에러 : ${error}`);
        res.status(500).send({ message: '서버에러'});
    }
})

// 클라이언트에서 메시지를 작성하면 TB_CHAT에 저장되는 엔드포인트
router.post('/saveChat', async (req, res) => {
    try {
      // 클라이언트에서 전송한 데이터 추출
      const { send_Id, chat_Msg, created_At, chat_Room_Id } = req.body;
  
      // SQL 쿼리 작성
      const sql = `INSERT INTO TB_CHAT (send_Id, chat_Msg, created_At, chat_Room_Id)
                   VALUES (?, ?, ?, ?)`;
  
      // SQL 쿼리 실행
      conn.query(sql, [send_Id, chat_Msg, created_At, chat_Room_Id], (err, result) => {
        if (err) {
          console.error('SQL 에러:', err);
          res.status(500).send({ message: '서버 에러' });
        } else {
          console.log('데이터 저장 완료');
          res.status(200).send({ message: '데이터 저장 완료' });
        }
      });
    } catch (error) {
      console.error('에러:', error);
      res.status(500).send({ message: '서버 에러' });
    }
  });

  // 클라이언트에 메시지들을 보내주는 코드
router.get('/getChat', async (req, res) => {
    try {
      // SQL 쿼리 작성 - 모든 채팅 데이터를 가져오는 쿼리
      const sql = 'SELECT * FROM TB_CHAT';
  
      // SQL 쿼리 실행
      conn.query(sql, (err, results) => {
        if (err) {
          console.error('SQL 에러:', err);
          res.status(500).send({ message: '서버 에러' });
        } else {
          // 쿼리 결과를 클라이언트에 반환
          res.status(200).json(results);
        }
      });
    } catch (error) {
      console.error('에러:', error);
      res.status(500).send({ message: '서버 에러' });
    }
  });
  
  
  module.exports = router;