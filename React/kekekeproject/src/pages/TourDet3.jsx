import React, { useState } from "react";
import "../css/TourDet3.css";
import { Link } from 'react-router-dom';
import Blue_Box from "../component/Blue_Box";


export const TourDet3 = () => {
  // 가게이미지 등등 변수
    const CakeStoreName = '랑랑케이크';
    const StoreAddr = '강남구 도곡동';
    const StoreDetail = '강남구 도곡동에 위치한 주문제작 및 클래스 공방입니다. 사랑과 정성이 깃든 수제케이크로 당신의 소중한 순간을 더욱 특별하게 만들어드립니다! 달콤한 순간을 케이크와 함께 최상의 재료와 정성이 담긴 수제케이크로 당신을 맞이합니다.';
    const CakeName = '티아라케이크' ;
    const ReviewDate = '2023.10.31';
    const ReviewCust = "홍길동";
    // 가게 로고
    const tourdet3_StoreLogo = "https://blogpfthumb-phinf.pstatic.net/MjAyMDA4MTNfMTQ4/MDAxNTk3MzA4MTg4MzQx._OxSWKBpTMPUkFOlAc0UUAWfeUVEzn-FStcvdwlxxFcg.fc00U8MAeCw9QDqNML0a6XGWcmgdn57fCjTu5dO1vnkg.PNG.theyoon_cake/%25EB%25A1%259C%25EA%25B3%25A0.png?type=w161";
    // 리뷰 내용
    const Reviews = [
      {
        DEAL_ID: 1,
        IMG_NAME: 'https://blogpfthumb-phinf.pstatic.net/MjAyMDA4MTNfMTQ4/MDAxNTk3MzA4MTg4MzQx._OxSWKBpTMPUkFOlAc0UUAWfeUVEzn-FStcvdwlxxFcg.fc00U8MAeCw9QDqNML0a6XGWcmgdn57fCjTu5dO1vnkg.PNG',
        IMG_ORIGINAL_NAME :'.theyoon_cake/로고.png?type=w161',
        CAKE_NAME: '티아라케이크',
        CREATED_AT: '2023-11-15',
        CUST_NICK: '김은호',
        CAKE_SIZE: '1',
        CAKE_FLAVOR :'바닐라',
        REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜...',
        
        
      },
      {
        DEAL_ID: 2,
        IMG_NAME: 'https://blogpfthumb-phinf.pstatic.net/MjAyMDA4MTNfMTQ4/MDAxNTk3MzA4MTg4MzQx._OxSWKBpTMPUkFOlAc0UUAWfeUVEzn-FStcvdwlxxFcg.fc00U8MAeCw9QDqNML0a6XGWcmgdn57fCjTu5dO1vnkg.PNG',
        IMG_ORIGINAL_NAME :'.theyoon_cake/로고.png?type=w161',
        CAKE_NAME: '티아라케이크',
        CREATED_AT: '2023-11-15',
        CUST_NICK: '김은호',
        CAKE_SIZE: '1',
        CAKE_FLAVOR :'바닐라',
        REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜...',
        
      
      },
      {
        DEAL_ID: 3,
        IMG_NAME: 'https://blogpfthumb-phinf.pstatic.net/MjAyMDA4MTNfMTQ4/MDAxNTk3MzA4MTg4MzQx._OxSWKBpTMPUkFOlAc0UUAWfeUVEzn-FStcvdwlxxFcg.fc00U8MAeCw9QDqNML0a6XGWcmgdn57fCjTu5dO1vnkg.PNG',
        IMG_ORIGINAL_NAME :'.theyoon_cake/로고.png?type=w161',
        CAKE_NAME: '티아라케이크',
        CREATED_AT: '2023-11-15',
        CUST_NICK: '김은호',
        CAKE_SIZE: '1',
        CAKE_FLAVOR :'바닐라',
        REVIEW_MSG: '꼭 사고 싶었던 케이크에요 ㅠ 너무 예쁜거아니야? 진짜? 케이크도 맛있고 냠냠 여기서 꼭사세여 진짜존맛탱 진짜...',
        
      
      },
      {
        DEAL_ID: 4,
        IMG_NAME: 'https://blogpfthumb-phinf.pstatic.net/MjAyMDA4MTNfMTQ4/MDAxNTk3MzA4MTg4MzQx._OxSWKBpTMPUkFOlAc0UUAWfeUVEzn-FStcvdwlxxFcg.fc00U8MAeCw9QDqNML0a6XGWcmgdn57fCjTu5dO1vnkg.PNG',
        IMG_ORIGINAL_NAME :'.theyoon_cake/로고.png?type=w161',
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
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

    const reviewpageNum = [];
    for (let i = 1; i <= Math.ceil(Reviews.length / itemsPerPage); i++) {
      reviewpageNum.push(i);
    }

    // 1:1 채팅 클릭시 새로운 팝업등장
    const handleChatBoxClick =() =>{
      window.open('/TourReviewPopup', '_blank');
    }
   
    const handlePgClick = (event, number) => {
      event.preventDefault(); // 페이지 새로고침 방지
      setCurrentPage(number);
    };
    
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
  <div className="frame">
  <div className="tour-detail-container">
  <div className="tour-detail-content">
    <div className="store-info-section">
      <img className="store-logo"
        src={tourdet3_StoreLogo}
        alt={CakeStoreName}
      />
      <div className="store-text-content">
        <h1 className="store-name">{CakeStoreName}</h1>
        <p className="store-address">{StoreAddr}</p>
        <p className="store-description">{StoreDetail}</p>
      </div>
      <button className="chat-button" onClick={handleChatBoxClick}>
        <span className="chat-text">1:1 채팅</span>
      </button>
    </div>

    <div className="review-section">
      <h2 className="review-list-title">리뷰목록</h2>
      <div className="review-list">
        {currentItems.map(review => (
          <div key={review.DEAL_ID} className="review-item">
            <img 
              className="review-image" 
              alt={`Review ${review.DEAL_ID}`}
              src={`${review.IMG_NAME}${review.IMG_ORIGINAL_NAME}`} 
            />
            <div className="review-content">
              <h3 className="review-cake-name">{review.CAKE_NAME}</h3>
              <p className="review-date">{review.CREATED_AT}</p>
              <p className="review-customer">{review.CUST_NICK} 님</p>
              <p className="review-details">{`호수: ${review.CAKE_SIZE}호 맛: ${review.CAKE_FLAVOR}`}</p>
              <p className="review-message">{review.REVIEW_MSG}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className="prev-page" onClick={goToPrervPage}>
          {/* 이전 페이지 아이콘 */}
        </button>
        <div className="page-numbers">
          {reviewpageNum.map(num => (
            <a key={num} onClick={(e) => handlePgClick(e, num)} href="#!">
              {num}
            </a>
          ))}




          <div className="storeinfo"> {/* 가게이미지,케이크집이름, 주소, 가게설명, 1:1:채팅div*/}
            <div className="tourdet">
              <img className="tourdet3-StoreLogo"
                src={tourdet3_StoreLogo}
                alt={CakeName}
                  />{/*가게 로고*/}
            </div>
            <div className="tourdet-3">
              <div className="tourdet3-CakeStoreNameFrame">
                <div className="tourdet3-CakeStoreName">{CakeStoreName}</div>{/* 가게 이름 넣는곳*/}
              </div>
              <div className="tour-det-addr">
                <div className="tour-det-addr-tx">{StoreAddr}</div>{/* 가게 주소넣는곳*/}
              </div>
              <div className="tour-det-det">
                <p className="tour-det-det-tx" >
                {StoreDetail}{/* 가게 설명넣는곳*/}
                </p>
              </div>
            </div>
            
              <div className="overlap-group-2">
                <button className="tour-det-chatbox"  onClick = {handleChatBoxClick} > {/* 1:1 채팅*/}
                  <div className="tourdet3Chatbox" />
                  <div className="tourdet3ChatboxTx">1:1 채팅</div>
                </button>
              
            </div>
          </div>{/* 가게이미지,케이크집이름, 주소, 가게설명, 1:1:채팅div끝*/}


          <div className="tour-det-white-fr">{/*리뷰목록 있는하얀색 블록 div시작*/}
            <div className="tour-det-white-rec" />
            <div className="wrvlisttxfr">
              <div className="tour-det-rv-list">리뷰목록</div>
            </div>
            <div className="wreviewtxfr">
              <div className="tourdet-5">

            

              {currentItems.map(review => (
                  <div key={Reviews.DEAL_ID} className="tourdet-wlistfr"> {/* 케이크리스트 목록 div */}
                    <div className="tourdet-cakeimg">
                      {/* 케이크 이미지 넣는 곳 */}
                      <img 
                        className="cakeimgbox" 
                        alt={`Review Image ${review.DEAL_ID}`}
                        src={`${review.IMG_NAME}${review.IMG_ORIGINAL_NAME}`} 
                      /> {/* 케이크 src 넣는곳 */}
                    </div>
                    <div className="cakervfr">
                      <div className="cakervdetfr">
                        <div className="tourdet-6"> {/* 케이크 이름, 날짜, 작성자 div */}
                          <div className="div-CakeName">
                            <div className="text-CakeName">{review.CAKE_NAME}</div> {/* 케이크 이름 */}
                          </div>
                          <div className="div-ReviewDate">
                            <div className="text-ReviewDate">{review.CREATED_AT}</div> {/* 리뷰 작성 날짜 */}
                          </div>
                          <div className="div-ReviewCust">
                            <div className="text-ReviewCust">{review.CUST_NICK} 님</div> {/* 리뷰 작성자 */}
                          </div>
                        </div>
                        <div className="div-ReviewRequire">
                          <p className="text-ReviewRequire">
                            {`케이크 호수: ${review.CAKE_SIZE}호  케이크 맛: ${review.CAKE_FLAVOR}`} {/* 케이크 호수와 맛 */}
                          </p>
                        </div>
                      </div>
                      <div className="div-ReviewDetail">
                        <p className="text-ReviewDetail">
                          {review.REVIEW_MSG}
                        </p>
                    <div className="line-wrapper">
                      <img
                        className="line"
                        alt="Line"
                        src="https://cdn.animaapp.com/projects/654a0c7461a415cac322d4c9/releases/654a0c7dc209185e0a9adad7/img/tourdetrvlist1line1.svg"
                      />
                      </div>
                    </div>
                    </div>    
                  </div>
                ))}


              </div>
            </div>
            <div className="tour-review-page"> {/*페이지 버튼*/}
              <div className="review-page-before" onClick={goToPrervPage}> {/*이전페이지버튼*/}
                <img className="polygon1" alt="이전 페이지" src={'/assets/images/TourDet3Btn1.png'} />
              </div>{/*이전페이지버튼 끝*/}
              <div className="pagefr">
                  {reviewpageNum.map(num => (
              <a key={num} onClick={(e) => handlePgClick(e, num)} href="!#">
                {num}
              </a>
            ))}
              </div>
            <div className="review-page-next" onClick={goToNextrvPage}>{/*다음페이지버튼*/}
              <img className="polygon2" alt="다음 페이지" src={'/assets/images/TourDet3Btn2.png'}/>
            </div>{/*다음페이지버튼끝*/}
          </div>{/*페이지 버튼*/}

        </div>{/*리뷰목록 있는하얀색 블록 div끝*/}





        </div>
        <button className="next-page" onClick={goToNextrvPage}>
          {/* 다음 페이지 아이콘 */}
        </button>
      </div>
    </div>
  </div>
</div>
</div>
  );
};
    


export default TourDet3;