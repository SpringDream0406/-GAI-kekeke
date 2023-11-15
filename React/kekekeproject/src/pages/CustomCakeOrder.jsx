import React, { useState, useEffect, forwardRef } from 'react';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import '../css/CustomCakeOrder.css'
import { useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const CustomCakeOrder = () => {

  
  const [startDate, setStartDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());

  const location = useLocation();
  console.log(location.state); // 상태 확인을 위해 콘솔에 출력
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // 이미지 URL 상태를 추가합니다.

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setSelectedImage(file); // 파일 자체를 상태에 저장합니다.
      setImageUrl(objectUrl); // 생성된 URL을 상태에 저장합니다.
    }
  };

  const TimeInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-time-input-time co-timetitle" onClick={onClick} ref={ref}>
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
    // selectedImage가 변경될 때마다 이전 이미지 URL을 해제합니다.
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]); // imageUrl에 대한 의존성을 추가합니다.
  return (
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
          <div className="co-reqtxt">요청하기</div>
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
      <div className="rectangle" />
      <div className="co-userphonetitle">예약자 번호</div>
      <input className="co-userphone"
                    type='text'
                    placeholder='전화번호를 입력하세요'
                   
                  />
      <div className="co-time">픽업 시간</div>
    <div className='co-timetitle'/>
   
   
      <div className="co-daytitle">픽업 날짜</div> 
      
      <DatePicker 
        selected={startDate} 
        onChange={(date) => setStartDate(date)} 
        className="co-day"
        dateFormat="yyyy/MM/dd"
        customInput={<CustomInput />} // 여기에 커스텀 인풋을 추가합니다.
      />
      
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
          {/* 이미지가 선택되었을 때 이미지를 표시 */}
         {/* 이미지 URL이 있을 때 이미지를 표시합니다. */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Selected Cake Image"
            className="co-selected-image"
          />
        )}
      </div>
      <div className="co-costomtitle">내가 만든 커스텀케이크</div>
      <div className="co-custompic">
  {selectedImage && <img src={selectedImage} alt="Custom Cake" />}
</div>
      <div className="co-usernametitle">예약자 성함</div>
      <input className="co-username"
                    type='text'
                    placeholder='이름을 입력하세요'
                   
                  />
          </div>
     
          </div>
 

  )
}

export default CustomCakeOrder