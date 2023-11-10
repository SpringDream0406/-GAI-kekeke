// bcrypt 모듈을 사용하여 비밀번호를 해싱하는 함수입니다.
const bcrypt = require('bcrypt');

// 사용자의 비밀번호를 암호화하는 함수
const hashPassword = (password) => {
    return bcrypt.hash(password, 10) // bcrypt.hash()를 통해 비밀번호를 10번의 salt를 이용하여 해싱합니다.
      .then((hashedPassword) => hashedPassword) // 해싱이 완료되면 결과를 반환합니다.
      .catch((error) => {
        throw new Error('비밀번호 헤싱 실패'); // 에러가 발생하면 '비밀번호 헤싱 실패' 메시지와 함께 에러를 던집니다.
      });
};

module.exports = {
  hashPassword,
};
