// 유저 관련 처리 라우터
const express = require('express') // 미들웨어인 express
const router = express.Router() // express 기능 중 router 기능
const conn = require('../config/database') // DB 연결
const bcryot = require('bcrypt') // 비밀번호 암호화


router.post('/login', (req, res) => {
    console.log('로그인 시도', req.body);
    let { user_id, user_pw, user_type } = req.body
    if (user_type === 0) {
        let sql = `select cust_id, password, join_dy, phone, nick_name, profill_img from CUSTOMER where cust_id = ?`
        conn.query(sql, [user_id], (err, rows) => {
            if (err) {
                console.error('로그인 시도 에러', err);
                res.status(500).send({ message: '로그인 시도 에러' })
            }
            else {
                if (rows.length > 0) {
                    console.log(rows);
                    if (rows[0].password === user_pw) {
                        console.log('로그인 성공', user_id);
                        res.status(200).send({
                            message: '로그인 성공',
                            cust_id: rows[0].cust_id,
                            password: rows[0].password,
                            join_dy: rows[0].join_dy,
                            phone: rows[0].phone,
                            nick_name: rows[0].nick_name,
                            profill_img: rows[0].profill_img
                        }
                        )
                    }
                    else {
                        console.log('로그인 실패 - 비밀번호 다름');
                        res.status(200).send({ message: '로그인 실패' })
                    }
                }
                else {
                    console.log('로그인 실패 - 데이터 없음');
                    res.status(200).send({ message: '로그인 데이터 없음' })
                }
            }
        })
    }
    else if (user_type === 1) {
        
    }

})


router.post('/join', (req, res) => {
    console.log('비번길이', user_pw.length);
    if (user_pw.length < 9 || user_pw.length > 20) {
        console.log('비밀번호 길이 벗어남', user_pw.length);
        res.status(400).send({ message: '비밀번호 길이 벗어남' })
    }

})

module.exports = router;