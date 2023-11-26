import React, { useEffect, useState } from 'react';
import '../css/MpOrderList.css';
import GlobalStyle from '../component/GlobalStyle'
import '../css/MpOrderListPopup.css'
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios'; // axios 라이브러리 추가
import API_URL from '../api_url';
import { useLocation } from 'react-router-dom';


const MpOrderList = () => {


  // 팝업 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [userOrders, setUserOrders] = useState([]); // userorders 상태 추가
  const userStorageData = sessionStorage.getItem('userData');
  const initialCustId = userStorageData ? JSON.parse(userStorageData).cust_id : '';
  const location = useLocation();
  const [custId, setCustId] = useState(initialCustId);
  const [additionalData, setAdditionalData] = useState(null); // 추가 커스텀데이터 목록
  

 
  const closePopup = () => {
    setSelectedOrderDetail(null); // 팝업을 닫을 때 상세 정보 상태를 초기화
    setIsPopupOpen(false);
  };


  // 커스텀주문목록 api콜
  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const response = await axios.post(`${API_URL}/store/customorderlist`, { cust_id: custId });
        const formattedData = response.data.map(item => {
          // 날짜 포매팅
          const pickupDate = new Date(item.PICKUP_DATE);
          const formattedDate = pickupDate.toISOString().split('T')[0];
          
          // 시간 포매팅 (HH:mm 형식)
          const formattedTime = item.PICKUP_TIME.slice(0, 5);
  
          return { ...item, PICKUP_DATE: formattedDate, PICKUP_TIME: formattedTime };
        });
        
        setAdditionalData(formattedData); // 포매팅된 데이터를 상태에 저장
        console.log("추가데이터", formattedData);
      } catch (error) {
        console.error('추가 데이터 가져오기 실패:', error);
      }
    };
  
    if (custId) {
      fetchAdditionalData();
    }
  }, [custId]);



    //일반상품목록데이터
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

    //일반상품날짜 정렬
    userOrders.sort((a, b) => {
      // 날짜를 Date 객체로 변환하여 비교
      const dateA = new Date(a.PICKUP_DATE);
      const dateB = new Date(b.PICKUP_DATE);
      
      // 내림차순 정렬
      return dateB - dateA;
    });


    // 커스텀제품 상태업데이트(리뷰쓰면 그거 적용되는코드)
    const [customOrders, setCustomOrders] = useState(additionalData);
    const markCustomOrderAsReviewed = (customOrderId) => {
      const updatedCustomOrders = customOrders.map(order =>
        order.id === customOrderId ? { ...order, isReviewed: true } : order
      );
      setCustomOrders(updatedCustomOrders); // 상태 업데이트
    };
    useEffect(() => {
      setCustomOrders(additionalData);
    }, [additionalData]);
    



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


// 일반상품이랑 커스텀상품 배열합침
const [combinedOrders, setCombinedOrders] = useState([]);
useEffect(() => {
  if (userOrders && customOrders) { // userOrders와 customOrders가 둘 다 유효한 경우에만 실행
    
  // 날짜 포매팅을 위한 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식으로 변환
  };  
   // 일반 주문과 커스텀 주문을 하나의 배열로 합칩니다
   const combinedOrders = [
    ...userOrders.map(order => ({ ...order, formattedDate: formatDate(order.PICKUP_DATE), orderType: 'user' })),
    ...customOrders.map(order => ({ ...order, formattedDate: formatDate(order.PICKUP_DATE), orderType: 'custom' }))
  ];

  // 날짜로 정렬합니다
  combinedOrders.sort((a, b) => new Date(b.formattedDate) - new Date(a.formattedDate));

  // 합쳐진 목록을 상태로 설정합니다
  setCombinedOrders(combinedOrders);
}
}, [userOrders, customOrders]);


// 이미지 경로 변환 함수 커스텀
const formatImagePath = (path) => {
  if (!path) return null;
  return path.replace('public\\', '').replace(/\\/g, '/');
};




// 팝업을 열 때 주문 상세 정보와 주문 유형 설정
const openPopup = (orderDetail, orderType) => {
  setSelectedOrderDetail({ ...orderDetail, orderType }); // 주문 상세 정보와 주문 유형을 상태에 설정
  setIsPopupOpen(true);
};


    return (
      <div className="order-list-container">
        <GlobalStyle />
        <img className='message-title' alt="Menu name bar" src='../assets/images/menu-name-bar.png' />
        <div className='message-text'>주문 내역</div>
        <div className="order-card">
        {combinedOrders && combinedOrders.map(order => (
        <div key={order.orderType === 'user' ? order.prd_id : order.custom_id} className="order-item">
          {order.orderType === 'user' ? (
            // 일반 주문 렌더링
            <>
              <img src={`/img/product/${order.IMG_NAME2}`} alt="Cake" className="order-thumbnail" />
              <div className="order-content">
                <div className="order-date-status">
                  <h2 className="pickup-date">{order.formattedDate}</h2>
                  <div className="order-status"> {order.CONS_OR_OC ? `${order.CONS_OR_OC} | ${formatDate(order.SALE_DY)}` : `만들까말까 | ${formatDate(order.SALE_DY)}`}</div>
                </div>
                <div className="order-description">
                  <p className="cake-size-flavor">{`케이크 사이즈: ${order.CAKE_SIZE} | 케이크 맛: ${order.CAKE_FLAVOR}`}</p>
                  <p className="store-name">{`${order.STORE_NAME}: ${order.CAKE_NAME}`}</p>
                </div>
                {!order.isReviewed && (
                  <div className="review-button-container">
                    <button onClick={() => openPopup(order, order.orderType)} className="review-button">리뷰쓰기</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // 커스텀 주문 렌더링
            <>
             {order.CUSTOM_IMG ? (
                // CUSTOM_IMG가 있는 경우
                <img src={formatImagePath(order.CUSTOM_IMG)} alt="Custom Cake" className="order-thumbnail" />
              ) : order.CUST_DRAW ? (
                // CUSTOM_IMG가 없고, CUST_DRAW가 있는 경우
                <img src={formatImagePath(order.CUST_DRAW)} alt="Custom Cake" className="order-thumbnail" />
              ) : (
                // 둘 다 없는 경우
                <div className="order-thumbnail">No Image Available</div>
              )}
              <div className="order-content">
                <div className="order-date-status">
                  <h2 className="pickup-date">{order.formattedDate}</h2>
                  <div className="order-status"> {order.CONS_OR_OC ? `${order.CONS_OR_OC} | ${formatDate(order.PICKUP_DATE)}` : `만들까말까 | ${formatDate(order.PICKUP_DATE)}`}</div>
                </div>
                <div className="order-description">
                <p className="cake-size-flavor">{`케이크 사이즈: ${order.CAKE_SIZE} | 케이크 맛: ${order.CAKE_FLAVOR}`}</p>
                  <p className="store-name">{`고객명: ${order.CLIENT_NAME}`}</p>
                </div>
                {!order.isReviewed && (
                  <div className="review-button-container">
                    <button onClick={() => openPopup(order, order.orderType)} className="review-button">리뷰쓰기</button>
                  </div>
                )}
              </div>
            </>
          )}
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
  const [existingReview, setExistingReview] = useState(null); // 기존 리뷰 데이터 저장

  
// 일반상품 데이터 요청하는 콜
  useEffect(() => {
    async function fetchReviewData() {
      try {
        let response;
        if (orderDetail.orderType === 'user') {
          // 일반상품 리뷰 데이터 요청
          response = await axios.get('/store/get-user-review', { 
            params: { deal_id: orderDetail.DEAL_ID }
          });
        } else {
          // 커스텀 상품 리뷰 데이터 요청
          response = await axios.get('/store/get-custom-review', { 
            params: { custom_id: orderDetail.CUSTOM_ID }
          });
        }
        setExistingReview(response.data); // 응답 데이터로 리뷰 상태 설정
      } catch (error) {
        console.error('리뷰 데이터 로드 중 오류 발생:', error);
      }
    }
  
    fetchReviewData(); // 함수 호출
  }, [orderDetail]); // 의존성 배열에 orderDetail 추가


  // 2. 리뷰 데이터가 있는 경우 리뷰 텍스트 상태 초기화
    useEffect(() => {
      if (existingReview) {
        setReviewContent(existingReview.review_msg); // 리뷰 데이터에서 review_msg 사용 (실제 필드명에 따라 수정)
        // 이미지 상태도 설정 가능
      }
    }, [existingReview]);

  
    // 등록하기누르면 데이터보내기 
    const handleReviewSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append('review_msg', reviewContent);
        if (image) {
          formData.append('image', image);
        }
        // 제품 유형에 따라 추가할 ID를 결정합니다.
        if (orderDetail.orderType === 'user') {
          formData.append('DEAL_ID', orderDetail.DEAL_ID);
        } else if (orderDetail.orderType === 'custom') {
          formData.append('CUSTOM_ID', orderDetail.CUSTOM_ID);
        }
  
        formData.append('cust_id', orderDetail.CUST_ID);
        formData.append('SELLER_ID', orderDetail.SELLER_ID);
  
        // 리뷰 데이터가 있는 경우 수정 요청 보내기
        if (existingReview) {
          // 기존 리뷰의 ID (예: existingReview.id)를 사용하여 수정 요청
          formData.append('review_id', existingReview.id);
          const response = await axios.put(`${API_URL}/store/updatereview`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          alert('리뷰가 수정되었습니다.');
        } else {
          // 리뷰 데이터가 없는 경우 등록 요청 보내기
          const response = await axios.post(`${API_URL}/store/reviewcust`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          alert('리뷰가 등록되었습니다.');
        }
  
        markOrderAsReviewed(orderDetail.id);
        onClose();
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('리뷰 등록 또는 수정 실패:', error);
        alert('리뷰 처리 중 오류가 발생했습니다.');
      }
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
          {orderDetail.orderType === 'user' && (
          <div className="details-and-review-container">
            <div className="review-details">
              <div className="review-detail-item">
                <span className="review-detail-title">주문 상세 내역</span>
                <div className="review-detail-info">
                  <p>케이크 크기: {orderDetail.CAKE_SIZE}</p>
                  <p>케이크 맛: {orderDetail.CAKE_FLAVOR}</p>
                  <p>케이크 요청사항: {orderDetail.ADD_REQUIRE || '없음'}</p>
                </div>
              </div>
            </div>
          </div>
            )}

        {orderDetail.orderType === 'custom' && (
          <div className="details-and-review-container">
            <div className="review-details">
              <div className="review-detail-item">
                <span className="review-detail-title">주문 상세 내역</span>
                <div className="review-detail-info">
                  <p>케이크 크기: {orderDetail.CAKE_SIZE}</p>
                  <p>케이크 맛: {orderDetail.CAKE_FLAVOR}</p>
                  <p>케이크 요청사항: {orderDetail.ADD_DETAIL}</p>
                </div>
              </div>
            </div>
          </div>
            )}

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
          <button className="submit-button" onClick={handleReviewSubmit}>{existingReview ? '수정하기' : '등록하기'}</button>
          <button className="close-button" onClick={handleClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};
