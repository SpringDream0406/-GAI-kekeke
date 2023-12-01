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

// 판매자 이미지 저장 관련
const imgName = 'seller_id';
const imgPath = path.join('public', 'img', 'seller');
const storage = imgStorage(imgPath, imgName);
const upload = multer({ storage: storage, fileFilter: seller_fileFilter });
const upload2 = multer({ storage: storage });


// 판매자 회원가입
router.post('/join', upload.single('seller_profile1'), async (req, res) => {

    try {
        const user_ip = req.ip.replace(/^::ffff:/, '');
        console.log(`판매자 회원가입 시도, ${getNowTime()}`, user_ip);
        console.log(req.body);

        let {
            user_name,
            seller_id,
            seller_pw,
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


        // 이미지 있을 때 제한 사항 반환 코드
        if (req.fileValidationError) {
            let errorMessage = req.fileValidationError
            console.log(errorMessage);
            res.status(400).send({ message: errorMessage })
            return;
        }


        // 이미지 파일 첨부 체크
        console.log(req.file);
        if (!req.file) {
            console.log('파일 첨부 안됨');
            res.status(400).send({ message: '가게 프로필을 첨부해주세요.' })
            return
        }

        let { filename: seller_profile1 } = req.file;

        const pw_hashed = await md5Hash(seller_pw);

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
                    values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        let rows = await query(sql, [
            seller_id,
            pw_hashed,
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
        ]);
        if (rows.affectedRows > 0) {
            console.log('회원가입 성공');
            res.status(201).send({ message: '회원가입 성공' });
        }
        else {
            console.log('회원가입 실패', rows);
            res.status(500).send({ message: '회원가입 실패' });
        }
    } catch (error) {
        console.error('회원가입 에러', error);
        res.status(500).send({ message: '서버 에러' });
    }
});



// 판매자 로그인
router.post('/login', async (req, res) => {
    try {
        const user_ip = req.ip.replace(/^::ffff:/, '');
        console.log(`판매자 로그인 시도, ${getNowTime()}`, user_ip);
        console.log(req.body);

        let { seller_id, seller_pw } = req.body;
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

        let rows = await query(sql, [seller_id]);
        if (rows.length > 0) { // id 결과가 있으면
            const md5HashedPw = await md5Hash(seller_pw)

            if (md5HashedPw === rows[0].seller_pw) {
                console.log('로그인 성공', seller_id);
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
                res.status(200).send(data)
            }
            else {
                console.log(md5HashedPw, rows[0].seller_pw);
                console.log('로그인 실패 - 비밀번호 다름');
                console.log('받은 비번', seller_pw);
                res.status(400).send({ message: '아이디 혹은 비밀번호가 다릅니다.' });
            }
        }
        else {
            console.log('로그인 실패 - 데이터 없음');
            res.status(400).send({ message: '아이디 혹은 비밀번호가 다릅니다.' });
        }
    }
    catch (error) {
        console.error('로그인 처리 에러 발생', error);
        res.status(500).send({ message: '서버 에러' });
    }
});


// 판매자 회원가입 중복체크
router.post('/check', async (req, res) => {
    try {
        const user_ip = req.ip.replace(/^::ffff:/, '');
        console.log(`판매자 회원가입 중복 체크, ${getNowTime()}`);
        console.log(req.body);

        let { seller_id } = req.body;

        let nullCheck = (!seller_id);
        if (nullCheck) {
            console.log('값 없음');
            res.status(400).send({ message: '값을 입력해주세요' })
            return
        }

        let sql = `select seller_id 
               from TB_SELLER 
               where seller_id = ?`

        let rows = await query(sql, [seller_id])
        if (rows.length > 0) {
            console.log(`아이디 중복`);
            res.status(400).send({ message: `아이디 중복` });
        }
        else {
            console.log('조회 데이터 없음');
            res.status(200).send({ message: `사용 가능한 아이디입니다.` });
        }
    }
    catch (error) {
        console.error('에러 발생', error);
        res.status(500).send({ message: '서버 에러' });
    }
});

//판매자 주문내역 리스트
router.post('/sellerorderlist', async (req, res) => {
    try {
        const { sellerId } = req.body;
        console.log(req.body);

        let sql = `SELECT 
        PO.PRD_ID,
        PO.ADD_REQUIRE,
        PO.CAKE_NAME,
        PO.CAKE_SIZE,
        PO.CAKE_FLAVOR,
        PO.LETTERING,
        PO.SALE_DY,
        PO.CAKE_PRICE,
        PO.PICKUP_DATE,
        PI.IMG_NAME2,
        C.NICK_NAME,
        C.PHONE
    FROM 
        TB_PRODUCT_ORDER AS PO
    JOIN 
        TB_PRODUCT AS P ON PO.PRD_ID = P.PRD_ID
    LEFT JOIN 
        TB_PRODUCT_IMG AS PI ON PO.PRD_ID = PI.PRD_ID
    JOIN
        TB_CUSTOMER AS C ON PO.CUST_ID = C.CUST_ID
    WHERE
        PO.SELLER_ID = ?;`;

        const sellerorders = await query(sql, [sellerId])
        console.log('Fetched user orders:', sellerorders);

        if(sellerorders.length === 0 ) {
            return res.status(404).send({ message : '제품을 찾을 수 없음'});
        }
        res.status(200).send({
            sellerorders : sellerorders
        });
    } catch (error) {
        console.error(`SQL 에러 : ${error}`);
        res.status(500).send({ message: '서버에러'});
    }
})


router.post('/customreivew', async (req, res) => {
    try {
        // 클라이언트에서 보낸 데이터 추출
        const { seller_id, custom_id, message } = req.body;

        console.log(req.body);

        // 여기서 데이터를 사용하여 필요한 작업 수행
        // 예: 데이터베이스에 저장, 처리 로직 수행 등
        let sql = `INSERT INTO TB_SELLER_APPLY (SELLER_ID, CUSTOM_ID, REVIEW_MSG) VALUES (?, ?, ?);`;
        let rows = await query(sql, [seller_id, custom_id, message]);
        // 성공적으로 처리했다고 클라이언트에 응답
        res.status(200).json({ message: '리뷰가 성공적으로 처리되었습니다.' });
    } catch (error) {
        console.log('데이터 에러', error);
        // 에러 발생 시 클라이언트에 에러 응답
        res.status(500).json({ error: '서버 내부 오류' });
    }
});


router.put('/updateprd', async (req, res) => {
    try {
      const { PRD_NAME, PRD_ATM, SALE_STATUS, PRD_ID } = req.body; // 구조 분해 할당 사용
        // 여기에서 로그를 추가하여 각 변수의 값을 확인
        console.log({ PRD_NAME, PRD_ATM,  SALE_STATUS, PRD_ID });
  
      let sql = `UPDATE TB_PRODUCT SET prd_name = ?, prd_amt = ?, sale_status = ? WHERE prd_id = ?`;
      let rows = await query(sql, [PRD_NAME, PRD_ATM, SALE_STATUS, PRD_ID]); // 매개변수 순서 조정
  
      res.status(200).send("상품 업데이트 성공");
    } catch (error) {
      console.error("서버 업데이트 오류", error);
      res.status(500).send("서버 오류 발생");
    }
  });


  //판매자마이페이지 내정보 수정
router.post('/update', upload2.single('seller_profile1'), async (req, res) => {
    try {
        const { seller_id, store_name , store_detail, add_detail, strg_use, start_time, end_time, shop_addr1, shop_addr2, shop_tel, business_num } = req.body;

        // 이미지 파일 처리
        let imgFile = req.file || { filename: `null` };
        console.log(imgFile);
        let seller_profile1 = imgFile.filename;


        // Update user information in the database using SQL queries.
        const sql = `UPDATE TB_SELLER
        SET store_name = ? , store_detail = ?, add_detail = ?,
        strg_use = ?, start_time = ?, end_time = ?, shop_addr1 = ?,
        shop_addr2 = ?, shop_tel = ?, business_num = ?,
        seller_profile1 = ?
        WHERE seller_id = ?;`;

        const updatedRows = await query(sql, [seller_profile1, seller_id, store_name , store_detail, add_detail, strg_use, start_time, end_time, shop_addr1, shop_addr2, shop_tel, business_num]); 
        if (updatedRows.affectedRows > 0) {
            console.log('User information updated successfully');
            res.status(200).send({ message: 'User information updated successfully' });
        } else {
            console.log('User information update failed');
            res.status(500).send({ message: 'User information update failed' });
        }
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).send({ message: 'Server error' });
    }
});


  


// // 상품 삭제 라우트
// router.post('/prdDelete', async (req, res) => {
//     try {
//         const { prd_id } = req.body; // 클라이언트로부터 전달받은 상품 ID

//         // 데이터베이스에서 상품 삭제
//         await TB_RPODUCT.destroy({
//             where: { PRD_ID: prd_id }
//         });

//         res.status(200).json({ message: '상품이 성공적으로 삭제되었습니다.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: '서버 오류로 상품 삭제에 실패했습니다.' });
//     }
// });


module.exports = router;