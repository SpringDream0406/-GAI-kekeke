const { validatePassword_midLv } = require("./validatePassword");

const join_check = (user_id, user_pw, user_pwcheck) => {
    let result
    // 아이디 길이 체크
    if (user_id.length < 6 || user_id.length > 20) {
      // res.status(400).send({ message: '아이디 길이 제한' });
      return result = '아이디 길이 제한';
    }

    // 비번 복잡도 체크
    if (!validatePassword_midLv(user_pw)) {
      // res.status(400).send({ message: '비밀번호 요구사항 불충족' });
      return result = '비밀번호 요구사항 불충족';
    }

    // 비번 일치 체크
    if (user_pw !== user_pwcheck) {
      // res.status(400).send({ message: '비밀번호 불일치' });
      return result = '비밀번호 불일치';
    }
}

module.exports = { join_check};