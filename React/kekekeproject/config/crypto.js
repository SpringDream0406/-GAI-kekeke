// 비밀번호 암호화 md5 방식
const crypto = require('crypto');

function md5Hash(data) {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash('md5');
      hash.update(data);
      const result = hash.digest('hex');
      resolve(result);
    }
    catch (error) {
      console.error('MD5 해싱 오류:', error);
      reject(error);
    }
  });
}

module.exports = {
  md5Hash
};
