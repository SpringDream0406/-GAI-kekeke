const express = require('express');
const router = express.Router();
const conn = require('../config/database');
const multer = require('multer'); // 이미지 처리
const path = require('path')
const { login_func } = require('../config/login');



// 판매자 이미지 저장
const allowedImageExtensions = ['.jpg', '.jpeg', '.png']; // 이미지 허용 확장자
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 저장할 경로 지정
        cb(null, path.join('public', 'img', 'seller'));
    },
    filename: (req, file, cb) => {
        // 셀러 아이디를 파일이름으로 설정
        const seller = req.body.seller_id;

        // 확장자 가져오기
        const extname = path.extname(file.originalname);

        // 허용된 확장자인지 체크
        if (!allowedImageExtensions.includes(extname.toLowerCase())) {
            return cb(new Error('허용되지 않는 이미지 확장자 입니다.'));
        }

        const filename = `${seller_id}${extname}`;
        cb(null, filename);
    },
});
const upload = multer({ storage: storage });

// 판매자 회원가입
router.post('/join', (res, req) => {
    console.log('판매자 회원가입 시도', req.body);
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

        let pw_sql = rows[0].seller_pw;

        let res_data = {
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

        login_func(err, rows, res, seller_id, seller_pw, pw_sql, res_data, user_ip);
    })
})



module.exports = router;