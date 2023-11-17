const { md5Hash } = require('./crypto') // 비밀번호 암호화



const login_func = (err, rows, res, user_id, user_pw, res_data, user_ip) => {

    // console.log(rows);
    if (err) {
        console.error('로그인 시도 에러', err);
        res.status(500).send({ message: '로그인 시도 에러' });
    }
    else {
        if (rows.length > 0) { // id 결과가 있으면
            let pw_sql = rows[0].user_pw || 0;

            md5Hash(user_pw) // crypto 비밀번호 검증
                .then((hashed) => {
                    const pw_hashed = hashed;
                    if (pw_hashed === pw_sql) {
                        console.log('로그인 성공', user_id, user_ip);
                        // console.log('res',data);
                        res.status(200).send(res_data)
                    }
                    else {
                        console.log('로그인 실패 - 비밀번호 다름');
                        console.log('받은 비번', user_pw, user_ip);
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
}

module.exports = { login_func }



// // 커스터머 로그인
// router.post('/login', (req, res) => {
//     console.log('커스터머 로그인 시도', req.body);
//     let { cust_id, cust_pw } = req.body;
//     const user_ip = req.ip.replace(/^::ffff:/, '');
//     // console.log(user_ip);
//     let sql = `select cust_id, cust_pw, joined_at, phone, nick_name, profile_img
//                    from TB_CUSTOMER
//                    where cust_id = ?`;
//     conn.query(sql, [cust_id], (err, rows) => {
//         // console.log(rows);
//         if (err) {
//             console.error('로그인 시도 에러', err);
//             res.status(500).send({ message: '로그인 시도 에러' });
//         }
//         else {
//             if (rows.length > 0) { // id 결과가 있으면
//                 // console.log(rows);

//                 // comparePasswords(cust_pw, rows[0].cust)pw) // bcrypt 비밀번호 검증
//                 //     .then((result) => {
//                 //         // console.log('비번검증', result);
//                 //         if (result) {

//                 md5Hash(cust_pw) // crypto 비밀번호 검증
//                     .then((hashed) => {
//                         const pw_hashed = hashed;
//                         if (pw_hashed === rows[0].cust_pw) {
//                             console.log('로그인 성공', cust_id, user_ip);
//                             let data = { // front로 보낼 데이터
//                                 message: '로그인 성공',
//                                 cust_id: rows[0].cust_id,
//                                 joined_at: rows[0].joined_at,
//                                 phone: rows[0].phone,
//                                 nick_name: rows[0].nick_name,
//                                 profile_img: rows[0].profile_img
//                             };
//                             // console.log('res',data);
//                             res.status(200).send(data)
//                         }
//                         else {
//                             console.log('로그인 실패 - 비밀번호 다름');
//                             console.log('받은 비번', cust_pw, user_ip);
//                             // console.log('비번 검증', result);
//                             res.status(400).send({ message: '로그인 실패' });
//                         }
//                     })
//                     .catch((error) => {
//                         console.error('비밀번호 검증 중 에러', error);
//                         res.status(500).send({ message: '비밀번호 검증 중 에러' })
//                     })
//             }
//             else {
//                 console.log('로그인 실패 - 데이터 없음', user_ip);
//                 res.status(400).send({ message: '로그인 데이터 없음' });
//             }
//         }
//     })
// })
