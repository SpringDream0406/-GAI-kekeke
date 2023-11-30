import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import '../css/Chatroom.css';
import axios from 'axios'; // axios 라이브러리 추가
import API_URL from '../api_url';

// 소켓 연결을 컴포넌트 외부에서 한 번만 생성합니다.
const socket = io('http://localhost:4000', { transports: ['websocket'] });

const Chatroom = ({ roomId, sender, adminStyle }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(true); // 스크롤이 가장 아래에 있는지 여부를 저장

  // 메시지 리스트의 DOM 참조를 위한 ref 생성
  const messageListRef = useRef(null);

  useEffect(() => {
    // 'join room' 이벤트를 서버로 보내어 현재 채팅방에 참여합니다.
    socket.emit('join room', roomId);

    // 'receive message' 이벤트에 대한 리스너를 설정합니다.
    const receiveMessage = (message) => {
      // 새 메시지를 받았을 때만 메시지를 업데이트합니다.
      setMessages((prevMessages) => [...prevMessages, message]);

      // 사용자가 스크롤을 맨 아래에 있는 경우에만 자동 스크롤을 유지합니다.
      if (isAtBottom) {
        scrollToBottom();
      }
    };
    socket.on('receive message', receiveMessage);
    // 컴포넌트가 언마운트될 때 실행될 클린업 함수입니다.
    return () => {
      // 'leave room' 이벤트를 서버로 보내어 채팅방에서 나갑니다.
      socket.emit('leave room', roomId);
      // 'receive message' 이벤트에 대한 리스너를 제거합니다.
      socket.off('receive message', receiveMessage);
    };
  }, [roomId, isAtBottom]);

  // 클라이언트에서 서버로 채팅 데이터를 요청하는 함수
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        // 서버에 GET 요청을 보냅니다.
        const response = await axios.get(`${API_URL}/chatroom/getChat`);
      
        // 응답 데이터는 response.data에 있습니다.
        const chatData = response.data;
        setMessages(chatData);
// 사용자가 스크롤을 이전 메시지까지 올리지 않았을 때만 자동 스크롤을 유지합니다.
if (isAtBottom) {
  scrollToBottom();
}
      } catch (error) {
        console.error('채팅 데이터 불러오기 오류:', error);
      }
    };
    fetchChatData();
  }, [messages]);


  // 메시지 목록이 업데이트될 때마다 스크롤 위치를 조정하는 useEffect
  useEffect(() => {
    const messageList = messageListRef.current;

    // 스크롤 이벤트 핸들러를 추가하여 스크롤 위치를 감지합니다.
    const handleScroll = () => {
      // 스크롤이 가장 아래에 있는지 여부를 확인합니다.
      setIsAtBottom(
        messageList.scrollHeight - messageList.clientHeight <= messageList.scrollTop + 1
      );
    };

    messageList.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 핸들러를 제거합니다.
    return () => {
      messageList.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      const { scrollHeight, clientHeight } = messageListRef.current;
      messageListRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  const sendMessage = async () => {
    if (message.trim()) {
      const messageData = {
        send_Id: sender,
        chat_Msg: message,
        created_At: new Date().toISOString().slice(0, 19).replace('T', ' '), // 문자열로 변환
        chat_Room_Id: roomId,
      };
  
      try {
        // axios를 사용하여 서버로 POST 요청을 보냅니다.
        await axios.post(`${API_URL}/chatroom/saveChat`, messageData);
  
        // 서버에 메시지를 전송한 후 클라이언트의 메시지 목록에 추가합니다.
        setMessages((prevMessages) => [...prevMessages, messageData]);
  
        // 메시지 전송 후 입력 필드를 초기화합니다.
        setMessage('');
      } catch (error) {
        console.error('메시지 전송 오류:', error);
      }
    }
  };

  return (
    <div className="chat-room">
     <div className="message-list" ref={messageListRef}>
  {messages.map((msg, index) => {
    // roomId와 msg.CHAT_ROOM_ID가 같을 때만 메시지를 보여줍니다.
    if (roomId === msg.CHAT_ROOM_ID) {
      return (
        <div
          key={index}
          className={`message ${msg.SEND_ID === sender ? 'my-message' : 'other-message'}`}
        >
          {msg.CHAT_MSG}
        </div>
      );
    }
    // roomId와 msg.CHAT_ROOM_ID가 다를 경우 null을 반환하여 아무것도 보여주지 않습니다.
    return null;
  })}
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
