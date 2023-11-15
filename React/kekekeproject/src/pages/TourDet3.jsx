import React, { useState } from "react";
import "../css/TourDet3.css";
import TourDetContainer from '../component/TourDetContainer'
import PageButton from "./PageButton";

export const TourDet3 = () => {
  
    // 리뷰 내용
    const Reviews = [
      {
        DEAL_ID: 1,
        IMG_NAME: "/assets/images/cake1.jpg",
        CAKE_NAME: '티아라케이크',
        CREATED_AT: '2023-11-15',
        CUST_NICK: '김은호',
        CAKE_SIZE: '1',
        CAKE_FLAVOR :'바닐라',
        REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜...',
        
        
      },
      {
        DEAL_ID: 2,
        IMG_NAME: '/assets/images/cake3.jpg',
        CAKE_NAME: '곰도리',
        CREATED_AT: '2023-11-14',
        CUST_NICK: '서유정',
        CAKE_SIZE: '도시락',
        CAKE_FLAVOR :'쿠키앤크림',
        REVIEW_MSG: '아짜증나너무맛잇어요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증...',
        
      
      },
      {
        DEAL_ID: 3,
        IMG_NAME: '/assets/images/cakelogo3.jpg',
        CAKE_NAME: '티아라케이크',
        CREATED_AT: '2023-11-15',
        CUST_NICK: '김은호',
        CAKE_SIZE: '1',
        CAKE_FLAVOR :'바닐라',
        REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜...',
        
      
      },
      {
        DEAL_ID: 4,
        IMG_NAME: '/assets/images/cakelogo2.jpg',
        CAKE_NAME: '티아라케이크',
        CREATED_AT: '2023-11-15',
        CUST_NICK: '김은호',
        CAKE_SIZE: '1',
        CAKE_FLAVOR :'바닐라',
        REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜...',
        
      
      },{
        DEAL_ID: 5,
        IMG_NAME: "/assets/images/cake1.jpg",
        CAKE_NAME: '티아라케이크',
        CREATED_AT: '2023-11-15',
        CUST_NICK: '김은호',
        CAKE_SIZE: '1',
        CAKE_FLAVOR :'바닐라',
        REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜...',
        
        
      },
      {
        DEAL_ID: 6,
        IMG_NAME: '/assets/images/cake3.jpg',
        CAKE_NAME: '곰도리',
        CREATED_AT: '2023-11-14',
        CUST_NICK: '서유정',
        CAKE_SIZE: '도시락',
        CAKE_FLAVOR :'쿠키앤크림',
        REVIEW_MSG: '아짜증나너무맛잇어요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증...',
        
      
      },
      {
        DEAL_ID: 7,
        IMG_NAME: '/assets/images/cakelogo3.jpg',
        CAKE_NAME: '티아라케이크',
        CREATED_AT: '2023-11-15',
        CUST_NICK: '김은호',
        CAKE_SIZE: '1',
        CAKE_FLAVOR :'바닐라',
        REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜...',
        
      
      },{
        DEAL_ID: 8,
        IMG_NAME: "/assets/images/cake1.jpg",
        CAKE_NAME: '티아라케이크',
        CREATED_AT: '2023-11-15',
        CUST_NICK: '김은호',
        CAKE_SIZE: '1',
        CAKE_FLAVOR :'바닐라',
        REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜...',
        
        
      },
      {
        DEAL_ID: 9,
        IMG_NAME: '/assets/images/cake3.jpg',
        CAKE_NAME: '곰도리',
        CREATED_AT: '2023-11-14',
        CUST_NICK: '서유정',
        CAKE_SIZE: '도시락',
        CAKE_FLAVOR :'쿠키앤크림',
        REVIEW_MSG: '아짜증나너무맛잇어요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증나요짜증...',
        
      
      },
      {
        DEAL_ID: 10,
        IMG_NAME: '/assets/images/cakelogo3.jpg',
        CAKE_NAME: '티아라케이크',
        CREATED_AT: '2023-11-15',
        CUST_NICK: '김은호',
        CAKE_SIZE: '1',
        CAKE_FLAVOR :'바닐라',
        REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜...',
        
      
      },
    ];

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
  

    // 리뷰 팝업 임시 데이터
       
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
      reviewContent: '케이크가 너무 맛있어요! 다음에도 또 주문할게요!',
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
   };
   
return (
  <div>

  <TourDetContainer containerHeight="1900px">

    <div className="review-section">
      <h2 className="review-list-title">리뷰 목록</h2>
      <div className="review-list">
        {currentItems.map(review => (
          <div key={review.DEAL_ID} className="review-item">
            <img 
              className="review-image" 
              alt={`Review ${review.DEAL_ID}`}
              src={review.IMG_NAME} 
            />
            <div className="tour-review-content">
              <h3 className="tour-review-cake-name">{review.CAKE_NAME}</h3>
              <p className="tour-review-date">{review.CREATED_AT}</p>
              <p className="tour-review-customer">{review.CUST_NICK} 님</p>
              <p className="tour-review-details">{`호수: ${review.CAKE_SIZE}호 맛: ${review.CAKE_FLAVOR}`}</p>
              <p className="tour-review-message">{review.REVIEW_MSG}</p>
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
  </div>

  );
};
    


export default TourDet3;