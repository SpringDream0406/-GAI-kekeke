// md5Hash.js 파일
const crypto = require('crypto');

function md5Hash(data) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    hash.update(data);
    const result = hash.digest('hex');
    resolve(result);
  });
}

module.exports = {
  md5Hash
};
