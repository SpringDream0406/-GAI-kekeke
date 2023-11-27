import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../css/Chatroom.css';

// 소켓 연결을 컴포넌트 외부에서 한 번만 생성합니다.
const socket = io('http://localhost:4000', { transports: ['websocket'] });


const Chatroom = ({ roomId, sender, adminStyle }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 'join room' 이벤트를 서버로 보내어 현재 채팅방에 참여합니다.
    socket.emit('join room', roomId);

    // 'receive message' 이벤트에 대한 리스너를 설정합니다.
    const receiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    socket.on('receive message', receiveMessage);

    // 컴포넌트가 언마운트될 때 실행될 클린업 함수입니다.
    return () => {
      // 'leave room' 이벤트를 서버로 보내어 채팅방에서 나갑니다.
      socket.emit('leave room', roomId);
      // 'receive message' 이벤트에 대한 리스너를 제거합니다.
      socket.off('receive message', receiveMessage);
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        room: roomId,
        text: message,
        sender: sender,
        timestamp: new Date().toISOString()
      };
      // 서버로 메시지를 보내고 로컬 상태에는 추가하지 않습니다.
      socket.emit('send message', messageData);
      setMessage(''); // 메시지 전송 후 입력 필드를 초기화합니다.
    }
  };

  return (
    <div className="chat-room">
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === sender ? 'my-message' : 'other-message'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          className="input-field"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력해 주세요"
          onKeyPress={(event) => event.key === 'Enter' && sendMessage()}
        />
        <button
          className={`send-button ${adminStyle ? 'admin-send-button' : ''}`}
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default Chatroom;
