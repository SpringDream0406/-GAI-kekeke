const express = require('express');
const router = express.Router();
const conn = require('../config/database');
const { login_func } = require('../config/login');


// 판매자 회원가입


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