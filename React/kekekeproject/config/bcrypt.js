// 비밀번호 암호화 (이 프로젝트에서는 사용 안함)
const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  return bcrypt.hash(password, 10)
    .then((hashedPassword) => hashedPassword)
    .catch((error) => {
      throw new Error('비밀번호 헤싱 실패');
    });
};

const comparePasswords = (userInputPassword, storedHashedPassword) => {
  return bcrypt.compare(userInputPassword, storedHashedPassword)
    .then((result) => result)
    .catch((error) => {
      throw new Error('비밀번호 검증 실패');
    });
};

module.exports = {
  hashPassword,
  comparePasswords,
};
