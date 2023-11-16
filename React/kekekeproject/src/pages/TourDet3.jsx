import React, { useState } from "react";
import "../css/TourDet3.css";
import TourDetContainer from '../component/TourDetContainer'
import PageButton from "../component/PageButton";
import "../css/TourReviewPopup.css";

export const TourDet3 = () => {

  
  // 리뷰 내용
  const Reviews = [
    {
      DEAL_ID: 1,
      IMG_NAME: "/assets/images/cake1.jpg",
      CAKE_NAME: '티아라케이크',
      CREATED_AT: '2023-11-15',
      CUST_NICK: '김은호',
      CAKE_SIZE: '1호',
      CAKE_FLAVOR: '바닐라',
      REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜',
      storeName: '랑랑케이크',
      request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당',


    },
    {
      DEAL_ID: 2,
      IMG_NAME: '/assets/images/cake3.jpg',
      CAKE_NAME: '곰도리',
      CREATED_AT: '2023-11-14',
      CUST_NICK: '서유정',
      CAKE_SIZE: '도시락',
      CAKE_FLAVOR: '쿠키앤크림',
      REVIEW_MSG: '아짜증나너무맛잇어요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증아짜증나너무맛잇어요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증아짜증나너무맛잇어요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증',
      storeName: '랑랑케이크',
      request: '초코너뭄달아서못먹어요 덜달게해줘요 제발요 제발 덜달게 너무 달아',


    },
    {
      DEAL_ID: 3,
      IMG_NAME: '/assets/images/cakelogo3.jpg',
      CAKE_NAME: '티아라케이크',
      CREATED_AT: '2023-11-15',
      CUST_NICK: '김은호',
      CAKE_SIZE: '2호',
      CAKE_FLAVOR: '초콜릿',
      REVIEW_MSG: '아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다아마싯다',
      storeName: '랑랑케이크',
      request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당',


    },
    {
      DEAL_ID: 4,
      IMG_NAME: '/assets/images/cakelogo2.jpg',
      CAKE_NAME: '티아라케이크',
      CREATED_AT: '2023-11-15',
      CUST_NICK: '김은호',
      CAKE_SIZE: '1',
      CAKE_FLAVOR: '바닐라',
      REVIEW_MSG: '사장님이 친절하구 어쩌구쩌쩌구저쩌구 저쩌구해요 곰돌이기여워 곰돌이 맛있어 케이크 맛있어 케이크 귀여워 케이크가 너무 맛있어요! 다음에도 또 주문할게요!',
      storeName: '랑랑케이크',
      request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당',


    }, {
      DEAL_ID: 5,
      IMG_NAME: "/assets/images/cake1.jpg",
      CAKE_NAME: '티아라케이크',
      CREATED_AT: '2023-11-15',
      CUST_NICK: '김은호',
      CAKE_SIZE: '1',
      CAKE_FLAVOR: '바닐라',
      REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜',
      storeName: '랑랑케이크',
      request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당',


    },
    {
      DEAL_ID: 6,
      IMG_NAME: '/assets/images/cake3.jpg',
      CAKE_NAME: '곰도리',
      CREATED_AT: '2023-11-14',
      CUST_NICK: '서유정',
      CAKE_SIZE: '도시락',
      CAKE_FLAVOR: '쿠키앤크림',
      REVIEW_MSG: '아짜증나너무맛잇어요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증',
      storeName: '랑랑케이크',
      request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당',


    },
    {
      DEAL_ID: 7,
      IMG_NAME: '/assets/images/cakelogo3.jpg',
      CAKE_NAME: '티아라케이크',
      CREATED_AT: '2023-11-15',
      CUST_NICK: '김은호',
      CAKE_SIZE: '1',
      CAKE_FLAVOR: '바닐라',
      REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜',
      storeName: '랑랑케이크',
      request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당',


    }, {
      DEAL_ID: 8,
      IMG_NAME: "/assets/images/cake1.jpg",
      CAKE_NAME: '티아라케이크',
      CREATED_AT: '2023-11-15',
      CUST_NICK: '김은호',
      CAKE_SIZE: '1',
      CAKE_FLAVOR: '바닐라',
      REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜',
      storeName: '랑랑케이크',
      request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당',


    },
    {
      DEAL_ID: 9,
      IMG_NAME: '/assets/images/cake3.jpg',
      CAKE_NAME: '곰도리',
      CREATED_AT: '2023-11-14',
      CUST_NICK: '서유정',
      CAKE_SIZE: '도시락',
      CAKE_FLAVOR: '쿠키앤크림',
      REVIEW_MSG: '아짜증나너무맛잇어요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증',
      storeName: '랑랑케이크',
      request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당',


    },
    {

      DEAL_ID: 10,
      IMG_NAME: '/assets/images/cakelogo3.jpg',
      CAKE_NAME: '티아라케이크',
      CREATED_AT: '2023-11-15',
      CUST_NICK: '김은호',
      CAKE_SIZE: '1',
      CAKE_FLAVOR: '바닐라',
      REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜',
      request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당',
      storeName: '랑랑케이크',
      request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당',

    },
  ];

    // 리뷰 팝업 임시 데이터

    const [reviewData, setReviewData] = useState({

      request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당',

    });

    const handleReviewClick = (review) => {
      setReviewData({
        id: review.DEAL_ID,
        thumbnail: review.IMG_NAME,
        productName: review.CAKE_NAME,
        customerName: review.CUST_NICK,
        reviewDate: review.CREATED_AT,
        size: review.CAKE_SIZE,
        flavor: review.CAKE_FLAVOR,
        reviewContent: review.REVIEW_MSG,
        storeName: review.storeName, // 가게 이름 설정
        request: review.request, // 요청사항 설정
      });
      setShowDetailReview(true);
    };

    
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 한 페이지에 표시할 아이템 수
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Reviews.slice(indexOfFirstItem, indexOfLastItem);


  const reviewpageNum = [];
  for (let i = 1; i <= Math.ceil(Reviews.length / itemsPerPage); i++) {
    reviewpageNum.push(i);
  }

  // 1:1 채팅 클릭시 새로운 팝업등장
  // const handleChatBoxClick =() =>{
  //   window.open('/TourReviewPopup', '_blank');
  // }


  /*이전페이지로 가는 로직 */

  const goToPrervPage = () => {
    setCurrentPage(prev => prev > 1 ? prev - 1 : 1);
  };

  /*다음페이지로 가는 로직 */

  const goToNextrvPage = () => {
    setCurrentPage(prev => prev < reviewpageNum.length ? prev + 1 : reviewpageNum.length);
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
 

  return (
    <div>

      <TourDetContainer containerHeight="2200px">

        <div className="review-section">
          <h2 className="review-list-title">리뷰 목록</h2>
          <div className="review-list">
          {currentItems.map((review) => (
            <div key={review.DEAL_ID} className="review-item" onClick={() => handleReviewClick(review)}>
                <img
                  className="review-image"
                  alt={`Review ${review.DEAL_ID}`}
                  src={review.IMG_NAME}
                />
                <div className="tour-review-content">
                <div className="tour-review-header">
                    <p className="tour-review-date">{review.CREATED_AT}</p>
                    <p className="tour-review-customer">{review.CUST_NICK} 님</p>
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
            <PageButton type="prev" onClick={goToPrervPage} />

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

            <PageButton type="next" onClick={goToNextrvPage} />
          </div>
        </div>
      </TourDetContainer>
      {showDetailReview && <DetailReviewPopup onClose={handleCloseDetailReview} reviewData={reviewData} />}
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

  