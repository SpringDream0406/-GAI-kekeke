import React, { useState, useEffect, forwardRef,} from 'react';

import { Link } from 'react-router-dom';
import '../css/CustomCakeOrder.css'
import { useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api_url';
import BlueBg from '../component/BlueBg';




const CustomCakeOrder = () => {


  const [clientNum, setClientNum] = useState(null); // 번호
  const [selectedSize, setSelectedSize] = useState(null); // 사이즈
  const [clientName, setClientName] = useState(null); //예약자이름
  const [cakeFlavor, setCakeFlavor] = useState(null); // 맛
  const [cakeDetail, setCakeDetail] = useState(null); //문구
  const [custAddr, setCustAddr] = useState(null);
  const [addDetail, setAddDetail] = useState(null);
  const [pickupDateTime, setPickupDateTime] = useState(new Date()); // 픽업 날짜와 시간 상태
  const location = useLocation();
  const [savedImage, setSavedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pickupDate, setPickupDate] = useState(new Date()); // 날짜 선택을 위한 상태
  const [cust_id, setCustId] = useState(null); //회원아이디
 
  
  



  // 구매자 ID(cust_id불러오기)
  useEffect(() => {
    const userStorageData = sessionStorage.getItem('userData');
    if (userStorageData) {
      const userData = JSON.parse(userStorageData);
      console.log('세션 스토리지에서 가져온 유저아이디값:', userData.cust_id);
      setCustId(userData.cust_id);
    }
  }, []);

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageSrc = URL.createObjectURL(file);
      setSelectedImage(imageSrc); // 이미지 경로를 selectedImage 상태에 저장
    }
  };
  
  // 체크박스 선택 핸들러를 수정합니다.
  const handleCheckboxChange = (size) => {
    setSelectedSize(size);
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





   // 드롭다운 상태와 위치 선택 상태
   const [selectedLocation, setSelectedLocation] = useState("");
   const [showSelectLocation, setShowSelectLocation] = useState(false);

 
   // 위치 선택 핸들러
   const handleLocationSelect = (location) => {
     setSelectedLocation(location);
     setShowSelectLocation(false); // 선택 후 드롭다운 숨기기
   };
 
   const toggleSelectLocationDropdown = () => {
    setShowSelectLocation(!showSelectLocation);
  };



  

  // customCakeOrder-> oreder.js 데이터보낼려고사용함
  const navigate = useNavigate();
  const submitOrder = async () => {
    const url = `${API_URL}/order/custorders`;
    const orderDatainfo = document.getElementById('cakeImage');

    // FormData 객체 생성
    const customdata = new FormData();

    // 폼 데이터 추가
    customdata.append('clientNum', clientNum);
    customdata.append('cakeSize', selectedSize);
    customdata.append('clientName', clientName);
    customdata.append('cakeFlavor', cakeFlavor);
    customdata.append('cakeDetail', cakeDetail);
    customdata.append('addDetail', addDetail);
    customdata.append('pickupDate', pickupDate);
    customdata.append('pickupDateTime', pickupDateTime);
    customdata.append('custId', cust_id);
    customdata.append('custAddr', selectedLocation);
    
    // 이미지 파일 추가
    if (orderDatainfo.files && orderDatainfo.files[0]) {
      customdata.append('cakeImage', orderDatainfo.files[0]);
    }
 // 로컬 스토리지에서 저장된 이미지 처리
 const savedImageURL = localStorage.getItem('savedImage');
 if (savedImageURL) {
   try {
     const response = await fetch(savedImageURL);
     const blob = await response.blob();
     const file = new File([blob], "custom_cake_preview.jpg", { type: "image/jpeg" });
     customdata.append('previewImage', file);
     
    
   } catch (error) {
     console.error('로컬 스토리지 이미지 처리 중 오류 발생:', error);
   }
 }


 // 서버에 데이터 전송
 try {
   const response = await axios.post(url, customdata, {
     headers: { 'Content-Type': 'multipart/form-data' }
     
   });
   
  
   window.location.href = `/CustomcompleteOrder?orderResponse=${encodeURIComponent(JSON.stringify(response.data))}`;
   //navigate('/CustomcompleteOrder', { state: { orderResponse: response.data } });
  
 } catch (error) {
   alert(error.response.data.message);
    window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동
 }
};
   


 
  return (
    <div>
   
   
    <div className='co-bg-container'>
    
    <div className="co-container">
  
    <div className="co-div">
      <div className="co-cakeflavortitle">케이크 맛 선택
      <input className="co-cakeflovor"
                    type='text'
                    placeholder='케이크 맛을 입력하세요'
                    value={cakeFlavor}
                    onChange={(e)=>setCakeFlavor(e.target.value)}
                    maxLength={50}
                   
                  />
          </div>
     
      <p className="co-btntxt">주문완료 후 일정 및 레터링 변경 불가능 합니다</p>
      <div className="co-reqbtn">
        <div className="co-overlap-group">
          <Link className="co-reqtxt" to={'/CustomcompleteOrder'} onClick={submitOrder}>요청하기</Link>
        </div>
      </div>
      <div className="co-cakeplusttitle">케이크 추가 요청사항</div>
      <textarea
                  className="co-cakeplus"
                  maxLength="100"
                  placeholder="요청사항을 입력해주세요"
                  rows="2" // 원하는 줄 수를 설정할 수 있습니다.
                  cols="40" // 가로 너비를 문자 수로 설정할 수 있습니다.
                  style={{ resize: 'none' }} // 사용자가 크기를 조정하지 못하도록 설정합니다.
                  value={addDetail}
                  onChange={(e)=>setAddDetail(e.target.value)}
                ></textarea>
      <div className="co-caketxttitle">케이크 위 문구</div>
      <input className="co-caketxt"
                    type='text'
                    maxLength="50"
                    placeholder='문구를 입력하세요'
                    value={cakeDetail}
                    onChange={(e)=>setCakeDetail(e.target.value)}
                    
                  />
      <div className="co-cakesizetitle">케이크 크기선택</div>
   
       <div className='co-check-container'>
          <div className="co-check-1">
            <Checkbox
            size="도시락" 
            isChecked={selectedSize === "도시락"} 
            onChange={()=> handleCheckboxChange("도시락")}
            
            ></Checkbox>
            
          </div>
          <div className="co-check-2">
          <Checkbox
            size="1호" 
            isChecked={selectedSize === "1호"} 
            onChange={()=> handleCheckboxChange("1호")}
           
            ></Checkbox>
          </div>
          <div className="co-check-3">
          <Checkbox
            size="2호" 
            isChecked={selectedSize === "2호"} 
            onChange={()=> handleCheckboxChange("2호")}
           
            ></Checkbox>
          </div>
          <div className="co-check-4">
          <Checkbox
            size="3호" 
            isChecked={selectedSize === "3호"} 
            onChange={()=> handleCheckboxChange("3호")}
           
            ></Checkbox>
          </div>
       </div>
      <div className="rectangle" />
      <div className="co-userphonetitle">예약자 번호</div>
      <input className="co-userphone"
                    type='text'
                    placeholder='전화번호를 입력하세요'
                    value={clientNum}
                    onChangeCapture={(e)=>setClientNum(e.target.value)}
                   
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
       locale={ko}
       minDate={new Date()}
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


 <div className="co-choad">주소 선택</div>


 <input
 className='cc-input'
 type="text" // input 태그의 type을 "text"로 지정
 value={selectedLocation} // 선택된 주소를 input에 표시
 readOnly // input이 읽기 전용임을 명시
 placeholder='주소를 선택해주세요'
 onClick={toggleSelectLocationDropdown} // input 클릭 시 드롭다운 메뉴 토글
/>

{showSelectLocation && (
      <SelectLocation 
        selectedLocation={selectedLocation}
        handleLocationSelect={handleLocationSelect} // 위치 선택 함수를 prop으로 전달
      />
    )}
  <div className="co-custompic">
</div>
      <div className="co-usernametitle">예약자 성함</div>
      <input className="co-username"
                    type='text'
                    placeholder='이름을 입력하세요'
                    value={clientName}
                    onChange={(e)=>setClientName(e.target.value)}
                   
                  />
          </div>
       
          
    </div>

   
    </div>
    <BlueBg height={1800} top={-2000}/>
    </div>
  )
}

export default CustomCakeOrder



function Checkbox({ size, isChecked, onChange }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onChange(size)}
        />
        {size}
      </label>
    </div>
  );
}

const SelectLocation = ({ handleLocationSelect }) => {



  return (
    <div className="cco-location">

      <div className="cco-select-location-2" onClick={() => handleLocationSelect("광주광역시")}>
        <div className="cco-select-gj">광주광역시</div>
      </div>
      <div className="cco-select-location-2" onClick={() => handleLocationSelect("남구")}>
        <div className="cco-select-gu">남구</div>
      </div>
      <div className="cco-select-location-2" onClick={() => handleLocationSelect("서구")}>
        <div className="cco-select-gu">서구</div>
      </div>
      <div className="cco-select-location-2" onClick={() => handleLocationSelect("광산구")}>
        <div className="cco-select-gu-gu">광산구</div>
      </div>
      <div className="cco-select-location-2" onClick={() => handleLocationSelect("동구")}>
        <div className="cco-select-gu">동구</div>
      </div>
      <div className="cco-select-location-2" onClick={() => handleLocationSelect("북구")}>
        <div className="cco-select-gu">북구</div>
      </div>
   
    </div>

  );
};