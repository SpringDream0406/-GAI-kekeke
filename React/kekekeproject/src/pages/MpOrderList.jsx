import React, { useEffect, useState } from 'react';
import '../css/MpOrderList.css';
import GlobalStyle from '../component/GlobalStyle'
import '../css/MpOrderListPopup.css'
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios'; // axios 라이브러리 추가
import API_URL from '../api_url';



const MpOrderList = () => {


  // 팝업 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [userOrders, setUserOrders] = useState([]); // userorders 상태 추가
  const userStorageData = sessionStorage.getItem('userData');
  const initialCustId = userStorageData ? JSON.parse(userStorageData).cust_id : '';

  const [custId, setCustId] = useState(initialCustId);

  const openPopup = (orderDetail) => {
    setSelectedOrderDetail(orderDetail); // 선택된 주문의 상세 정보를 상태에 설정
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setSelectedOrderDetail(null); // 팝업을 닫을 때 상세 정보 상태를 초기화
    setIsPopupOpen(false);
  };


    
    useEffect(()=>{
    const fetchData = async () => {
      try {
        if (custId) {
          const response = await axios.post(`${API_URL}/cust/orderlist`, {custId : custId});
          const responseData = response.data
          console.log('받아온 값 ' ,responseData);

           // 실제 주문 데이터를 추출하여 userOrders 상태에 설정
           if (responseData.userorders) {
            setUserOrders(responseData.userorders);
          }

        }
      } catch (error) {
          console.error('데이터 가져오기 실패:', error);
        }
      };
      fetchData();
    },[custId]);

    userOrders.sort((a, b) => {
      // 날짜를 Date 객체로 변환하여 비교
      const dateA = new Date(a.PICKUP_DATE);
      const dateB = new Date(b.PICKUP_DATE);
      
      // 오름차순 정렬
      return dateA - dateB;
    });



  // orders 상태에 기존 주문 데이터를 사용하여 초기화
  const [orders, setOrders] = useState(userOrders);

  const markOrderAsReviewed = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, isReviewed: true } : order
    );
    setOrders(updatedOrders); // 상태 업데이트
  };

  // 날짜를 받아서 "YYYY-MM-DD" 형식으로 변환하는 함수
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 맞춤
  const day = String(date.getDate()).padStart(2, '0'); // 일도 2자리로 맞춤
  return `${year}-${month}-${day}`;
}

    return (
      <div className="order-list-container">
        <GlobalStyle />
        <img className='message-title' alt="Menu name bar" src='../assets/images/menu-name-bar.png' />
        <div className='message-text'>주문 내역</div>
        <div className="order-card">
          {userOrders.map(order => (
            <div key={order.PRD_ID} className="order-item">
              <img src={`/img/product/${order.IMG_NAME2}`} alt="Cake" className="order-thumbnail" />
              <div className="order-content">
                
                <div className="order-date-status">
                  <h2 className="pickup-date">{formatDate(order.PICKUP_DATE)}</h2>
                  <div className="order-status">{`${order.CONS_OR_OC} | ${formatDate(order.SALE_DY)}`}</div>
                </div>
                <div className="order-description">
                  <p className="cake-size-flavor">{`케이크 사이즈: ${order.CAKE_SIZE} | 케이크 맛: ${order.CAKE_FLAVOR}`}</p>
                  <p className="store-name">{`${order.STORE_NAME}: ${order.CAKE_NAME}`}</p>
                </div>
                {!order.isReviewed && (
              <div className="review-button-container">
                <button onClick={() => openPopup(order)} className="review-button">리뷰쓰기</button>
              </div>
            )}
              </div>
            </div>

        ))}

        {/* 팝업 상태에 따라 팝업 렌더링 */}
        {isPopupOpen && selectedOrderDetail && (
        <ReviewPopup
          orderDetail={selectedOrderDetail}
          onClose={closePopup}
          markOrderAsReviewed={markOrderAsReviewed} // 함수를 props로 전달
        />
      )}
      </div>
    </div>
  );
};

export default MpOrderList;



// ****** 팝업 컴포넌트

const ReviewPopup = ({ onClose, orderDetail, markOrderAsReviewed }) => {
  const [isOpen] = React.useState(true);
  const [reviewContent, setReviewContent] = useState('');
  const [image, setImage] = useState(null);

  const handleReviewSubmit = () => {
    // 리뷰 등록 로직을 여기에 추가
    console.log('리뷰 내용:', reviewContent);

    // 리뷰 등록 후 알림 창 표시
    alert('리뷰가 등록되었습니다.');

    // 리뷰 등록 후 해당 주문의 isReviewed 상태를 true로 변경
    markOrderAsReviewed(orderDetail.id); // 부모 컴포넌트에 정의된 함수를 호출

    // 리뷰 등록 후 팝업 닫기
    onClose();

    window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동

  };

  const handleClose = () => {
    onClose(); // 부모 컴포넌트에서 받은 onClose 함수를 호출하여 팝업을 닫습니다.

    window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동
  };


  if (!isOpen) return null;

  // 사진 첨부 기능

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="review-popup-container">
      <div className="review-popup">
        <div className="review-header">
          {/* <div className="image-placeholder"> */}
          <div className="MpOrderListPhoto">
            {image ? (
              <img src={image} alt="리뷰 사진" className="mpuploaded-image" />
            ) : (
              <label htmlFor="image-upload" className="mpupload-label">
                <AiOutlineCamera className="mpcamera-icon" />
                <span>이미지 업로드</span>
              </label>
            )}
            <input
              type="file"
              id="image-upload"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            {/* </div> */}

          </div>
          <div className="details-and-review-container">
            <div className="review-details">
              <div className="review-detail-item">
                <span className="review-detail-title">주문 상세 내역</span>
                <div className="review-detail-info">
                  <p>케이크 크기: {orderDetail.size}</p>
                  <p>케이크 맛: {orderDetail.flavor}</p>
                  <p>케이크 요청사항: {orderDetail.request}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="review-text-input">
  <textarea
    placeholder="리뷰 내용 작성 (200자 이내)"
    value={reviewContent}
    onChange={(e) => setReviewContent(e.target.value)}
    maxLength={200}
  />
</div>
<span className="input-guide">{`${reviewContent.length}/200자`}</span>
        </div>
        <div className="review-submit">
          <button className="submit-button" onClick={handleReviewSubmit}>등록하기</button>
          <button className="close-button" onClick={handleClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};
