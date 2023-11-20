// 커스터머 관련 처리 라우터
const express = require('express'); // 미들웨어인 express
const router = express.Router(); // express 기능 중 router 기능
const conn = require('../config/database'); // DB 연결
const { md5Hash } = require('../config/crypto'); // 비밀번호 md5 암호화
const multer = require('multer'); // 이미지 처리
const path = require('path'); // 경로 작성 방법 변경
const { join_check, join_res } = require('../config/join'); // 회원가입 제한사항 체크
const { check_func } = require('../config/check'); // 중복확인 응답 모듈화
const { getNowTime } = require('../config/getNowTime');


// 커스터머 이미지 저장
const allowedImageExtensions = ['.jpg', '.jpeg', '.png']; // 이미지 허용 확장자
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 저장할 경로 지정
        cb(null, path.join('public', 'img', 'cust'));
    },
    filename: (req, file, cb) => {
        // 커스터머 아이디를 파일이름으로 설정
        const cust_id = req.body.cust_id;

        // 확장자 가져오기
        const extname = path.extname(file.originalname);

        // 허용된 확장자인지 체크
        if (!allowedImageExtensions.includes(extname.toLowerCase())) { // 확장자 소문자로 변환 후 허용 확장자 리스트에 있는지 확인
            return cb(new Error('허용되지 않는 이미지 확장자입니다.'));
        }

        // cust_id + 확장자로 이름 설정
        const filename = `${cust_id}${extname}`;
        cb(null, filename);
    },
});
const upload = multer({ storage: storage });


// 커스터머 회원가입
router.post('/join', upload.single('profile_img'), (req, res) => {
    // upload.sing => 한번에 한개씩, 뒤에 이름은 이름에 해당되는 파일을 올리겠다는 뜻

    console.log(`커스터머 회원가입 시도, ${getNowTime()}`, req.body, );
    let { cust_id, nick_name, cust_pw, cust_pwcheck, phone } = req.body;
    
    let nullCheck = (cust_id && nick_name && cust_pw && cust_pwcheck && phone);
    if (!nullCheck){
        console.log(`빈칸 존재`);
        res.status(400).send({message : '빈칸이 존재합니다.'});
        return;
    }

    // 이미지 파일 처리
    let imgFile = req.file || { filename: 'enho.jpg' };
    let profile_img = imgFile.filename;

    // 회원가입 제한사항 체크
    join_check(cust_id, cust_pw, cust_pwcheck)
        .then((result) => { // 회원 가입 제한 통과
            // 비밀번호 암호화
            md5Hash(cust_pw) // crypto 암호화
                .then((hashed) => {
                    // console.log('비번 암호화', cust_pw, hashed);
                    const pw_hashed = hashed;

                    let sql = `insert into TB_CUSTOMER (cust_id, cust_pw, phone, nick_name, profile_img)
                           values (?,?,?,?,?)`;
                    conn.query(sql, [cust_id, pw_hashed, phone, nick_name, profile_img], (err, rows) => {
                        join_res(err, rows, res); // 응답 모듈화
                    })
                })
                .catch((error) => {
                    console.error('회원가입 비밀번호 헤싱 에러', error);
                    res.status(500).send({ message: '회원가입 비밀번호 암호화 에러' });
                })
        })
        .catch((error) => { // 회원가입 제한사항 체크 통과 못함
            console.log(error);
            res.status(400).send(error)
        })
})


// 커스터머 로그인
router.post('/login', (req, res) => {
    const user_ip = req.ip.replace(/^::ffff:/, '');
    console.log(`커스터머 로그인 시도, ip: ${user_ip}, ${getNowTime()}`, req.body);
    let { cust_id, cust_pw } = req.body;
    // console.log(user_ip);
    let sql = `select cust_id, cust_pw, joined_at, phone, nick_name, profile_img
                   from TB_CUSTOMER
                   where cust_id = ?`;
    conn.query(sql, [cust_id], (err, rows) => {
        // console.log(rows);
        if (err) {
            console.error('로그인 시도 에러', err);
            res.status(500).send({ message: '서버 에러' });
        }
        else {
            if (rows.length > 0) { // id 결과가 있으면
                md5Hash(cust_pw) // crypto 비밀번호 검증
                    .then((hashed) => {
                        const pw_hashed = hashed;
                        if (pw_hashed === rows[0].cust_pw) {
                            console.log('로그인 성공', cust_id, user_ip);
                            let data = { // front로 보낼 데이터
                                message: '로그인 성공',
                                cust_id: rows[0].cust_id,
                                joined_at: rows[0].joined_at,
                                phone: rows[0].phone,
                                nick_name: rows[0].nick_name,
                                profile_img: rows[0].profile_img
                            };
                            // console.log('res',data);
                            res.status(200).send(data)
                        }
                        else {
                            console.log('로그인 실패 - 비밀번호 다름');
                            console.log('받은 비번', cust_pw, user_ip);
                            // console.log('비번 검증', result);
                            res.status(400).send({ message: '아이디 혹은 비밀번호가 다릅니다.' });
                        }
                    })
                    .catch((error) => {
                        console.error('비밀번호 암호화 중 에러', error);
                        res.status(500).send({ message: '서버 에러' })
                    })
            }
            else {
                console.log('로그인 실패 - 데이터 없음', user_ip);
                res.status(400).send({ message: '아이디 혹은 비밀번호가 다릅니다.' });
            }
        }
    })
})



// 커스터머 회원가입 중복체크
router.post('/check', (req, res) => {
    const user_ip = req.ip.replace(/^::ffff:/, '');
    console.log(`커스터머 회원가입 중복체크, ip:${user_ip}, ${getNowTime()}`, req.body);
    let { nick_name, cust_id } = req.body;
    if (nick_name) {
        console.log(`닉네임 중복 체크, ${nick_name}`);
        let sql = `select nick_name 
                       from TB_CUSTOMER
                       where nick_name = ?`;
        conn.query(sql, [nick_name], (err, rows) => {
            check_func(err, rows, res, '커스터머 닉네임'); // 응답 모듈화
        })
    }
    else if (cust_id) {
        console.log(`아이디 중복체크', ${cust_id}}`);
        let sql = `select cust_id
                       from TB_CUSTOMER
                       where cust_id = ?`
        conn.query(sql, [cust_id], (err, rows) => {
            check_func(err, rows, res, '커스터머 아이디'); // 응답 모듈화
        })
    }
})

router.post('/order', (req, res) => {
    const orderData = req.body;
    // 여기에서 orderData의 유효성 검사를 수행
    console.log(`커스터머 주문 시도, orderdata: ${orderData}, ${getNowTime()}`, req.body);
    let sql = `INSERT INTO tb_product_order (deal_id, cake_name, add_require, cake_size, cake_flavor, cake_price, seller_id, prd_id, cust_id, sale_dy, lettering, order_user, order_num, pickup_date, pickup_time, cake_let) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    conn.query(sql, [/* 주문 데이터의 각 항목 */], (err, result) => {
        if (err) {
            console.error('주문 데이터 저장 실패', err);
            res.status(500).send({ message: '주문 처리 중 오류 발생' });
        } else {
            console.log('주문 데이터 저장 성공', result);
            res.status(200).send({ message: '주문이 성공적으로 처리되었습니다.' });
        }
    });
});



module.exports = router;