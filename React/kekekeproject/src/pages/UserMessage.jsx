import React, {useState , useEffect} from 'react'
import '../css/UserMessage.css';
import Chatroom from '../component/Chatroom';
import axios from 'axios'; // axios 라이브러리 추가
import API_URL from '../api_url';

const UserMessage = () => {
  const buyerRoomId = 'buyerRoom';
  const chatData = [
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
  ];

  const [selectedChat, setSelectedChat] = useState(null);
  const [custId , setCustId] = useState(null);
  const [chatId , setChatId] = useState(null);
  const [chatroomId, setChatroomId] = useState(null);
  const [prdId, setPrdId] = useState(null);

  useEffect(() => {
    const userStorageData = sessionStorage.getItem('userData');
    if (userStorageData) {
      const userData = JSON.parse(userStorageData);
      console.log('Message from Session Storage:', userData);
      setCustId(userData.cust_id)
    }
  }, []);


useEffect(()=>{
  console.log('동작',custId);
// 클라이언트에서 보내는 요청
const fetchData = async () => {
  try {
    if (custId) {
      const response = await axios.post(`${API_URL}/chatroom/chatroom`, { custId: custId });
      const responseData = response.data;

      console.log('받아온 값', responseData);
    }
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
  }
};
fetchData();
    },[custId]);





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
        <Chatroom roomId={buyerRoomId} sender="Buyer" />
        </div>
      </div>
    </div>
    </div>
  );
};


export default UserMessage