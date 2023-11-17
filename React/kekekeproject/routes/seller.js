const express = require('express');
const router = express.Router();
const conn = require('../config/database');
const multer = require('multer');
const path = require('path')
const { login_func } = require('../config/login');
const { join_check } = require('../config/join');
const { md5Hash } = require('../config/crypto');
const { check_func } = require('../config/check');



// 판매자 이미지 저장
const allowedImageExtensions = ['.jpg', '.jpeg', '.png'];
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 저장할 경로 지정
        cb(null, path.join('public', 'img', 'seller'));
    },
    filename: (req, file, cb) => {
        // 셀러 아이디를 파일이름으로 설정
        const seller_id = req.body.seller_id;

        // 확장자 가져오기
        const extname = path.extname(file.originalname);

        // 허용된 확장자인지 체크
        if (!allowedImageExtensions.includes(extname.toLowerCase())) {
            return cb(new Error('허용되지 않는 이미지 확장자 입니다.'));
        }

        // seller_id + 확장자로 이름 설정
        const filename = `${seller_id}${extname}`;
        cb(null, filename);
    },
});
const upload = multer({ storage: storage });


// 판매자 회원가입
router.post('/join', upload.single('seller_profile1'), (req, res) => {
    console.log('판매자 회원가입 시도', req.body);
    let {
        user_name,
        seller_id,
        seller_pw,
        seller_pwcheck,
        phone,
        store_name,
        store_detail,
        add_detail,
        strg_use,
        start_time,
        end_time,
        shop_addr1,
        shop_addr2,
        shop_tel,
        business_num,
    } = req.body;

    // 이미지 파일 처리
    let imgFile = req.file || { filename: 'enho.jpg' };
    let seller_profile1 = imgFile.filename;

    // 회원가입 제한사항 체크
    join_check(seller_id, seller_pw, seller_pwcheck)
        .then((result) => {
            md5Hash(seller_pw)
                .then((hashed) => {
                    const pw_hashed = hashed;

                    let sql = `insert into TB_SELLER (
                                    seller_id, 
                                    seller_pw,
                                    phone,
                                    shop_tel,
                                    user_name,
                                    store_name,
                                    store_detail,
                                    add_detail,
                                    strg_use,
                                    start_time,
                                    end_time,
                                    shop_addr1,
                                    shop_addr2,
                                    business_num,
                                    seller_profile1)
                                values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                    conn.query(sql, [
                        seller_id,
                        seller_pw,
                        phone,
                        shop_tel,
                        user_name,
                        store_name,
                        store_detail,
                        add_detail,
                        strg_use,
                        start_time,
                        end_time,
                        shop_addr1,
                        shop_addr2,
                        business_num,
                        seller_profile1
                    ], (err, rows) => {
                        join_check(err, rows, res);
                    })
                })
                .catch((error) => {
                    console.error('회원가입 비밀번호 헤싱 에러', error);
                    res.status(500).send({ message: '회원가입 비밀번호 암호화 에러' })
                })
        })
        .catch((error) => { // 회원가입 제한사항 체크 통과 못함
            console.log(error);
            res.status(400).send(error)
        })
})


// 판매자 로그인
router.post('/login', (req, res) => {
    console.log('판매자 로그인 시도', req.body);
    let { seller_id, seller_pw } = req.body;
    const user_ip = req.ip.replace(/^::ffff:/, '');
    console.log(user_ip);
    let sql = `select 
                seller_id,
                seller_pw,
                joined_at,
                phone,
                shop_tel,
                user_name,
                store_name,
                store_detail,
                add_detail,
                strg_use,
                start_time,
                end_time,
                shop_addr1,
                shop_addr2,
                business_num,
                seller_profile1
               from TB_SELLER
               where seller_id = ?`
    conn.query(sql, [seller_id], (err, rows) => {
        // console.log(rows);
        if (err) {
            console.error('로그인 시도 에러', err);
            res.status(500).send({ message: '로그인 시도 에러' });
        }
        else {
            if (rows.length > 0) { // id 결과가 있으면
                md5Hash(seller_pw) // crypto 비밀번호 검증
                    .then((hashed) => {
                        const pw_hashed = hashed;
                        if (pw_hashed === rows[0].seller_pw) {
                            console.log('로그인 성공', cust_id, user_ip);
                            let data = {
                                message: '로그인 성공',
                                seller_id: rows[0].seller_id,
                                joined_at: rows[0].joined_at,
                                phone: rows[0].phone,
                                shop_tel: rows[0].shop_tel,
                                user_name: rows[0].user_name,
                                store_name: rows[0].store_name,
                                store_detail: rows[0].store_detail,
                                add_detail: rows[0].add_detail,
                                strg_use: rows[0].strg_use,
                                start_time: rows[0].start_time,
                                end_time: rows[0].end_time,
                                shop_addr1: rows[0].shop_addr1,
                                shop_addr2: rows[0].shop_addr2,
                                business_num: rows[0].business_num,
                                seller_profile1: rows[0].seller_profile1
                            };
                            // console.log('res',data);
                            res.status(200).send(data)
                        }
                        else {
                            console.log('로그인 실패 - 비밀번호 다름');
                            console.log('받은 비번', cust_pw, user_ip);
                            // console.log('비번 검증', result);
                            res.status(400).send({ message: '로그인 실패' });
                        }
                    })
                    .catch((error) => {
                        console.error('비밀번호 검증 중 에러', error);
                        res.status(500).send({ message: '비밀번호 검증 중 에러' })
                    })
            }
            else {
                console.log('로그인 실패 - 데이터 없음', user_ip);
                res.status(400).send({ message: '로그인 데이터 없음' });
            }
        }
    })
})


// 판매자 회원가입 중복체크
router.post('/check', (req, res) => {
    console.log('판매자 회원가입 중복 체크', req.body);
    let { seller_id } = req.body;

    let sql = `select seller_id 
               from TB_SELLER 
               where seller_id = ?`
    conn.query(sql, [seller_id], (err, rows) => {
        check_func(err, rows, res, '셀러 아이디')
    })
})


module.exports = router;