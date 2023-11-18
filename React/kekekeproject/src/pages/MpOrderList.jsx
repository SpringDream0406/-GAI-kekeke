import React, { useState } from 'react';
import '../css/MpOrderList.css';
import GlobalStyle from '../component/GlobalStyle'
import '../css/MpOrderListPopup.css'
import { AiOutlineCamera } from 'react-icons/ai';

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
    productName: '곰돌이케이크',
    request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당'

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
    productName: '로또케이크',
    request: '맛있게 해주세용용구리'
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
    productName: '산타케이크',
    request: '이 로또 번호 진짜 당첨되면 사장님 나눠드릴게요'
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
    productName: '곰돌이케이크',
    request: '곰돌이 귀때기 크게 해주세요'
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
    productName: '로또케이크',
    request: '오레오크림 무슨 오레오 쓰시나요?'

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
    productName: '산타케이크',
    request: '곰돌아멜이크리쓰마스'
  }

  // ... 더 많은 주문 데이터 ...
];

const MpOrderList = () => {

  // 팝업 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

  const openPopup = (orderDetail) => {
    setSelectedOrderDetail(orderDetail); // 선택된 주문의 상세 정보를 상태에 설정
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setSelectedOrderDetail(null); // 팝업을 닫을 때 상세 정보 상태를 초기화
    setIsPopupOpen(false);
  };

  return (
    <div className="order-list-container">
      <GlobalStyle />
      <img className='message-title' alt="Menu name bar" src='../assets/images/menu-name-bar.png' />
      <div className='message-text'>주문 내역</div>
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
                <button onClick={() => openPopup(order)} className="review-button">리뷰쓰기</button>
              </div>
            </div>
          </div>

        ))}

        {/* 팝업 상태에 따라 팝업 렌더링 */}
        {isPopupOpen && selectedOrderDetail && (
          <ReviewPopup orderDetail={selectedOrderDetail} onClose={closePopup} />
        )}
      </div>
    </div>
  );
};

export default MpOrderList;



// ****** 팝업 컴포넌트

const ReviewPopup = ({ onClose, orderDetail }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [reviewContent, setReviewContent] = useState('');
  const [image, setImage] = useState(null);

  const handleReviewSubmit = () => {
    // 리뷰 등록 로직을 여기에 추가
    console.log('리뷰 내용:', reviewContent);

    // 리뷰 등록 후 알림 창 표시
    alert('리뷰가 등록되었습니다.');

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
