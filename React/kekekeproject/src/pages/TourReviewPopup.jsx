import React, {useState} from 'react'
import "../css/TourReviewPopup.css";

const TourReviewPopup = () => {
      
    const [reviewData] = useState({
        id: 1,
        thumbnail: '/assets/images/cake1.jpg',
        status: '주문완료',
        orderDate: '2023.10.29',
        pickupDate: '2023.10.31',
        size: '도시락',
        flavor: '초콜릿',
        storeName: '주주케이크',
        productName: '곰돌이케이크',
        request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당',
        customerName: '홍길동',
        reviewContent: '사장님이 친절하구 어쩌구쩌쩌구저쩌구 저쩌구해요 곰돌이기여워 곰돌이 맛있어 케이크 맛있어 케이크 귀여워 케이크가 너무 맛있어요! 다음에도 또 주문할게요!',
        reviewDate: '2023.10.30'
     });

     // 리뷰 팝업을 위한 상태 추가
     const [showDetailReview, setShowDetailReview] = useState(false);
 
     // 리뷰 팝업을 표시하는 함수
     const handleShowDetailReview = () => {
         setShowDetailReview(true);
     };
 
     // 리뷰 팝업을 닫는 함수
     const handleCloseDetailReview = () => {
         setShowDetailReview(false);
    window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동

     };
 

    
     return (
            <div className="ToureRvPop">
                <button onClick={handleShowDetailReview}>리뷰 상세 보기</button>
                {showDetailReview && <DetailReviewPopup onClose={handleCloseDetailReview} reviewData={reviewData} />}
            </div>
    );
};

export default TourReviewPopup;

const DetailReviewPopup = ({ onClose, reviewData }) => {
    const [isOpen, setIsOpen] = React.useState(true);

      
    const handleClose = () => {
        setIsOpen(false);
        onClose();
    window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동

      };
  
    if (!isOpen) return null;
    window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동
      return (
        <div className="detail-review-popup-container">
        <div className="detail-review-popup">
            <div className="detail-review-header">
                <div className="detail-review-title">
                    <h3>{reviewData.productName}</h3>
                </div>
                <div className='detail-review-img'>
                <img src={reviewData.thumbnail} alt="케이크 이미지" className="detail-review-image" />
                </div>
                <div className="detail-review-userinfo">
                    <p>작성자: {reviewData.customerName}</p>
                    <p>작성일: {reviewData.reviewDate}</p>
                </div>
            </div>
            <div className="order-details">
                <p>가게 이름: {reviewData.storeName}</p>
                <p>케이크 크기: {reviewData.size}</p>
                <p>케이크 맛: {reviewData.flavor}</p>
                <p>요청사항: {reviewData.request}</p>
            </div>

            <div className='reviewtexttitle'>
            <p>리뷰 내용</p>
            </div>
            <div className="review-content">
                <p> {reviewData.reviewContent}</p>
            </div>
            <div className="review-close-button-container">
                <button className="review-close-button" onClick={onClose}>닫기</button>
            </div>
        </div>
    </div>
      );
    };