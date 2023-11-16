import React, {useState} from 'react'
import '../css/UserMessage.css';
import Chatroom from '../component/Chatroom';

const UserMessage = () => {
  const roomId = 'userChatRoom'; // 고유한 roomId를 설정합니다.

  const [chatData, setChatData] = useState([
    {
      id: 1,
      logoSrc: "/assets/images/cakelogo1.jpg",
      name: "케케케",
      lastMessage: "감사합니다~",
      date: "10.26",
      availability: { start: '10:00', end: '19:00' },
    },
    {
        id: 2,
        logoSrc: "/assets/images/cakelogo2.jpg",
        name: "포포는푸푸야",
        lastMessage: "픽업 때 뵐게요! 잘 부탁드립니다",
        date: "10.24",
        availability: { start: '09:00', end: '18:00' },
      },
      {
        id: 3,
        logoSrc: "/assets/images/cakelogo3.jpg",
        name: "모도리 케이크",
        lastMessage: "케이크맛없으면환불되나요?",
        date: "10.20",
        availability: { start: '11:00', end: '20:00' },
      },
  ]);

  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatItemClick = (chat) => {
    setSelectedChat(chat);
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
            {chatData.map((chat) => (
              <div
                key={chat.id}
                className="chatListItem"
                onClick={() => handleChatItemClick(chat)}
              >
                <img className="chatItemLogo" src={chat.logoSrc} alt={chat.name} />
                <div className="chatItemDetails">
                  <h2 className="chatItemName">{chat.name}</h2>
                  <p className="chatItemLastMessage">{chat.lastMessage}</p>
                  <span className="chatItemDate">{chat.date}</span>
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
                    상담 가능 시간 {chatRoomHeaderData.availability.start} - {chatRoomHeaderData.availability.end}
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
        <Chatroom roomId={roomId} sender="user"/>
        </div>
      </div>
    </div>
    </div>
  );
};


export default UserMessage