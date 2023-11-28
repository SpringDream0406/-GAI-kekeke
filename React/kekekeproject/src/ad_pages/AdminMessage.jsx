import React, { useState , useEffect } from 'react'
import '../ad_css/AdminMessage.css';
import Chatroom from '../component/Chatroom';
import AdMenubar from '../component/AdMenubar';
import AdHeader from '../component/AdHeader';
import axios from 'axios'; // axios 라이브러리 추가
import API_URL from '../api_url';


// 임시 유저 데이터 목록
const initialUserData = [
  {
    id: 1,
    logoSrc: "/assets/images/userProfile1.jpg",
    name: "워녕",
    lastMessage: "주문한 케이크 상태 어떤가요? 사진 미리 볼 수 있을까요?",
    date: "11.16",
    status: "상담 중",
  },
  {
    id: 2,
    logoSrc: "/assets/images/userProfile2.jpg",
    name: "고먀미",
    lastMessage: "픽업 때 뵐게요!픽업 때 뵐게요!픽업 때 뵐게요!픽업 때 뵐게요!픽업 때 뵐게요! ",
    date: "11.14",
    status: "주문 완료",
  },
  {
    id: 3,
    logoSrc: "/assets/images/userProfile3.png",
    name: "시나모롤",
    lastMessage: "픽업 시간 변경 가능한가요?픽업 시간 변경 가능한가요?픽업 시간 변경 가능한가요?픽업 시간 변경 가능한가요?",
    date: "11.12",
    status: "상담 중",
  },
  {
    id: 4,
    logoSrc: "/assets/images/userProfile1.jpg",
    name: "워녕2",
    lastMessage: "케이크 너무 예뻐요 감사해요~~~",
    date: "11.2",
    status: "주문 완료",
  },
  {
    id: 5,
    logoSrc: "/assets/images/userProfile2.jpg",
    name: "고먀미2",
    lastMessage: "감사합니다",
    date: "11.1",
    status: "주문 완료",
  },
  {
    id: 6,
    logoSrc: "/assets/images/userProfile3.png",
    name: "시나모롤2",
    lastMessage: "아 케이크 넘 기대돼요 잘 부탁드려요",
    date: "11.1",
    status: "주문 완료",
  },  {
    id: 7,
    logoSrc: "/assets/images/userProfile3.png",
    name: "시나모롤3",
    lastMessage: "아 케이크 넘 기대돼요 잘 부탁드려요",
    date: "11.1",
    status: "주문 완료",
  },
];

const AdminMessage = () => {
  const roomId = 'adminChatRoom'; // 고유한 roomId를 설정합니다.

  const [userData, setUserData] = useState(initialUserData);
  // 서브바의 현재 선택된 탭 상태
  const [activeTab, setActiveTab] = useState('N'); // 초기 탭 설정
  const [sellerinfo, setSellerInfo] = useState({});
  const [sellerId, setSellerId] = useState();
  const [sellerChat, setSellerChat] = useState([]);

// 세션 스토리지에서 데이터 불러오기
useEffect(() => {
  const adminStorageData = sessionStorage.getItem('adminData');
  if (adminStorageData) {
    const adminData = JSON.parse(adminStorageData);
    setSellerInfo(adminData);
    setSellerId(adminData.seller_id)
  }
}, []);


useEffect(() => {
  console.log('동작', sellerId);
  // 클라이언트에서 보내는 요청
  const fetchData = async () => {
    try {
      if (sellerId) {
        const response = await axios.post(`${API_URL}/chatroom/sellerchatroom`, { sellerId: sellerId });
        const responseData = response.data;

        console.log('받아온 값', responseData.CHAT_ROOM_ID);
        setSellerChat(responseData);
      }
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };
  fetchData();
}, [sellerId]);

console.log('변환값' , sellerChat);


  // 채팅 리스트
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatItemClick = (chat) => {
    setSelectedChat(chat);
  };

  // 구매 확정 버튼 팝업

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handlePurchaseConfirm = () => {
    setShowConfirmPopup(true);
  };

  const handleConfirmYes = () => {
    setShowConfirmPopup(false);
   
     // 선택된 채팅방이 있고, 그 상태가 '상담 중'일 경우에만 처리
  if (selectedChat && selectedChat.status === '상담 중') {
    // 선택된 채팅방의 상태를 '주문 완료'로 업데이트
    setUserData(userData.map(chat =>
      chat.id === selectedChat.id ? { ...chat, status: '주문 완료' } : chat
    ));

    // 선택된 채팅방 해제
    setSelectedChat(null);
  }
  };

  const handleConfirmNo = () => {
    setShowConfirmPopup(false);
  };

  // 서브바

  // 탭 변경 핸들러
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  // 탭에 따라 채팅방 목록을 필터링하는 함수
  const getFilteredChats = () => {
    return sellerChat.filter(chat => chat.CONS_OR_OC === activeTab);
  };



  return (
    
    <div>

      <AdMenubar/>
      <AdHeader />

      <div className='adminmessage-container'>
      <div className="adminchatContainer">
        <div className="adminchatSidebar">
          <div className="adminsidebarHeader">
            <h1 className="adminsidebarTitle">채팅방</h1>

            {/* 서브바 추가 */}
            <div className="adminSubBar">
              <button
                className={`adminSubBarButton ${activeTab === 'N' ? 'active' : ''}`}
                onClick={() => setActiveTab('N')}>
                상담 중
              </button>
              <button
                className={`adminSubBarButton ${activeTab === '주문 완료' ? 'active' : ''}`}
                onClick={() => setActiveTab('주문 완료')}>
                주문 완료
              </button>
            </div>


          </div>
          <div className="adminsidebarChatList">
            {getFilteredChats().map((chat) => (

              <div key={chat.CHAT_ROOM_ID} className="adminchatListItem" onClick={() => handleChatItemClick(chat)}>

                <div className="adminChatItemLogoContainer">
                  <img className="adminChatItemLogo" src={`/img/cust/${chat.PROFILE_IMG}`} alt={`이미지없음`} />
                </div>
                <div className="adminchatItemDetails">
                  <h2 className="adminchatItemName">{chat.NICK_NAME}</h2>
                  <p className="adminchatItemLastMessage">{chat.lastMessage}</p>
                  <span className="adminchatItemDate">{chat.CREATED_ID}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="adminchatMain">
          <div className="adminchatHeaderMain">
            <div className="adminchatRoomNameContainer">
              {selectedChat ? (
                <h2 className="adminchatRoomName">{selectedChat.NICK_NAME}</h2>
              ) : (
                <div></div> // 채팅방이 선택되지 않았을 때의 빈 요소
              )}
            </div>
            {selectedChat && selectedChat.status !== '주문 완료' && (
          <button className="adminPurchaseConfirmButton" onClick={handlePurchaseConfirm}>
            구매 확정
          </button>
        )}
          </div>
          <div className="adminchatMessages">
            {/* ... 메시지 내용 ... */}
          </div>

          <div className="adminchatForm">
            <Chatroom roomId={roomId} sender="admin" adminStyle={true} />
          </div>
        </div>

        {showConfirmPopup && (
          <div className="adminConfirmPopup">
            <p>구매를 확정하시겠습니까?</p>
            <div className="adminConfirmButtons">
              <button onClick={handleConfirmYes}>네</button>
              <button onClick={handleConfirmNo}>아니오</button>
            </div>
          </div>
        )}

      </div>
    </div>
    </div>
  )
}

export default AdminMessage