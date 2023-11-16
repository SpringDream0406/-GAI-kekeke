import React, { useState,  forwardRef ,useCallback} from 'react';
import {Link} from "react-router-dom";
import "../css/TourOrder.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import TourDetContainer from '../component/TourDetContainer'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { faClock } from '@fortawesome/free-solid-svg-icons';



export const TourOrder = () => {

  const [totalCost, setTotalCost] = useState(30000); // This sets the initial total cost.

  const [pickupDateTime, setPickupDateTime] = useState(new Date());
  const [pickupDate, setPickupDate] = useState(new Date());
  const [additionalCosts] = useState({
    vanilla: 0,
    chocolate: 1000,
    oreo: 2000,
    fruit: 3000,
    do: 0,
    one: 10000,
    two: 20000,
    three: 30000,
  });
 
  
    const TimeInput = forwardRef(({ value, onClick }, ref) => (
      <button className="to-time-input to-timetitle" onClick={onClick} ref={ref}>
        {value}
        <FontAwesomeIcon icon={faClock} className='to-time-icon' onClick={onClick} />
      </button>
    ));
  
   
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
      <button className="to-custom-input to-day" onClick={onClick} ref={ref}>
        {value}
        <FontAwesomeIcon icon={faCalendarAlt} className='to-day-icon' onClick={onClick} />
      </button>
    ));
  

    const [selectedFlavor, setSelectedFlavor] = useState(null);

    // 크기 선택에 대한 상태
    const [selectedSize, setSelectedSize] = useState(null);
    
    const calculateTotalCostForFlavor = (flavor) => {
      // 새로운 맛을 선택한 경우 추가요금을 계산하고, 그렇지 않으면 이전에 선택된 맛의 추가요금을 빼야 합니다.
      const costToAdd = flavor ? additionalCosts[flavor] : 0;
      const costToSubtract = selectedFlavor ? additionalCosts[selectedFlavor] : 0;
      return costToAdd - costToSubtract;
    };
    
    // 크기 선택에 대한 가격 계산 로직
    const calculateTotalCostForSize = (size) => {
      // 새로운 크기를 선택한 경우 추가요금을 계산하고, 그렇지 않으면 이전에 선택된 크기의 추가요금을 빼야 합니다.
      const costToAdd = size ? additionalCosts[size] : 0;
      const costToSubtract = selectedSize ? additionalCosts[selectedSize] : 0;
      return costToAdd - costToSubtract;
    };
    
    // 맛 선택 핸들러
    const handleFlavorChange = useCallback((flavor) => {
      setSelectedFlavor(prevFlavor => {
        // 총 가격 업데이트
        const priceDifference = calculateTotalCostForFlavor(flavor);
        setTotalCost(prevTotalCost => prevTotalCost + priceDifference);
        return prevFlavor === flavor ? null : flavor;
      });
    }, [additionalCosts, selectedFlavor]);
    
    // 크기 선택 핸들러
    const handleSizeChange = useCallback((size) => {
      setSelectedSize(prevSize => {
        // 총 가격 업데이트
        const priceDifference = calculateTotalCostForSize(size);
        setTotalCost(prevTotalCost => prevTotalCost + priceDifference);
        return prevSize === size ? null : size;
      });
    }, [additionalCosts, selectedSize]);


  return (
    <div>
      <TourDetContainer containerHeight="2200px">
      <div className='to-bg-container'>
    <div className="to-container">
    <div className="to-div">
      <div>
      <img  src={'/assets/images/cake1.jpg'} className='to-cakeimg1'/>
      <img  src={'/assets/images/cake2.png'} className='to-cakeimg2'/>
      <img  src={'/assets/images/cake2.png'} className='to-cakeimg3'/>
      <img  src={'/assets/images/cake2.png'} className='to-cakeimg4'/>
    <div className="to-cakename">케이크이름</div>
    </div>

    <div>
      <div className='co-cakesm'>케이크 설명</div>
      <div className='co-cakesmct'
      >이거 케이크 예쁘고 멋지고 맛있어여 이거 케이크 예쁘고 멋지고 맛있어여 이거 케이크 예쁘고 멋지고 맛있어여</div >
    </div>

      <div className="to-cakeflavortitle">케이크 맛 선택
      </div>
      <div className='to-cf-container'>
      <div className='to-cakeflavor'>
          <div className="to-cf-1">
            <Checkbox
            checked={selectedFlavor === 'vanilla'}
            onChange={() => handleFlavorChange('vanilla')}
            ></Checkbox>
            <div className="to-cf-txt">바닐라</div>
           <div className='cf-st'>추가요금 : {additionalCosts.vanilla} 원</div>
          </div>
          <div className="to-cf-2">
          <Checkbox
          checked={selectedFlavor === 'chocolate'}
          onChange={() => handleFlavorChange('chocolate')}
          ></Checkbox>
            <div className="to-cf-txt1" >초콜릿</div>
            <div className='cf-st'>추가요금 : {additionalCosts.chocolate}원</div>
          </div>
          <div className="to-cf-3">
          <Checkbox
         checked={selectedFlavor === 'oreo'}
         onChange={() => handleFlavorChange('oreo')}
          ></Checkbox>
            <div className="to-cf-txt2" >오레오</div>
            <div className='cf-st'>추가요금 : {additionalCosts.oreo}원</div>
          </div>
          <div className="to-cf-4">
          <Checkbox 
          checked={selectedFlavor === 'fruit'}
          onChange={() => handleFlavorChange('fruit')}
          ></Checkbox>
            <div className="to-cf-txt3" >생과일</div>
            <div className='cf-st'>추가요금 : {additionalCosts.fruit}원</div>
          </div>
          
       
          </div>
        </div>
     
      <p className="to-btntxt">주문완료 후 일정 및 레터링 변경 불가능 합니다</p>
      <div className="to-reqbtn">
        <div className="to-overlap-group">
          <Link className="to-reqtxt" to={'/tourcompleteorder'}>요청하기</Link>
        </div>
      </div>
      <div className="to-cakeplusttitle">케이크 추가 요청사항</div>
      <input className="to-cakeplus"
                    type='text'
                    placeholder='요청사항을 입력하세요'
                   
                  />
      <div className="to-caketxttitle">케이크 위 문구</div>
      <input className="to-caketxt"
                    type='text'
                    placeholder='문구를 입력하세요'
                   
                  />
      <div className="to-cakesizetitle">케이크 크기선택</div>
   
       <div className='to-check-container'>
          <div className="to-check-1">
            <Checkbox
           checked={selectedSize === 'do'}
           onChange={() => handleSizeChange('do')}
            ></Checkbox>
            <div className="to-check1-txt" >도시락</div>
            <div className='check1-st'>추가요금 : {additionalCosts.do}원</div>
          </div>
          <div className="to-check-2">
          <Checkbox 
         checked={selectedSize === 'one'}
         onChange={() => handleSizeChange('one')}
          ></Checkbox>
            <div className="to-check-txt1">1호</div>
            <div className='check1-st'>추가요금 :{additionalCosts.one}원</div>
          </div>
          <div className="to-check-3">
          <Checkbox 
          checked={selectedSize === 'two'}
          onChange={() => handleSizeChange('two')}
          ></Checkbox>
            <div className="to-check-txt2" >2호</div>
            <div className='check1-st'>추가요금 : {additionalCosts.two}원</div>
          </div>
          <div className="to-check-4">
          <Checkbox 
          checked={selectedSize === 'three'}
          onChange={() => handleSizeChange('three')}
          ></Checkbox>
            <div className="to-check-txt3" >3호</div>
            <div className='check1-st'>추가요금 : {additionalCosts.three}원</div>
          </div>
       </div>
      <div className="rectangle" />
      <div className="to-userphonetitle">예약자 번호</div>
      <input className="to-userphone"
                    type='text'
                    placeholder='전화번호를 입력하세요'
                   
                  />
      <div className="to-time">픽업 시간</div>
      <DatePicker
        selected={pickupDateTime}
        onChange={(date) => setPickupDateTime(date)}
        showTimeSelect
        showTimeSelectOnly // Add this prop to only show the time picker
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="to-timetitle"
        customInput={<TimeInput />} // Use the TimeInput component for time picker
      />
      
   


      <div className="to-daytitle">픽업 날짜</div>
      <div className='to-datepicker-container'>
      <DatePicker 
        selected={pickupDate} 
        onChange={(date) => setPickupDate(date)}
        className="to-day"
        
        dateFormat="yyyy/MM/dd"
        customInput={<CustomInput />} // 여기에 커스텀 인풋을 추가합니다.
      />
      </div>

      </div>
      


      <div className="to-usernametitle">예약자 성함</div>
      <input className="to-username"
                    type='text'
                    placeholder='이름을 입력하세요'
                   
                  />
          </div>
          <div className="co-cakemoneytt">가격</div>
          <div className='co-cakemn'>{totalCost}</div>
          <div className='co-cakemoney'>원</div>
     
     
    </div>
    </TourDetContainer>
    </div>
            
              
  );
};


export default TourOrder;

function Checkbox({ checked, onChange }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
