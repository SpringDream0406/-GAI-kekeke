import React, { useState } from 'react';
import '../css/MpOrderList.css';
import GlobalStyle from '../component/GlobalStyle'
import '../css/MpOrderListPopup.css'

// 예시 주문 데이터
const orders = [
  {
    id: 1,
    thumbnail: '/assets/images/cake1.jpg',
    status: '주문완료',
    orderDate: '2023.10.29',
    pickupDate: '2023.10.31',
    size: '도시락',
    flavor: '초콜릿',
    storeName: '주주케이크',
    productName: '곰돌이케이크'
  },
  {
    id: 2,
    thumbnail: '/assets/images/cake2.png',
    status: '주문대기',
    orderDate: '2023.11.05',
    pickupDate: '2023.11.07',
    size: '2호',
    flavor: '바닐라',
    storeName: '스위트케이크',
    productName: '로또케이크'
    
  },
  {
    id: 3,
    thumbnail: '/assets/images/cake3.jpg',
    status: '주문대기',
    orderDate: '2023.11.05',
    pickupDate: '2023.11.07',
    size: '2호',
    flavor: '바닐라',
    storeName: '파스텔케이크',
    productName: '산타케이크'
  },
  {
    id: 4,
    thumbnail: '/assets/images/cake1.jpg',
    status: '주문완료',
    orderDate: '2023.10.29',
    pickupDate: '2023.10.31',
    size: '도시락',
    flavor: '초콜릿',
    storeName: '주주케이크',
    productName: '곰돌이케이크'
  },
  {
    id: 5,
    thumbnail: '/assets/images/cake2.png',
    status: '주문대기',
    orderDate: '2023.11.05',
    pickupDate: '2023.11.07',
    size: '2호',
    flavor: '바닐라',
    storeName: '스위트케이크',
    productName: '로또케이크'
    
  },
  {
    id: 6,
    thumbnail: '/assets/images/cake3.jpg',
    status: '주문대기',
    orderDate: '2023.11.05',
    pickupDate: '2023.11.07',
    size: '2호',
    flavor: '바닐라',
    storeName: '파스텔케이크',
    productName: '산타케이크'
  }
  
  // ... 더 많은 주문 데이터 ...
];

// 팝업 컴포넌트
const ReviewPopup = ({onClose}) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const handleReviewSubmit = () => {
      // 리뷰 등록 로직
    };
    
 const handleClose = () => {
    onClose(); // 부모 컴포넌트에서 받은 onClose 함수를 호출하여 팝업을 닫습니다.
  };

  
    if (!isOpen) return null;
  
    return (
      <div className="review-popup-container">
        <div className="review-popup">
          <div className="review-header">
            <div className="image-placeholder"></div>
            <div className="details-and-review-container">
            <div className="review-details">
              <div className="review-detail-item">
                <span className="review-detail-title">주문 상세 내역</span>
                <div className="review-detail-info">
                  <p>케이크 크기: 1호</p>
                  <p>케이크 맛: 바닐라</p>
                  <p>케이크 요청사항: 맛있어져라 얍!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="review-text-input">
            <textarea placeholder="리뷰 내용 작성"></textarea></div>
            <span className="input-guide">100자 이내로 작성해주세요.</span>
          </div>
          <div className="review-submit">
            <button className="submit-button" onClick={handleReviewSubmit}>등록하기</button>
            <button className="close-button" onClick={handleClose}>닫기</button>
          </div>
        </div>
      </div>
    );
  };

  
const MpOrderList = () => {

  // 팝업 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  
  return (
    <div className="order-list-container">
     <GlobalStyle/>

      <div className="order-card">
        {orders.map(order => (
          <div key={order.id} className="order-item">
            <img src={order.thumbnail} alt="Cake" className="order-thumbnail" />
            <div className="order-content">
              <div className="order-date-status">
                <h2 className="pickup-date">{order.pickupDate}</h2>
                <div className="order-status">{`${order.status} | ${order.orderDate}`}</div>
              </div>
              <div className="order-description">
                <p className="cake-size-flavor">{`케이크 사이즈: ${order.size} | 케이크 맛: ${order.flavor}`}</p>
                <p className="store-name">{`${order.storeName}: ${order.productName}`}</p>
              </div>
              <div className="review-button-container">
            <button onClick={openPopup} className="review-button">리뷰쓰기</button>
          </div>
            </div>
          </div>
          
        ))}

         {/* 팝업 상태에 따라 팝업 렌더링 */}
      {isPopupOpen && <ReviewPopup onClose={closePopup} />}
      </div>
    </div>
  );
};

export default MpOrderList;
