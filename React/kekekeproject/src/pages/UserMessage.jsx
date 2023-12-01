import React, { useState, useEffect } from 'react'
import '../css/UserMessage.css';
import Chatroom from '../component/Chatroom';
import axios from 'axios'; // axios 라이브러리 추가
import API_URL from '../api_url';

const UserMessage = () => {

  const [selectedChat, setSelectedChat] = useState(null);
  const [custId, setCustId] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [chatroomId, setChatroomId] = useState(null);
  const [prdId, setPrdId] = useState(null);
  const [chatStore, setChatStore] = useState([]);

 // 시작 시간과 종료 시간을 초까지 포함된 형식에서 시간만 표시하는 함수
 const formatTime = (timeString) => {
  if (timeString) {
    return timeString.split(":").slice(0, 2).join(":");
  }
  return ""; // timeString이 없을 때는 빈 문자열 반환
};


  useEffect(() => {
    const userStorageData = sessionStorage.getItem('userData');
    if (userStorageData) {
      const userData = JSON.parse(userStorageData);
      console.log('Message from Session Storage:', userData);
      setCustId(userData.cust_id)
    }
  }, []);


  useEffect(() => {
    console.log('동작', custId);
    // 클라이언트에서 보내는 요청
    const fetchData = async () => {
      try {
        if (custId) {
          const response = await axios.post(`${API_URL}/chatroom/userchatroom`, { custId: custId });
          const responseData = response.data;

          console.log('받아온 값', responseData);
          setChatStore(responseData)
        }
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };
    fetchData();
  }, [custId]);


  console.log('사용가능', chatStore);


  const handleChatItemClick = (chat) => {
    setSelectedChat({
      roomId: chat.CHAT_ROOM_ID,
      name: chat.STORE_NAME,
      availability: {
        start: chat.START_TIME,
        end: chat.END_TIME
      }
    });
  };

  const chatRoomHeaderData = selectedChat
    ? {
      name: selectedChat.name,
      availability: selectedChat.availability,
    }
    : null;

  return (
    <div className='frame'>

      <img className='message-title' alt="Menu name bar" src='../assets/images/menu-name-bar.png' />
      <div className='message-text'>메시지</div>
      <div className="chatContainer">
        <div className="chatSidebar">
          <div className="sidebarHeader">
            <h1 className="sidebarTitle">채팅방</h1>
            <p className="sidebarStatusMessage">영업시간 외에는 채팅이 어려울 수 있습니다</p>
          </div>

          <div className="sidebarChatList">
            {chatStore.map((chat) => (
              <div
                key={chat.CHAT_ROOM_ID}
                className="chatListItem"
                onClick={() => handleChatItemClick(chat)}
              >
                <img className="chatItemLogo" src={`img/seller/${chat.SELLER_PROFILE1}`} alt={chat.STORE_NAME} />
                <div className="chatItemDetails">
                  <h2 className="chatItemName">{chat.STORE_NAME}</h2>
                  {/* <p className="chatItemLastMessage">{chat.CHAT_MSG || "메시지가 없습니다."}</p> */}
                  <span className="chatItemDate">{new Date(chat.CREATED_ID).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour12: false, // 24시간 표시
  })}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
        <div className="chatMain">
          <div className="chatHeaderMain">
            <div className="chatMainTitle">
              {chatRoomHeaderData && (
                <>
                  <h2 className="chatRoomName">{chatRoomHeaderData.name}</h2>
                  <div className="chatRoomAvailability">
                    상담 가능 시간 {formatTime(chatRoomHeaderData.availability.start)} - {formatTime(chatRoomHeaderData.availability.end)}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="chatMessages">
            {selectedChat && (
              <>
                {/* 선택된 채팅의 메시지를 렌더링하는 로직을 추가하세요 */}
              </>
            )}
          </div>
          <div className="chatForm">
            <Chatroom
            //  roomId={buyerRoomId} 
            roomId={selectedChat ? selectedChat.roomId : null}
             sender="Buyer" />
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserMessage