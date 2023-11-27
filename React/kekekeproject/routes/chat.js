const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// 앱과 서버 생성
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'], // WebSocket 사용 강제
});

// 서버 측 코드에서 판매자와 구매자 간의 채팅방을 관리할 객체를 생성합니다.
const chatRooms = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join room', (roomId) => {
    // roomId를 이용하여 각 채팅방을 식별하고, 해당 채팅방에 유저를 조인시킵니다.
    socket.join(roomId);
    if (!chatRooms[roomId]) {
      chatRooms[roomId] = [];
    }
  });

  socket.on('send message', (messageData) => {
    console.log('Message received: ', messageData);
    // roomId를 이용하여 해당 채팅방으로 메시지를 보냅니다.
    io.to(messageData.room).emit('receive message', messageData);
    // 메시지를 채팅방에 저장합니다.
    chatRooms[messageData.room].push(messageData);
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