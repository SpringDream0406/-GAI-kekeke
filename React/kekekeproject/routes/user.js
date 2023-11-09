// 유저 관련 처리 라우터
const express = require('express') // 미들웨어인 express
const router = express.Router() // express 기능 중 router 기능
const conn = require('../config/database') // DB 연결


router.get('/test', (req,res)=>{
    console.log('test');
    res.send('test1')
})

router.post('/login', (req,res)=>{
    console.log('로그인 시도', req.body);
    let {user_id, user_pw} = req.body
    console.log('비번길이', user_pw.length);
    let sql = `select cust_id, password from CUSTOMER where cust_id = ?`
    conn.query(sql,[user_id],(err,rows)=>{
        if(err) {
            console.error('로그인 시도 에러', err);
            res.status(500).send('로그인 시도 에러')
        }
        else {
            if(rows.length > 0) {
                console.log(rows);
                if(rows[0].password_hashed === user_pw){
                    console.log('로그인 성공', user_id);
                    res.status(200).send({message : '로그인 성공'})
                }
                else {
                    console.log('로그인 실패 - 비밀번호 다름');
                    res.status(200).send({message : '로그인 실패'})
                }
            }
            else {
                console.log('로그인 실패 - 데이터 없음');
                res.status(200).send({message : '로그인 데이터 없음'})
            }
        }
    })
})



module.exports = router;