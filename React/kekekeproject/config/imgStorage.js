const multer = require('multer');
const path = require('path');
const { join_check } = require('./join');


const allowedImageExtensions = ['.jpg', '.jpeg', '.png']; // 이미지 허용 확장자

const imgStorage = (imgPath, imgName) => multer.diskStorage({
    destination: (req, file, cb) => {
        // 저장할 경로 지정
        cb(null, imgPath);
    },
    filename: (req, file, cb) => {
        // body의 해당값으로 이름 지정
        const fileName = req.body[imgName];

        // 확장자 가져오기
        const extname = path.extname(file.originalname);

        // 이름 설정
        const filename = `${fileName}${extname}`;
        cb(null, filename);
    },

});


const cust_fileFilter = (req, file, cb) => {

        // 이미지가 있을 때 제한사항 통과하기 전에 이미지가 저장되면 안되므로
        // 제한사항 체크를 여기서도 해줘야함

        // 확장자 가져오기
        const extname = path.extname(file.originalname).toLowerCase();

        let { cust_id, nick_name, cust_pw, cust_pwcheck, phone } = req.body;
        let nullCheck = !(cust_id && nick_name && cust_pw && cust_pwcheck && phone);
        let join_check_result = join_check(cust_id, cust_pw, cust_pwcheck)

        if (!allowedImageExtensions.includes(extname)) {
            req.fileValidationError = "jpg, jpeg, png 파일만 업로드 가능합니다.";
            cb(null, false);
        } else if (nullCheck) {
            req.fileValidationError = "빈칸이 존재 합니다.";
            cb(null, false);
        } else if (join_check_result) {
            req.fileValidationError = join_check_result;
            cb(null, false);
        }
        else {
            cb(null, true);
        }
}

module.exports = { imgStorage, cust_fileFilter };
