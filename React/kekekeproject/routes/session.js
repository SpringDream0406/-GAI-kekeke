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

// 에러 핸들링 및 추가적인 로직 필요

app.listen(3000, () => console.log('Server is running on port 3000'));
