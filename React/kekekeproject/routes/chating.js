const express = require('express');
const http = require('http');

const router = express.Router(); // express 기능 중 router 기능
const socketIo = require('socket.io');

// 앱과 서버 생성
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000', // 클라이언트 주소를 허용합니다.
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('send message', (message) => {
    console.log('Message received: ', message); // 서버 콘솔에 메시지 출력
    io.emit('receive message', message); // 모든 클라이언트에게 메시지를 전달
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// 서버 시작
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = router;