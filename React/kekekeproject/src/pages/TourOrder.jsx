import React, { useState,  forwardRef } from 'react';
import {Link} from "react-router-dom";
import "../css/TourOrder.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import TourDetContainer from '../component/TourDetContainer'



export const TourOrder = () => {


  
  const [startedDate, setStartedDate] = useState(new Date());

  const CakeStoreName = '랑랑케이크';
    const StoreAddr = '강남구 도곡동';
    const StoreDetail = '강남구 도곡동에 위치한 주문제작 및 클래스 공방입니다. 사랑과 정성이 깃든 수제케이크로 당신의 소중한 순간을 더욱 특별하게 만들어드립니다! 달콤한 순간을 케이크와 함께 최상의 재료와 정성이 담긴 수제케이크로 당신을 맞이합니다.';
    const CakeName = '티아라케이크' ;
    const tourdet3_StoreLogo = "https://blogpfthumb-phinf.pstatic.net/MjAyMDA4MTNfMTQ4/MDAxNTk3MzA4MTg4MzQx._OxSWKBpTMPUkFOlAc0UUAWfeUVEzn-FStcvdwlxxFcg.fc00U8MAeCw9QDqNML0a6XGWcmgdn57fCjTu5dO1vnkg.PNG.theyoon_cake/%25EB%25A1%259C%25EA%25B3%25A0.png?type=w161";

    const handleChatBoxClick =() =>{
      window.open('/TourReviewPopup', '_blank');
    }

    const OrderInput = forwardRef(({ value, onClick }, ref) => (
      <button className="example-order-input co-day" onClick={onClick} ref={ref}>
        {value}
        <FontAwesomeIcon icon={faCalendarAlt} className='co-day-icon' onClick={onClick} />
      </button>
    ));

  return (
    <div>
      <TourDetContainer containerHeight="2200px">
    <div className="index">

          <div className="div-5" />
          <div className="div-wrapper-6">
            <div className="text-wrapper-6">예약자성함</div>
            
          </div>
          <div className="div-wrapper-7">
            <div className="text-wrapper-7">티아라케이크</div>
          </div>
          <div className="order-reservename">
          <input className="reservename"
                    type='text'
                    placeholder='예) 홍길동'
                  />
          </div>
          <div className="div-wrapper-9">
          </div>

          <div className="div-wrapper-11">
            <div className="text-wrapper-6">가격</div>
          </div>
          <div className="div-wrapper-12">
            <div className="text-wrapper-9">원</div>
          </div>
          <div className="div-wrapper-13">
            <div className="text-wrapper-8">날짜를 입력하세요</div>
          </div>
          <div className="div-wrapper-14">
            <div className="text-wrapper-6">픽업날짜</div>
            <DatePicker 
        selected={startedDate} 
        onChange={(date) => setStartedDate(date)} 
        className="co-day"
        dateFormat="yyyy/MM/dd"
        customInput={<OrderInput />} // 여기에 커스텀 인풋을 추가합니다.
      />
          </div>
          <div className="div-wrapper-15">
            <div className="text-wrapper-6">케이크 설명</div>
          </div>
          <div className="div-wrapper-16">
            <p className="text-wrapper-10">
              여기는 케이크 설명이 들어갈 자리입니다
              <br />
              케이크설명이 들어갈 자리입니다 케이크 <br />
              설명이들어가요 케이크 설명 들어가 케이크
              <br />
              설명들어간ㄷ? 케이크설명이양앙ㅇ
            </p>
          </div>
          <div className="div-wrapper-17">
            <div className="text-wrapper-6">예약자 번호</div>
          </div>
          <div className="order-reservenum">
          <input className="reservenum"
                    type='text'
                    placeholder='예) 010-1234-1234'
                  />
          </div>
          <div className="div-wrapper-19">
            <div className="text-wrapper-6">케이크 위 문구</div>
          </div>
          <div className="order-reservetext">
          <input className="reservetxt"
                    type='text'
                    placeholder='예) 생일축하해 0 0 아'
                  />
          </div>
          <div className="div-wrapper-19">
            <div className="text-wrapper-6">케이크 위 문구</div>
          </div>
          <div className="div-wrapper-21">
            <div className="text-wrapper-6">케이크 추가 요청사항</div>
          </div>
          <div className="order-reservereq">
          <input className="reservereq"
                    type='text'
                    placeholder='예) 없으면 안적으셔도 됩니당'
                  />
          </div>
          <div className="div-wrapper-23">
            <div className="text-wrapper-6">케이크 크기 선택</div>
          </div>
          <div className="div-6" />
          <div className="view">
            <Checkbox></Checkbox>
            <div className="text-wrapper-11">도시락</div>
          </div>
          <div className="element-2">
          <Checkbox></Checkbox>
            <div className="text-wrapper-12">1호</div>
          </div>
          <div className="element-3">
          <Checkbox></Checkbox>
            <div className="text-wrapper-12">2호</div>
          </div>
          <div className="element-wrapper">
          <Checkbox></Checkbox>
            <div className="element-4">3호</div>
          </div>
          <div className="rectangle-3" />
          <div className="rectangle-4" />
          <div className="rectangle-5" />
          <img className="img" alt="Img" src="https://c.animaapp.com/wXTv1PcE/img/------1---1.png" />
          <img className="image" alt="Image" src="https://c.animaapp.com/wXTv1PcE/img/-----.png" />
          <img className="element-5" alt="Element" src="https://c.animaapp.com/wXTv1PcE/img/-----.png" />
          <img className="element-6" alt="Element" src="https://c.animaapp.com/wXTv1PcE/img/-----.png" />
          <img className="element-7" alt="Element" src="https://c.animaapp.com/wXTv1PcE/img/-----.png" />
          <img className="element-8" alt="Element" src="https://c.animaapp.com/wXTv1PcE/img/------1---1.png" />
          <img className="element-9" alt="Element" src="https://c.animaapp.com/wXTv1PcE/img/------1---1.png" />
          <img className="element-10" alt="Element" src="https://c.animaapp.com/wXTv1PcE/img/------1---1.png" />
          <div className="div-wrapper-24">
            <div className="text-wrapper-6">케이크 맛 선택</div>
          </div>
          <div className="div-7" />
          <div className="view-2">
          <Checkbox></Checkbox>
            <div className="text-wrapper-11">바닐라</div>
          </div>
          <div className="view-3">
          <Checkbox></Checkbox>
            <div className="text-wrapper-11">초콜릿</div>
          </div>
          <div className="view-4">
          <Checkbox></Checkbox>
            <div className="text-wrapper-11">오레오</div>
          </div>
          <div className="view-5">
          <Checkbox></Checkbox>
            <div className="text-wrapper-11">딸기</div>
          </div>
          <img className="img-2" alt="Img" src="https://c.animaapp.com/wXTv1PcE/img/------1---1.png" />
          <img className="element-11" alt="Element" src="https://c.animaapp.com/wXTv1PcE/img/------1---1.png" />
          <img className="element-12" alt="Element" src="https://c.animaapp.com/wXTv1PcE/img/------1---1.png" />
          <img className="element-13" alt="Element" src="https://c.animaapp.com/wXTv1PcE/img/------1---1.png" />
          <div className="tour-detail">
            <div className="group-2">
              <div className="overlap-group-3">
                <div className="text-wrapper-13">주문하기</div>
              </div>
              </div>
              </div>
              </div>
              </TourDetContainer>
              </div>
  );
};


export default TourOrder;

function Checkbox() {
  // 상태 초기화: 체크박스의 기본 상태는 false로 설정
  const [isChecked, setIsChecked] = useState(false);

  // 체크박스 상태가 변경될 때 실행되는 이벤트 핸들러
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // 현재 상태의 반대 값을 설정
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked} // 현재 상태를 반영
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
    
  );
}