const multer = require('multer');

const allowedImageExtensions = ['.jpg', '.jpeg', '.png']; // 이미지 허용 확장자

const imgStorage = (imgPath, imgName) => multer.diskStorage({
    destination: (req, file, cb) => {
        // 저장할 경로 지정
        cb(null, imgPath);
    },
    filename: (req, file, cb) => {
        // 확장자 가져오기
        const extname = path.extname(file.originalname);

        // 허용된 확장자인지 체크
        if (!allowedImageExtensions.includes(extname.toLowerCase())) { // 확장자 소문자로 변환 후 허용 확장자 리스트에 있는지 확인
            return cb(new Error('허용되지 않는 이미지 확장자입니다.'));
        }

        // 확장자로 이름 설정
        const filename = `${imgName}${extname}`;
        cb(null, filename);
    },
});

const imgUpload = multer({ storage: imgStorage });

module.exports = { imgStorage, imgUpload };