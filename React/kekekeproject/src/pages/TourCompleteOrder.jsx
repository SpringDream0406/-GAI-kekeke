import React from "react";
import "../css/TourCompleteOrder.css";
import { Link } from "react-router-dom";

const TourCompleteOrder = () => {


  return (
    <div className="tour-detail-container">
      <div className="tco-mt">주문내역 확인</div>
      <img  src={"/assets/images/cake1.jpg"} className="tco-cakeimg"/>

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
          홍길동
        </div>

        <div className="tco-st-2">
         010-1234-1234
        </div>

        <div className="tco-st-3">
          1호
        </div>

        <div className="tco-st-4">
          오레오
        </div>
        <div className="tco-st-5">
          생일축하해바보야
        </div>

        <div className="tco-st-6">
          오레오듬뿍넣어주시고 사랑해주시고dddddd
        </div>

        <div className="tco-st-7">
          100000 원
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
