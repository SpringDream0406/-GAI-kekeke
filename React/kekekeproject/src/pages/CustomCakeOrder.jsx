import React, { useState, useEffect, forwardRef,} from 'react';
import Blue_Box from '../component/Blue_Box.jsx'
import { Link } from 'react-router-dom';
import '../css/CustomCakeOrder.css'
import { useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';




const CustomCakeOrder = () => {







  const [pickupDateTime, setPickupDateTime] = useState(new Date()); // 픽업 날짜와 시간 상태
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const imageUrl = searchParams.get('image');
  const [startDate, setStartDate] = useState(new Date());
  const [savedImage, setSavedImage] = useState(null);
  const [pickupTime, setPickupTime] = useState(''); // 픽업 시간 상태
  console.log(location.state); // 상태 확인을 위해 콘솔에 출력
  const [selectedImage, setSelectedImage] = useState(null);
  const [pickupDate, setPickupDate] = useState(new Date()); // 날짜 선택을 위한 상태


  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageSrc = URL.createObjectURL(file);
      setSelectedImage(imageSrc); // 이미지 경로를 selectedImage 상태에 저장
    }
  };
  
  const handlePickupTimeChange = (e) => {
    setPickupTime(e.target.value); // 시간 상태 업데이트
  };

  const TimeInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-time-input timetitle" onClick={onClick} ref={ref}>
      {value}
      <FontAwesomeIcon icon={faClock} className='co-time-icon' onClick={onClick} />
    </button>
  ));

 
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input co-day" onClick={onClick} ref={ref}>
      {value}
      <FontAwesomeIcon icon={faCalendarAlt} className='co-day-icon' onClick={onClick} />
    </button>
  ));

  useEffect(() => {
    const image = localStorage.getItem('savedImage');
    if (image) {
      setSavedImage(image);
    }
  }, []);


  return (
    <div className='co-bg-container'>
    <div className="co-container">
    <div className="co-div">
      <div className="co-cakeflavortitle">케이크 맛 선택
      <input className="co-cakeflovor"
                    type='text'
                    placeholder='케이크 맛을 입력하세요'
                   
                  />
          </div>
     
      <p className="co-btntxt">주문완료 후 일정 및 레터링 변경 불가능 합니다</p>
      <div className="co-reqbtn">
        <div className="co-overlap-group">
          <Link className="co-reqtxt" to={'/tourcompleteorder'}>요청하기</Link>
        </div>
      </div>
      <div className="co-cakeplusttitle">케이크 추가 요청사항</div>
      <input className="co-cakeplus"
                    type='text'
                    placeholder='문구를 입력하세요'
                   
                  />
      <div className="co-caketxttitle">케이크 위 문구</div>
      <input className="co-caketxt"
                    type='text'
                    placeholder='문구를 입력하세요'
                   
                  />
      <div className="co-cakesizetitle">케이크 크기선택</div>
   
       <div className='co-check-container'>
          <div className="co-check-1">
            <Checkbox></Checkbox>
            <div className="co-check1-txt">도시락</div>
          </div>
          <div className="co-check-2">
          <Checkbox></Checkbox>
            <div className="co-check-txt1">1호</div>
          </div>
          <div className="co-check-3">
          <Checkbox></Checkbox>
            <div className="co-check-txt2">2호</div>
          </div>
          <div className="co-check-4">
          <Checkbox></Checkbox>
            <div className="co-check-txt3">3호</div>
          </div>
       </div>
      <div className="rectangle" />
      <div className="co-userphonetitle">예약자 번호</div>
      <input className="co-userphone"
                    type='text'
                    placeholder='전화번호를 입력하세요'
                   
                  />
      <div className="co-time">픽업 시간</div>
      <DatePicker
  selected={pickupDateTime}
  onChange={(date) => setPickupDateTime(date)}
  showTimeSelect
  showTimeSelectOnly // Add this prop to only show the time picker
  timeFormat="HH:mm"
  timeIntervals={15}
  timeCaption="Time"
  dateFormat="h:mm aa"
  className="co-timepicker"
  customInput={<TimeInput />} // Use the TimeInput component for time picker
/>
      
   


      <div className="co-daytitle">픽업 날짜</div>
      <div className='co-datepicker-container'>
      <DatePicker 
        selected={pickupDate} 
        onChange={(date) => setPickupDate(date)}
        className="co-day"
        
        dateFormat="yyyy/MM/dd"
        customInput={<CustomInput />} // 여기에 커스텀 인풋을 추가합니다.
      />
      </div>
      <p className="co-omgtitle">참고할 케이크 이미지 사진 첨부(택)</p>
      <div className="co-imgpic" >
      <label htmlFor="cakeImage" className='cakeImage'>이미지 첨부하기</label>
      <input
            id="cakeImage"
            className="co-imgpic-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange} // 파일 선택 시 핸들러 호출
          />
     {selectedImage && (
  <img
    src={selectedImage}
    className='co-selected-image'
    alt="Uploaded Cake"
    style={{ maxWidth: '100%' }}
  />
)}


      </div>
      <div className="co-costomtitle">내가 만든 커스텀케이크</div>
    
      {savedImage && (
  <img
    src={savedImage}
     className='co-custompic'
    alt="Custom Cake Preview"
    style={{ maxWidth: '100%', height: 'auto' }} // 이미지 스타일 조정
  />
)}
<div className='white-bg'/>





  <div className="co-custompic">
</div>
      <div className="co-usernametitle">예약자 성함</div>
      <input className="co-username"
                    type='text'
                    placeholder='이름을 입력하세요'
                   
                  />
          </div>
     
    </div>

 

    </div>
 
  )
}

export default CustomCakeOrder



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