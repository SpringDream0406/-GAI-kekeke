const express = require('express'); // 미들웨어인 express
const router = express.Router(); // express 기능 중 router 기능
const conn = require('../config/database'); // DB 연결
const { query } = require('../config/poolDatabase');

// 다른 설정과 라우터 설정

//커스터머 주문내역 리스트
router.post('/chatroom', async (req, res) => {
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
        TCR.CUST_ID = ?`;
        
        const userchatroom = await query(sql, [custId])
        console.log('Fetched user chat rooms:', userchatroom);
        
        if (userchatroom.length === 0) {
          return res.status(404).send({ message: '채팅룸을 찾을 수 없음' });
        }
        res.status(200).send({
          userchatroom: userchatroom
        });
          
    } catch (error) {
        console.error(`SQL 에러 : ${error}`);
        res.status(500).send({ message: '서버에러'});
    }
})


module.exports = router;