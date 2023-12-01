import React, { useEffect, useState } from 'react';
import '../css/MpOrderList.css';
import GlobalStyle from '../component/GlobalStyle'
import '../css/MpOrderListPopup.css'
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios'; // axios 라이브러리 추가
import API_URL from '../api_url';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

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
  
  
  // 날짜를 "YYYY-MM-DD" 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  

 
  const closePopup = () => {
    setSelectedOrderDetail(null); // 팝업을 닫을 때 상세 정보 상태를 초기화
    setIsPopupOpen(false);
  };


  // 커스텀주문목록 api콜
  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const response = await axios.post(`${API_URL}/store/customorderlist`, { cust_id: custId });
  
        // 데이터가 비어있는 경우 확인
        if (!response.data || response.data.length === 0) {
          setAdditionalData([]); // 빈 배열을 설정하거나 다른 처리를 할 수 있습니다.
          return; // 함수를 여기서 종료합니다.
        }
        const formattedData = response.data.map(item => {
          // 날짜 포매팅
          const formattedDate = item.PICKUP_DATE;
        
          // 시간 포매팅 (HH:mm 형식)
          const formattedTime = item.PICKUP_TIME.slice(0, 5);
  
          return { ...item, PICKUP_DATE: formattedDate, PICKUP_TIME: formattedTime };
        });
        console.log("추가 데이터", formattedData);
        console.log("추가 데이터", formattedData);
        setAdditionalData(formattedData); // 포매팅된 데이터를 상태에 저장
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





// 일반상품이랑 커스텀상품 배열합침
const [combinedOrders, setCombinedOrders] = useState([]);
useEffect(() => {
  if (userOrders || customOrders) { 
    // 여기에 포함된 코드는 userOrders 또는 customOrders 중 하나라도 유효할 때 실행됩니다.

    const combinedOrders = [
      ...(userOrders || []).map(order => ({ ...order, formattedDate: formatDate(order.PICKUP_DATE), orderType: 'user' })),
      ...(customOrders || []).map(order => ({ ...order, formattedDate: formatDate(order.PICKUP_DATE), orderType: 'custom' }))
    ];

    combinedOrders.sort((a, b) => new Date(b.formattedDate) - new Date(a.formattedDate));

    setCombinedOrders(combinedOrders);
  }
}, [userOrders, customOrders]);




useEffect(() => {
  console.log('Combined Orders:', combinedOrders);
}, [combinedOrders]);

// 이미지 경로 변환 함수 커스텀
const formatImagePath = (path) => {
  if (!path) return null;
  return path.replace('public\\', '').replace(/\\/g, '/');
};

window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동



// 팝업을 열 때 주문 상세 정보와 주문 유형 설정
const openPopup = (orderDetail, orderType) => {
  setSelectedOrderDetail({ ...orderDetail, orderType }); // 주문 상세 정보와 주문 유형을 상태에 설정
  setIsPopupOpen(true);
};

window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동

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
                  <div className="order-status"> {order.CONS_OR_OC ? `${order.CONS_OR_OC} | ${formatDate(order.SALE_DY)}` : `주문완료 | ${formatDate(order.SALE_DY)}`}</div>
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
                  <div className="order-status"> {order.CONS_OR_OC ? `${order.CONS_OR_OC} | ${formatDate(order.PICKUP_DATE)}` : `주문완료 | ${formatDate(order.PICKUP_DATE)}`}</div>
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
  const [custId, setCustId] = useState([]);

  useEffect(() => {
    console.log('Order Detail:', orderDetail);
  }, [orderDetail]);

  // 구매자 ID(cust_id불러오기)
  useEffect(() => {
    const userStorageData = sessionStorage.getItem('userData');
    if (userStorageData) {
      const userData = JSON.parse(userStorageData);
      console.log('세션 스토리지에서 가져온 유저아이디값:', userData.cust_id);
      setCustId(userData.cust_id);
    }
  }, []);

  
    // 등록하기누르면 데이터보내기 
    const handleReviewSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append('review_msg', reviewContent);
       

        formData.append('cust_id', custId);
        let idType, idValue;
        if (orderDetail.orderType === 'user') {
          idType = 'DEAL_ID';
          idValue = orderDetail.DEAL_ID;
        } else if (orderDetail.orderType === 'custom') {
          idType = 'CUSTOM_ID';
          idValue = orderDetail.CUSTOM_ID;
        }
        formData.append(idType, idValue);
    
      
        formData.append('SELLER_ID', orderDetail.SELLER_ID);
        if (image) {
          formData.append('image', image);
        }

    
        // 서버에 리뷰 존재 여부 확인
        let reviewExistsResponse = await axios.get(`${API_URL}/store/check-review-existence`, {
          params: { [idType.toLowerCase()]: idValue }
        });

        console.log(reviewExistsResponse);
    
        Swal.fire({
          title: '리뷰가 등록되었습니다!',
          text: '고객님의 소중한 리뷰를 등록했습니다.',
          icon: 'success',
          confirmButtonText: '확인',
          customClass: {
            confirmButton: 'custom-swal-button',
          },
        }).then(() => {
          onClose(); // Close the popup
          window.location.reload(); // Reload the page or redirect as needed
        });
    
        markOrderAsReviewed(orderDetail.id);
    
      } catch (error) {
        console.error('리뷰 등록 또는 수정 실패:', error);
        Swal.fire({
          title: '오류 발생',
          text: '리뷰 처리 중 오류가 발생했습니다.',
          icon: 'error',
          confirmButtonText: '닫기',
          customClass: {
            confirmButton: 'custom-swal-button',
          },
        });
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
