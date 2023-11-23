import React from "react";
import "../css/TourCompleteOrder.css";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const TourCompleteOrder = () => {

  const location = useLocation();
  const orderData = location.state?.orderData;
  console.log("여기서받으면됩니다용", orderData)


  return (
    <div className="tour-detail-container">
      <div className="tco-mt">주문내역 확인</div>
      <img  src={"/assets/images/cake1.jpg"} className="tco-cakeimg" alt="케이크1"/>

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
        {orderData ? `${orderData.order_name}` : ""}
        </div>

        <div className="tco-st-2">
        {orderData ? `${orderData.order_num}` : ""}
        </div>

        <div className="tco-st-3">
        {orderData ? `${orderData.cake_size}` : ""}
        </div>

        <div className="tco-st-4">
        {orderData? `${orderData.cake_flavor}` : ""}
        </div>
        <div className="tco-st-5">
        {orderData? `${orderData.lettering}` : ""}
        </div>

        <div className="tco-st-6">
        {orderData ? `${orderData.add_require}` : '추가요청사항없음'}
        </div>

        <div className="tco-st-7">
        {orderData ? `${orderData.cake_price} 원` : '가격 정보 없음'}
        </div>
      </div>


    <div className="tco-btn-container">
      <Link to={'/message'} className='tco-msgbtn'>문의하기</Link>

      <Link to={'/mporderlist'} className = 'tco-okbtn'> 확인</Link>
      
    </div>

     
    </div>
  );
};

export default TourCompleteOrder;
