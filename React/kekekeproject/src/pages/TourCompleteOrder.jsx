import React, { useEffect,useInsertionEffect,useState } from "react";
import "../css/TourCompleteOrder.css";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api_url';
import BlueBg from "../component/BlueBg";


const TourCompleteOrder = () => {
  const [storeInfo, setStoreInfo] = useState(null); // 가게 정보 상태 추가
  const location = useLocation();
  const orderData = location.state?.orderData;
  console.log("여기서받으면됩니다용", orderData)
  const [custid, setCustId] = useState()
  const [customInfo, setCustomInfo] = useState(null);

  
  // 구매자 ID(cust_id불러오기)
  useEffect(() => {
    const userStorageData = sessionStorage.getItem('userData');
    if (userStorageData) {
      const userData = JSON.parse(userStorageData);
      console.log('세션 스토리지에서 가져온 유저아이디값:', userData.cust_id);
      setCustId(userData.cust_id);
    }
  }, []);

  // 일반 상품주문에서상품이미지가져오기 
  // orderData에서 prd_id 추출
  const prd_id = orderData?.prd_id;
  useEffect(() => { //prd_id를가지고 데이터를 가져올거임 tourDetContainer
    const postData = async () => {
      try {
        const response = await axios.post(`${API_URL}/store/tour-order`, { prd_id: prd_id });
        const data = response.data[0];
        console.log(data);
        setStoreInfo({
        prd_img : `/img/product/${data.IMG_NAME2}`
        })
      
        console.log('응답:', response.data);
      } catch (error) {
        console.error('오류:', error);
      }
    };
  
    if (prd_id) {
      postData();
 }
  }, [prd_id]); // prd_id를 의존성 배열에 추가하여 prd_id 값이 변경될 때마다 실행

  useEffect(() => { //cust_id를가지고 데이터를 가져올거임 
    const custData = async () => {
      try {
        const response = await axios.post(`${API_URL}/store/custom`, { cust_id :custid });
        const data = response.data[0];
        console.log(data);
        setCustomInfo(response.data); // 수정된 부분: 응답 데이터를 상태에 저장
        
        console.log('응답:', response.data);
      } catch (error) {
        console.error('오류:', error);
      }
    };
   
    if (custid) {
      custData();
 }
  }, [custid]); // custid 의존성 배열에 추가하여 custid 값이 변경될 때마다 실행
 
 // customInfo 상태가 변경될 때마다 실행되는 useEffect
useEffect(() => {
  if (customInfo) {
    console.log(customInfo ? `${customInfo.CUSTOM_IMG.split("\\").join("/")}` : "이미지 경로 없음");
  }
}, [customInfo]);

  return (
    <div className="tour-detail-container">
      <div className="tco-mt">주문내역 확인</div>
      {storeInfo ? (
    <img src={storeInfo.prd_img} className="tco-cakeimg" alt="케이크" />
  ) : (
    <>
    <div className="image-container123">
      {customInfo && customInfo.CUSTOM_IMG && (
        <img src={`/${customInfo.CUSTOM_IMG.substring("public/".length)}`} className="tco-cakeimg2" alt="케이크1" />
      )}
      {customInfo && customInfo.CUST_DRAW && (
        <img src={`/${customInfo.CUST_DRAW.substring("public/".length)}`} className="tco-cakeimg2" alt="케이크2" />
      )}
    </div>
    </>
  )}

      <div className="tco-mt-container">
        <div className="tco-mt-1">
          예약자 성함 :
        </div>

        <div className="tco-mt-2">
          예약자 번호 :
        </div>

        <div className="tco-mt-3">
          케이크 크기 :
        </div>

        <div className="tco-mt-4">
          케이크 맛 :
        </div>
        <div className="tco-mt-5">
          케이크 위 문구 :
        </div>

        <div className="tco-mt-6">
          추가요청사항 :
        </div>

        <div className="tco-mt-7">
          가격 :
        </div>
      </div>
      
      <div className="tco-st-container">
        <div className="tco-st-1">
        {orderData ? orderData.order_name : (customInfo ? customInfo.CLIENT_NAME : "정보없음")}
        </div>
       
        <div className="tco-st-2">
         {orderData ? orderData.order_num : (customInfo ? customInfo.CLIENT_NUM : "정보없음")}
        </div>

        <div className="tco-st-3">
        {orderData ? orderData.cake_size : (customInfo ? customInfo.CAKE_SIZE : "정보없음")}
        </div>

        <div className="tco-st-4">
       {orderData ? orderData.cake_flavor : (customInfo ? customInfo.CAKE_FLAVOR : "정보없음")}
        </div>
        <div className="tco-st-5">
        {orderData ? orderData.lettering : (customInfo ? customInfo.CKAE_DETAIL : "정보없음")}
        </div>

        <div className="tco-st-6">
        {orderData ? orderData.add_require : (customInfo ? customInfo.ADD_DETAIL : "정보없음")}
        </div>

        <div className="tco-st-7">
        {orderData ? `${orderData.cake_price} 원` : '가격 정보 없음'}
        </div>
      </div>


    <div className="tco-btn-container">
      <Link to={'/message'} className='tco-msgbtn'>문의하기</Link>

      <Link to={'/mporderlist'} className = 'tco-okbtn'> 확인</Link>
      
    </div>

    <BlueBg top={340} height={2300}/>
    </div>
  );
};

export default TourCompleteOrder;
