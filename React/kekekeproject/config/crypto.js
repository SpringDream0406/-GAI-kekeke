// 비밀번호 암호화 md5 방식
const crypto = require('crypto');

function md5Hash(data) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    hash.update(data);
    const result = hash.digest('hex');
    resolve(result);
  });
}

// let test_pw = 'asdfasdf!'
// md5Hash(test_pw)
// .then((result)=>{
//   console.log(result);
// })

module.exports = {
  md5Hash
};