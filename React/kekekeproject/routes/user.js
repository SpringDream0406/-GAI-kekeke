// 유저 관련 처리 라우터
const express = require('express') // 미들웨어인 express
const router = express.Router() // express 기능 중 router 기능
const conn = require('../config/database'); // DB 연결
const { hashPassword, comparePasswords } = require('../config/bcrypt'); // 비밀번호 암호화/복호화





// 로그인
router.post('/login', (req, res) => {
    console.log('로그인 시도', req.body);
    let { cust_id, password, user_type } = req.body
    const user_ip = req.ip.replace(/^::ffff:/, '');
    console.log(user_ip);
    if (user_type === 0) {
        console.log('커스터머');
        let sql = `select cust_id, password, join_dy, phone, nick_name, profill_img from CUSTOMER where cust_id = ?`
        // console.log(sql);
        conn.query(sql, [cust_id], (err, rows) => {
            // console.log(rows);
            if (err) {
                console.error('로그인 시도 에러', err);
                res.status(500).send({ message: '로그인 시도 에러' })
            }
            else {
                if (rows.length > 0) { // id 결과가 있으면
                    // console.log(rows);
                    comparePasswords(password, rows[0].password) // 비밀번호 검증
                        .then((result) => {
                            // console.log('비번검증', result);
                            if (result) {
                                console.log('로그인 성공', cust_id);
                                let data = {
                                    message: '로그인 성공',
                                    cust_id: rows[0].cust_id,
                                    join_dy: rows[0].join_dy,
                                    phone: rows[0].phone,
                                    nick_name: rows[0].nick_name,
                                    profill_img: rows[0].profill_img
                                }
                                // console.log('res',data);
                                res.status(200).send(data)
                            }
                            else {
                                console.log('로그인 실패 - 비밀번호 다름');
                                console.log('받은 비번', password);
                                console.log('비번 검증', result);
                                res.status(200).send({ message: '로그인 실패' })
                            }
                        })
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


// 회원가입
router.post('/join', (req, res) => {
    console.log('회원가입 시도', req.body);
    let { cust_id, nick_name, password,passwordcheck, phone, user_type } = req.body;
    console.log('비번길이', password.length);
    if (password.length < 9 || password.length > 20) { // 비밀번호 길이 체크
        console.log('비밀번호 길이 벗어남', password.length);
        res.status(400).send({ message: '비밀번호 길이 벗어남' })
    } else {
        console.log('비번 체크', password, passwordcheck);
        if (password !== passwordcheck) { // 비밀번호 불일치 체크
            res.status(400).send({ message : '비밀번호 불일치' })
        }
        else {
            console.log('회원가입 비밀번호 헤싱');
            hashPassword(password)
            .then((hashed)=>{
                console.log(hashed);
                const pw_hashed = hashed;
                
                if (user_type === 0){
                    let sql = `insert into CUSTOMER (cust_id, password, phone, nick_name)
                               values (?,?,?,?)`
                    conn.query(sql,[cust_id, pw_hashed, phone, nick_name], (err,rows)=>{
                        if(err){
                            console.error('커스터머 회원가입 에러', err);
                            res.status(500).send({message : '커스터머 회원가입 에러'})
                        }
                        else {
                            if(rows.affectedRows > 0){
                                console.log('커스터머 회원가입 성공', cust_id);
                                res.status(200).send({message : '회원가입 성공'})
                            }
                            else{
                                console.log('커스터머 회원가입 실패', rows);
                                res.status(500).send({message : '회원가입 실패'})
                            }
                        }
                    })
                }
            })
            .catch((error)=>{
                console.error('회원가입 비밀번호 헤싱 에러', error);
            })
        }
    }
})


// 회원가입 중복체크
router.post('/check', (req, res) => {
    console.log('중복확인', req.body);
    let { nick_name, cust_id, user_type} = req.body;
    if (user_type === 0) {
        console.log('커스터머');
        if(nick_name){
            console.log('닉네임 중복 체크', nick_name);
            let sql = `select nick_name 
                       from CUSTOMER
                       where nick_name = ?`
            conn.query(sql,[nick_name],(err, rows)=>{
                if(err){
                    console.error('닉네임 중복확인 에러', err);
                    res.status(500).send({message : '닉네임 중복확인 에러'})
                }
                else {
                    if(rows.length > 0) {
                        console.log('닉네임 중복', rows);
                        res.status(200).send({message : '닉네임 중복'})
                    }
                    else {
                        console.log('닉네임 사용 가능', nick_name);
                        res.status(200).send({message : '닉네임 사용 가능'})
                    }
                }
            })
        }
        else if (cust_id){
            console.log('아이디 중복체크', cust_id);
            let sql = `select cust_id
                       from CUSTOMER
                       where cust_id = ?`
            conn.query(sql,[cust_id],(err,rows)=>{
                if(err){
                    console.error('아이디 중복체크 에러', err);
                    res.status(500).send({message : '커스터머 아이디 중복체크 에러'})
                }
                else {
                    if(rows.length > 0) {
                        console.log('아이디 중복', rows);
                        res.status(200).send({message : '아이디 중복'})
                    }
                    else {
                        console.log('아이디 사용 가능', cust_id);
                        res.status(200).send({message : '아이디 사용 가능'})
                    }
                }
            })
        }
    }
    
})

module.exports = router;