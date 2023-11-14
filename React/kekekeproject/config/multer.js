// 이미지 저장
const multer = require('multer');
const path = require('path');

const storage = (name, des) => multer.diskStorage({
    destination: function (req,file,cb) {
        // 저장할 경로 지정
        cb(null, path.join(des));
    },
    filename: function (req,file,cb) {
        // 확장자 가져오기
        const extname = path.extname(file.originalname);
        // cust_id + 확장자로 이름 설정
        const filename = `${name}${extname}`;
        cb(null, filename);
    }
})


module.exports = storage;