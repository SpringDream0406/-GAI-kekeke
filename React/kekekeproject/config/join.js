const { validatePassword_midLv } = require("./validatepassword");

const join_check = (user_id, user_pw, user_pwcheck) => {
  return new Promise((resolve, reject) => {
    
    // 아이디 길이 체크
    if (user_id.length < 6 || user_id.length > 20) {
      reject({ message: '아이디 길이 제한' });
      return;
    }

    // 비번 복잡도 체크
    if (!validatePassword_midLv(user_pw)) {
      reject({ message: '비밀번호 복잡도 부족' });
      return;
    }

    // 비번 일치 체크
    if (user_pw !== user_pwcheck) {
      reject({ message: '비밀번호 불일치' });
      return;
    }

    resolve({ message: '비밀번호 체크 성공' });
  });
}


const join_res = (err, rows, res) => {
  if (err) {
    console.error('회원가입 에러', err);
    res.status(500).send({ message: '회원가입 에러' });
  }
  else {
    if (rows.affectedRows > 0) {
      console.log('회원가입 성공');
      res.status(201).send({ message: '회원가입 성공' });
    }
    else {
      console.log('회원가입 실패', rows);
      res.status(500).send({ message: '회원가입 실패' });
    }
  }
}

module.exports = { join_check, join_res };



// // 비번 복잡도 체크
// if (!validatePassword_midLv(cust_pw)) {
//     console.log('비밀번호 복잡도 부족', cust_pw);
//     res.status(400).send({ message: '비밀번호 복잡도 부족' });
//     return;
// }

// // 비번 일치 체크
// if (cust_pw !== cust_pwcheck) { // 비밀번호 불일치 체크
//     console.log('비번 불일치', cust_pw, cust_pwcheck);
//     res.status(400).send({ message: '비밀번호 불일치' });
//     return;
// }