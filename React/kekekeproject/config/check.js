const check_func = (err, rows, res, log_message) => {
    if (err) {
        console.error(`${log_message} 중복확인 에러`, err);
        res.status(500).send({ message: `${log_message} 중복확인 에러` });
    }
    else {
        if (rows.length > 0) {
            console.log(`${log_message} 중복`, rows);
            res.status(200).send({ message: `${log_message} 중복` });
        }
        else {
            console.log(`${log_message} 사용 가능`);
            res.status(200).send({ message: `${log_message} 사용 가능` });
        }
    }
}

module.exports = { check_func }


// if (err) {
//     console.error('아이디 중복체크 에러', err);
//     res.status(500).send({ message: '커스터머 아이디 중복체크 에러' });
// }
// else {
//     if (rows.length > 0) {
//         console.log('아이디 중복', rows);
//         res.status(200).send({ message: '아이디 중복' });
//     }
//     else {
//         console.log('아이디 사용 가능', cust_id);
//         res.status(200).send({ message: '아이디 사용 가능' });
//     }
// }