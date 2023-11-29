// 커스터머 관련 처리 라우터
const express = require('express'); // 미들웨어인 express
const router = express.Router(); // express 기능 중 router 기능
const conn = require('../config/database'); // DB 연결
const { md5Hash } = require('../config/crypto'); // 비밀번호 md5 암호화
const multer = require('multer'); // 이미지 처리
const path = require('path'); // 경로 작성 방법 변경
const { join_check } = require('../config/join'); // 회원가입 제한사항 체크
const { getNowTime } = require('../config/getNowTime');
const { query } = require('../config/poolDatabase');
const { imgStorage, cust_fileFilter } = require('../config/imgStorage');


// 커스터머 이미지 저장 관련
const imgName = 'cust_id';
const imgPath = path.join('public', 'img', 'cust');
const storage = imgStorage(imgPath, imgName);
const upload = multer({ storage: storage, fileFilter: cust_fileFilter });
const upload2 = multer({ storage: storage });

// 커스터머 회원가입
router.post('/join', upload.single('profile_img'), async (req, res) => {
    // upload.sing => 한번에 한개씩, 뒤에 이름은 이름에 해당되는 파일을 올리겠다는 뜻
    // 이미지 저장 기능이 먼저 수행되고, formData로 오다보니, multer의 사용이 먼저 행해지게됨
    // 따라서 이미지가 있을 때와 없을 때 2가지의 실행코드가 필요했음..
    try {
        const user_ip = req.ip.replace(/^::ffff:/, '');
        console.log(`커스터머 회원가입 시도, ${getNowTime()}`, user_ip);
        console.log(req.body);

        let { cust_id, nick_name, cust_pw, cust_pwcheck, phone } = req.body;


        // 이미지 있을 때 제한 사항 반환 코드
        if (req.fileValidationError) {
            let errorMessage = req.fileValidationError
            console.log('파일 첨부 경우,', errorMessage);
            res.status(400).send({ message: errorMessage })
            return;
        }


        // 이미지 없을 때
        let nullCheck = !(cust_id && nick_name && cust_pw && cust_pwcheck && phone);
        if (nullCheck) {
            console.log(`빈칸 존재`);
            res.status(400).send({ message: '빈칸이 존재합니다.' });
            return;
        }


        // 이미지 파일 처리
        let imgFile = req.file || { filename: 'enho.jpg' };
        let profile_img = imgFile.filename;

        // 회원가입 제한사항 체크
        const cust_result = await join_check(cust_id, cust_pw, cust_pwcheck);
        if (cust_result) {
            console.log(cust_result);
            res.status(400).send({ message: cust_result });
            return;
        }

        // 비번 암호화
        const md5HashedPw = await md5Hash(cust_pw);

        let sql = `insert into TB_CUSTOMER (cust_id, cust_pw, phone, nick_name, profile_img)
                           values (?,?,?,?,?)`;

        let rows = await query(sql, [cust_id, md5HashedPw, phone, nick_name, profile_img]);
        if (rows.affectedRows > 0) {
            console.log('회원가입 성공');
            res.status(201).send({ message: '회원가입 성공' });
        }
        else {
            console.log('회원가입 실패', rows);
            res.status(500).send({ message: '회원가입 실패' });
        }
    }
    catch (error) {
        console.error('회원가입 에러', error);
        res.status(500).send({ message: '서버 에러' });
    }
});

// 커스터머 로그인
router.post('/login', async (req, res) => {
    try {
        const user_ip = req.ip.replace(/^::ffff:/, '');
        console.log(`커스터머 로그인 시도, ${getNowTime()}`, user_ip);
        console.log(req.body);
        let { cust_id, cust_pw } = req.body;
        let sql = `select 
                    cust_id, 
                    cust_pw, 
                    joined_at, 
                    phone, 
                    nick_name, 
                    profile_img
                   from TB_CUSTOMER
                   where cust_id = ?`;

        let rows = await query(sql, [cust_id]);

        if (rows.length > 0) { // id 결과가 있으면
            const md5HashedPw = await md5Hash(cust_pw)

            if (md5HashedPw === rows[0].cust_pw) {
                console.log('로그인 성공', cust_id);
                let data = { // front로 보낼 데이터
                    message: '로그인 성공',
                    cust_id: rows[0].cust_id,
                    joined_at: rows[0].joined_at,
                    phone: rows[0].phone,
                    nick_name: rows[0].nick_name,
                    profile_img: rows[0].profile_img
                };
                res.status(200).send(data);
            }
            else {
                console.log(md5HashedPw, rows[0].cust_pw);
                console.log('로그인 실패 - 비밀번호 다름');
                console.log('받은 비번', cust_pw);
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


// 커스터머 회원가입 중복체크
router.post('/check', async (req, res) => {
    try {
        const user_ip = req.ip.replace(/^::ffff:/, '');
        console.log(`커스터머 회원가입 중복체크, ${getNowTime()}`, user_ip);
        console.log(req.body);
        let { nick_name, cust_id } = req.body;

        let nullCheck = (!nick_name && !cust_id)
        if (nullCheck) {
            console.log('값 없음');
            res.status(400).send({ message: '값을 입력해주세요' })
            return
        }

        let rows, check_type;

        if (nick_name) {
            console.log(`닉네임 중복 체크, ${nick_name}`);
            let sql = `select nick_name 
                       from TB_CUSTOMER
                       where nick_name = ?`;

            rows = await query(sql, [nick_name]);
            check_type = '닉네임';
        }
        else if (cust_id) {
            console.log(`아이디 중복 체크, ${cust_id}`);
            let sql = `select cust_id
                       from TB_CUSTOMER
                       where cust_id = ?`;

            rows = await query(sql, [cust_id]);
            check_type = '아이디';
        }

        // 중복 체크 결과 응답
        if (rows.length > 0) {
            console.log(`${check_type} 중복`);
            res.status(400).send({ message: `${check_type} 중복` });
        }
        else {
            console.log('조회 데이터 없음');
            res.status(200).send({ message: `사용 가능한 ${check_type}입니다.` });
        }
    }
    catch (error) {
        console.error('에러 발생', error);
        res.status(500).send({ message: '서버 에러' });
    }
});

//커스터머 주문내역 리스트
router.post('/orderlist', async (req, res) => {
    try {
        const { custId } = req.body;
        console.log(req.body);

        let sql = `SELECT
        TPO.PRD_ID,
        TPO.CAKE_NAME,
        TPO.CAKE_SIZE,
        TPO.CAKE_FLAVOR,
        TPO.SALE_DY,
        TPO.PICKUP_DATE,
        TS.STORE_NAME,
        TCR.CONS_OR_OC,
        TPI.IMG_NAME2,
        TPO.ADD_REQUIRE,
        TPO.DEAL_ID
    FROM
        TB_PRODUCT_ORDER AS TPO
    JOIN
        TB_PRODUCT AS TP ON TPO.PRD_ID = TP.PRD_ID
    JOIN
        TB_SELLER AS TS ON TP.SELLER_ID = TS.SELLER_ID
        LEFT JOIN
    TB_CHAT_ROOM AS TCR ON TPO.DEAL_ID = TCR.DEAL_ID
    LEFT JOIN
        TB_PRODUCT_IMG AS TPI ON TP.PRD_ID = TPI.PRD_ID
    WHERE
        TPO.CUST_ID = ?;`;

        const userorders = await query(sql, [custId])
        console.log('Fetched user orders:', userorders);

        if(userorders.length === 0 ) {
            return res.status(404).send({ message : '제품을 찾을 수 없음'});
        }
        res.status(200).send({
            userorders : userorders
        });
    } catch (error) {
        console.error(`SQL 에러 : ${error}`);
        res.status(500).send({ message: '서버에러'});
    }
})

//마이페이지 내정보 수정
router.post('/update', upload2.single('profile_img'), async (req, res) => {
    try {
        const { cust_id, nick_name, cust_pw, phone } = req.body;

        // 이미지 파일 처리
        let imgFile = req.file || { filename: `profile_img` };
        console.log(imgFile);
        let profile_img = imgFile.filename;

        // Check if any required field is missing and assign null if missing.
        if (!nick_name || !cust_pw || !phone || !cust_id) {
            console.log('Required fields are missing');
            res.status(400).send({ message: 'Required fields are missing' });
            return;
        }

                // 비번 암호화
                const md5HashedPw = await md5Hash(cust_pw);

        // Update user information in the database using SQL queries.
        const sql = `
            UPDATE TB_CUSTOMER
            SET nick_name = ?, cust_pw = ?, phone = ?, profile_img = ?
            WHERE cust_id = ?;
        `;

        const updatedRows = await query(sql, [nick_name, md5HashedPw, phone, profile_img, cust_id]); 
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

module.exports = router;