import React, { useState, useEffect } from "react";
import "../css/TourDet3.css";
import TourDetContainer from '../component/TourDetContainer'
import AdPagebtn from '../ad_component/AdPagebtn';
import "../css/TourReviewPopup.css";
import axios from 'axios';
import API_URL from '../api_url';
import { useLocation } from 'react-router-dom';


export const TourDet3 = () => {
  const [storeInfo, setStoreInfo] = useState({
    StoreAddr1: "",
    // 다른 필드들에 대한 초기값도 추가할 수 있음
  });
  const [reviewData, setReviewData] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const prd_id = searchParams.get('prd_id');


  // 리뷰작성날짜 포맷팅
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  
  // 가게정보조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (prd_id) {
          const response = await axios.post(`${API_URL}/sample/samplecake`, { prd_id });
          const responseData = response.data;

          // 상태 업데이트
          setStoreInfo({
            CakeLogo: responseData.productInfo.SELLER_PROFILE1, //가게 로고
            StoreName: responseData.productInfo.STORE_NAME,   // 상호명
            StoreAddr1: responseData.productInfo.SHOP_ADDR1,  // 주소1
            StoreDetail: responseData.productInfo.STORE_DETAIL ,// 가게소개
            
          });
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [prd_id]);

  // 리뷰
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (prd_id) {
          const response = await axios.post(`${API_URL}/sample/review`, { prd_id });
          if (response.data && response.data.sellerReviews) {
            setReviewData(response.data.sellerReviews);

            console.log("f리뷰데이터",reviewData[0]);
          } else {
            console.error('Seller reviews are missing in the response');
          }
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
  
    fetchReviews();
  }, [prd_id]);

  
  // 리뷰 내용
  
    const handleReviewClick = (review) => {
      setSelectedReview({
        id: review.DEAL_ID,
        thumbnail: `/img/product/${review.IMG_NAME2}`,
        productName: review.CAKE_NAME,
        customerName: review.NICK_NAME,
        reviewDate: formatDate(review.CREATED_AT),
        size: review.CAKE_SIZE,
        flavor: review.CAKE_FLAVOR,
        reviewContent: review.REVIEW_MSG,
        request: review.ADD_REQUIRE, // 요청사항 설정
      });
      setShowDetailReview(true);
    };

    
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 한 페이지에 표시할 아이템 수
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviewData.slice(indexOfFirstItem, indexOfLastItem);


  const reviewpageNum = [];
  for (let i = 1; i <= Math.ceil(reviewData.length / itemsPerPage); i++) {
    reviewpageNum.push(i);
  }

  // 1:1 채팅 클릭시 새로운 팝업등장
  

  /*이전페이지로 가는 로직 */

  const goToPrervPage = () => {
    setCurrentPage(prev => prev > 1 ? prev - 1 : 1);

    window.scrollTo(0, 100); // 화면 상단으로 스크롤 이동
  };

  /*다음페이지로 가는 로직 */


    const goToNextrvPage = () => {
      setCurrentPage(prev => prev < reviewpageNum.length ? prev + 1 : reviewpageNum.length);

      window.scrollTo(0, 100); // 화면 상단으로 스크롤 이동
    };
  

     // 리뷰 팝업을 위한 상태 추가
     const [showDetailReview, setShowDetailReview] = useState(false);
 
     // 리뷰 팝업을 표시하는 함수
     const handleShowDetailReview = () => {
         setShowDetailReview(true);
     };
 
     // 리뷰 팝업을 닫는 함수
     const handleCloseDetailReview = () => {
         setShowDetailReview(false);
     };
     useEffect(() => {
      console.log("현재 리뷰 데이터:11", reviewData);
    }, [reviewData]);
 
    window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동

  return (
    <div>

      <TourDetContainer initialActiveTab="tour-det3" storeInfo = {storeInfo}>

        <div className="review-section">
          <div className="review-list">
          {currentItems.map((review) => (
            <div key={review.DEAL_ID} className="review-item" onClick={() => handleReviewClick(review)}>
                <img
                  className="review-image"
                  alt={`Review ${review.DEAL_ID}`}
                  src={`/img/product/${review.IMG_NAME2}`}
                />
                <div className="tour-review-content">
                <div className="tour-review-header">
                    <p className="tour-review-date">{formatDate(review.CREATED_AT)}</p>
                    <p className="tour-review-customer">{review.NICK_NAME} 님</p>
                  </div>
                  <div  className="tour-review-header2">
                  <h3 className="tour-review-cake-name">{review.CAKE_NAME}</h3>
                  <p className="tour-review-details">{`호수: ${review.CAKE_SIZE} 맛: ${review.CAKE_FLAVOR}`}</p>
                  <p className="tour-review-message">{review.REVIEW_MSG}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <AdPagebtn type="prev" onClick={goToPrervPage} />

            {/* 페이지 번호들 렌더링 */}
            {reviewpageNum.map(num => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`page-number ${currentPage === num ? 'active' : ''}`}
              >
                {num}
              </button>
            ))}

            <AdPagebtn type="next" onClick={goToNextrvPage} />
          </div>
        </div>
      </TourDetContainer>

      {showDetailReview && <DetailReviewPopup onClose={handleCloseDetailReview} reviewData={selectedReview} />}
    </div>

  );
};


export default TourDet3;

const DetailReviewPopup = ({ onClose, reviewData }) => {
  const [isOpen, setIsOpen] = React.useState(true);

    
  const handleClose = () => {
      setIsOpen(false);
      onClose();
    };

  if (!isOpen) return null;

    return (
      <div className='frame'>
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
  </div>
    );
  };

  