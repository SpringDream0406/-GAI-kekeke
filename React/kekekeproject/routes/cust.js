// 커스터머 관련 처리 라우터
const express = require('express'); // 미들웨어인 express
const router = express.Router(); // express 기능 중 router 기능
const conn = require('../config/database'); // DB 연결
const { hashPassword, comparePasswords } = require('../config/bcrypt'); // bcrypt 암호화/복호화
const { md5Hash } = require('../config/crypto'); // md5 암호화
const multer = require('multer'); // 이미지 처리
const path = require('path'); // 경로 작성 방법 변경


const allowedImageExtensions = ['.jpg', '.jpeg', '.png']; // 이미지 허용 확장자

// 커스터머 이미지 저장
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

    console.log('커스터머 회원가입 시도', req.body);
    let { cust_id, nick_name, cust_pw, cust_pwcheck, phone } = req.body;

    // 이미지 파일 처리
    let imgFile = req.file;
    if (!imgFile) {
        // 클라이언트에서 이미지를 보내지 않았을 때 기본 이미지 파일 설정
        imgFile = { filename: 'eunho.jpg' };
    }

    console.log('이미지 파일 처리 이름', imgFile);
    let profile_img = imgFile.filename;
    console.log('이미지 파일 처리 이름2', profile_img);

    // 비번 길이 체크
    console.log('비번길이', cust_pw.length);
    if (cust_pw.length < 8 || cust_pw.length > 20) { // 비밀번호 길이 체크
        console.log('비밀번호 길이 벗어남', cust_pw.length);
        res.status(400).send({ message: '비밀번호 길이 벗어남' })
        return;
    }

    // 비번 일치 체크
    console.log('비번 체크', cust_pw, cust_pwcheck);
    if (cust_pw !== cust_pwcheck) { // 비밀번호 불일치 체크
        res.status(400).send({ message: '비밀번호 불일치' })
        return;
    }

    // 비밀번호 암호화
    console.log('회원가입 비밀번호 헤싱');
    // hashPassword(cust_pw) // bcrypt 암호화
    // .then((hashed)=>{
    //     console.log(hashed);
    //     const pw_hashed = hashed;

    md5Hash(cust_pw) // crypto 암호화
        .then((hashed) => {
            console.log(hashed);
            const pw_hashed = hashed

            profile_img = profile_img || 'eunho.jpg'; // 프로필 이미지 첨부 안했으면 기본값인 은호로 등록

            let sql = `insert into TB_CUSTOMER (cust_id, cust_pw, phone, nick_name, profile_img)
                                   values (?,?,?,?,?)`
            conn.query(sql, [cust_id, pw_hashed, phone, nick_name, profile_img], (err, rows) => {
                if (err) {
                    console.error('커스터머 회원가입 에러', err);
                    res.status(500).send({ message: '커스터머 회원가입 에러' })
                }
                else {
                    if (rows.affectedRows > 0) {
                        console.log('커스터머 회원가입 성공', cust_id);
                        res.status(201).send({ message: '회원가입 성공' })
                    }
                    else {
                        console.log('커스터머 회원가입 실패', rows);
                        res.status(500).send({ message: '회원가입 실패' })
                    }
                }
            })
        })
        .catch((error) => {
            console.error('회원가입 비밀번호 헤싱 에러', error);
            res.status(500).send({ message: '회원가입 비밀번호 암호화 에러' })
        })
})


// 커스터머 로그인
router.post('/login', (req, res) => {
    console.log('커스터머 로그인 시도', req.body);
    let { cust_id, cust_pw } = req.body
    const user_ip = req.ip.replace(/^::ffff:/, '');
    // console.log(user_ip);
    let sql = `select cust_id, cust_pw, joined_at, phone, nick_name, profile_img 
                   from TB_CUSTOMER 
                   where cust_id = ?`
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

                // comparePasswords(cust_pw, rows[0].cust)pw) // bcrypt 비밀번호 검증
                //     .then((result) => {
                //         // console.log('비번검증', result);
                //         if (result) {

                md5Hash(cust_pw) // crypto 비밀번호 검증
                    .then((hashed) => {
                        const pw_hashed = hashed
                        if (pw_hashed === rows[0].cust_pw) {
                            console.log('로그인 성공', cust_id, user_ip);
                            let data = { // front로 보낼 데이터
                                message: '로그인 성공',
                                cust_id: rows[0].cust_id,
                                joined_at: rows[0].joined_at,
                                phone: rows[0].phone,
                                nick_name: rows[0].nick_name,
                                profile_img: rows[0].profile_img
                            }
                            // console.log('res',data);
                            res.status(200).send(data)
                        }
                        else {
                            console.log('로그인 실패 - 비밀번호 다름');
                            console.log('받은 비번', cust_pw, user_ip);
                            // console.log('비번 검증', result);
                            res.status(400).send({ message: '로그인 실패' })
                        }
                    })
                    .catch
            }
            else {
                console.log('로그인 실패 - 데이터 없음', user_ip);
                res.status(400).send({ message: '로그인 데이터 없음' })
            }
        }
    })
})


// 회원가입 중복체크
router.post('/check', (req, res) => {
    console.log('중복확인', req.body);
    let { nick_name, cust_id, user_type } = req.body;
    console.log('커스터머');
    if (nick_name) {
        console.log('닉네임 중복 체크', nick_name);
        let sql = `select nick_name 
                       from TB_CUSTOMER
                       where nick_name = ?`
        conn.query(sql, [nick_name], (err, rows) => {
            if (err) {
                console.error('닉네임 중복확인 에러', err);
                res.status(500).send({ message: '닉네임 중복확인 에러' })
            }
            else {
                if (rows.length > 0) {
                    console.log('닉네임 중복', rows);
                    res.status(200).send({ message: '닉네임 중복' })
                }
                else {
                    console.log('닉네임 사용 가능', nick_name);
                    res.status(200).send({ message: '닉네임 사용 가능' })
                }
            }
        })
    }
    else if (cust_id) {
        console.log('아이디 중복체크', cust_id);
        let sql = `select cust_id
                       from TB_CUSTOMER
                       where cust_id = ?`
        conn.query(sql, [cust_id], (err, rows) => {
            if (err) {
                console.error('아이디 중복체크 에러', err);
                res.status(500).send({ message: '커스터머 아이디 중복체크 에러' })
            }
            else {
                if (rows.length > 0) {
                    console.log('아이디 중복', rows);
                    res.status(200).send({ message: '아이디 중복' })
                }
                else {
                    console.log('아이디 사용 가능', cust_id);
                    res.status(200).send({ message: '아이디 사용 가능' })
                }
            }
        })
    }
})


module.exports = router;