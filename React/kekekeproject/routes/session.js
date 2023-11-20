const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json()); // JSON 요청 본문 파싱을 위해 추가
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터 파싱을 위해 추가

app.use(session({
  secret: process.env.SESSION_SECRET, // 환경 변수에서 secret 키 가져오기
  resave: false,
  saveUninitialized: true,
}));

app.post('/cust/login', (req, res) => {
  // 사용자 인증 로직 구현 필요
  // 데이터베이스에서 사용자 정보 확인 후:
  req.session.user = { cust_id: req.body.cust_id }; // 실제 사용자 ID로 세션 저장
  res.send(req.session.user); // 사용자 정보 응답
});

app.post('/seller/login', (req, res) => {
  // 판매자 인증 로직 구현 필요
  // 데이터베이스에서 판매자 정보 확인 후:
// 서버에서 세션에 판매자 정보 저장
req.session.seller = { seller_id: req.body.seller_id };
  res.send(req.session.seller); // 판매자 정보 응답
});
// 에러 핸들링 및 추가적인 로직 필요

// Express 서버 설정 파일

app.post('/cust/order', (req, res) => {
  const orderData = req.body;
  // 데이터베이스에 주문 데이터 저장 로직
  // 예: database.insertOrder(orderData);

  res.send({ message: '주문이 성공적으로 받아졌습니다.' });
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행중입니다.`);
});

app.listen(3000, () => console.log('Server is running on port 3000'));
