import React, { useState, useEffect, forwardRef} from 'react';
import { Link } from "react-router-dom";
import "../css/TourOrder.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import TourDetContainer from '../component/TourDetContainer'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api_url';





export const TourOrder = () => {
  
  const [cakeprice, setCakeprice] = useState(30000); // This sets the initial total cost.
  const [pickup_time, setPickupTime] = useState(new Date());
  const [pickup_date, setPickupDate] = useState(new Date());
  const [cake_flavor, setCakeFlavor] = useState(null);
  const [cake_size, setCakeSize] = useState(null);
  const [cake_name] = useState(null);
  const [add_require, setAddRequire] = useState(null);
  const [lettering, setLettering] = useState(null);
  const [order_name, setOrderName] = useState(null);
  const [order_num, setOrderNum] = useState(null);



  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const prd_id = searchParams.get('prd_id');
  console.log('가게정보cake_prd_id:', prd_id);

  const [order_user, setOrderUser] = useState(null);

  const [storeInfo, setStoreInfo] = useState(null); // 가게 정보 상태 추가

  const [seller_id, setSellerId] = useState(null);

  const [cust_id, setCustId] = useState(null);

 



  const selectedCake = location.state && JSON.parse(location.state.cake);
  const cake = selectedCake || {}; // 기본값으로 빈 객체 설정

  // 구매자 ID(cust_id불러오기)
  useEffect(() => {
    const userStorageData = sessionStorage.getItem('userData');
    if (userStorageData) {
      const userData = JSON.parse(userStorageData);
      console.log('세션 스토리지에서 가져온 유저아이디값:', userData.cust_id);
      setCustId(userData.cust_id);
    }
  }, []);


  useEffect(() => { //prd_id를가지고 데이터를 가져올거임 tourDetContainer
    const postData = async () => {
      try {
        const response = await axios.post(`${API_URL}/store/tour-order`, { prd_id: prd_id });
        const data = response.data[0];
        setStoreInfo({
           CakeLogo :  data.SELLER_PROFILE1,
           StoreName : data.STORE_NAME,
           StoreAddr1 : data.SHOP_ADDR1,
           StoreDetail: data.STORE_DETAIL
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

  useEffect(() => {
    console.log('둘러보기에서 보내준 케이크 객체값', selectedCake);
  }, [selectedCake]);

 

 // 빈 의존성 배열을 전달하여 이 효과가 초기 렌더링 중에만 실행되도록 합니다.



  
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

  const calculateTotalCostForFlavor = (flavor) => {
    // 새로운 맛을 선택한 경우 추가요금을 계산하고, 그렇지 않으면 이전에 선택된 맛의 추가요금을 빼야 합니다.
    const costToAdd = flavor ? additionalCosts[flavor] : 0;
    const costToSubtract = cake_flavor ? additionalCosts[cake_flavor] : 0;
    return costToAdd - costToSubtract;
  };

  // 크기 선택에 대한 가격 계산 로직
  const calculateTotalCostForSize = (size) => {
    // 새로운 크기를 선택한 경우 추가요금을 계산하고, 그렇지 않으면 이전에 선택된 크기의 추가요금을 빼야 합니다.
    const costToAdd = size ? additionalCosts[size] : 0;
    const costToSubtract = cake_size ? additionalCosts[cake_size] : 0;
    return costToAdd - costToSubtract;
  };

  // 맛 선택 핸들러
  const handleFlavorChange = (flavor) => {
    setCakeFlavor((prevFlavor) => {
      // 총 가격 업데이트
      const priceDifference = calculateTotalCostForFlavor(flavor);
      setCakeprice((prevTotalCost) => prevTotalCost + priceDifference);
      return prevFlavor === flavor ? null : flavor;
    });
  };

  // 크기 선택 핸들러
  const handleSizeChange = (size) => {
    setCakeSize((prevSize) => {
      // 총 가격 업데이트
      const priceDifference = calculateTotalCostForSize(size);
      setCakeprice((prevTotalCost) => prevTotalCost + priceDifference);
      return prevSize === size ? null : size;
    });
  };

  // 요청하기 눌렀을때, 상품 주문내역 DB테이블에 저장
  const submitOrder = () => {
    const url = `${API_URL}/cust/order`;

    const orderData = {
      cake_name: cake_name,
      cust_id: cust_id,
      add_require: add_require,
      cake_size: cake_size,
      cake_flavor: cake_flavor,
      cake_price: cakeprice,
      lettering: lettering,
      order_name: order_name,
      order_num: order_num,
      pickup_date: pickup_date.toISOString(),
      pickup_time: pickup_time.toISOString(),
    };

    axios
      .post(url, orderData)
      .then((response) => {
        console.log('주문이 성공적으로 전송되었습니다.', response.data);
        // 주문이 성공적으로 전송되었을 때 할 작업을 추가할 수 있습니다.
      })
      .catch((error) => {
        console.error('주문 전송 에러', error);
        // 주문 전송에 실패했을 때 에러 처리를 추가할 수 있습니다.
      });
  };


  return (
    <div>
      <TourDetContainer containerHeight="2200px" storeInfo={storeInfo}>
      <div className='to-bg-container'>
    <div className="to-container">
    <div className="to-div">
      <div>
      <img  src={'/assets/images/cake1.jpg'} className='to-cakeimg1' alt='cake1'/>
      <img  src={'/assets/images/cake2.png'} className='to-cakeimg2' alt='cake2'/>
      <img  src={'/assets/images/cake2.png'} className='to-cakeimg3' alt='cake3'/>
      <img  src={'/assets/images/cake2.png'} className='to-cakeimg4' alt='cake4'/>
    <div className="to-cakename"
    value={cake_name}
    >{prd_id}</div>
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
            checked={cake_flavor === 'vanilla'}
            onChange={() => handleFlavorChange('vanilla')}
            value={cake_flavor}
            ></Checkbox>
            <div className="to-cf-txt">바닐라</div>
           <div className='cf-st'>추가요금 : {additionalCosts.vanilla} 원</div>
          </div>
          <div className="to-cf-2">
          <Checkbox
          checked={cake_flavor === 'chocolate'}
          onChange={() => handleFlavorChange('chocolate')}
          ></Checkbox>
            <div className="to-cf-txt1" >초콜릿</div>
            <div className='cf-st'>추가요금 : {additionalCosts.chocolate}원</div>
          </div>
          <div className="to-cf-3">
          <Checkbox
         checked={cake_flavor === 'oreo'}
         onChange={() => handleFlavorChange('oreo')}
          ></Checkbox>
            <div className="to-cf-txt2" >오레오</div>
            <div className='cf-st'>추가요금 : {additionalCosts.oreo}원</div>
          </div>
          <div className="to-cf-4">
          <Checkbox 
          checked={cake_flavor === 'fruit'}
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
          <Link className="to-reqtxt" to={`/tour-complete-order?prd_id=${prd_id}`}
          onClick={submitOrder}>요청하기</Link>
        </div>
      </div>
      <div className="to-cakeplusttitle">케이크 추가 요청사항</div>
      <input className="to-cakeplus"
                    type='text'
                    placeholder='요청사항을 입력하세요'
                    value={add_require}
                    onChange={(e)=>setAddRequire(e.target.value)}
                  />
      <div className="to-caketxttitle">케이크 위 문구</div>
      <input className="to-caketxt"
                    type='text'
                    placeholder='문구를 입력하세요'
                    value={lettering}
                    onChange={(e)=>setLettering(e.target.value)}
                  />
      <div className="to-cakesizetitle">케이크 크기선택</div>
   
       <div className='to-check-container'>
          <div className="to-check-1">
            <Checkbox
           checked={cake_size === 'do'}
           onChange={() => handleSizeChange('do')}
           value={cake_size}
            ></Checkbox>
            <div className="to-check1-txt" >도시락</div>
            <div className='check1-st'>추가요금 : {additionalCosts.do}원</div>
          </div>
          <div className="to-check-2">
          <Checkbox 
         checked={cake_size === 'one'}
         onChange={() => handleSizeChange('one')}
          ></Checkbox>
            <div className="to-check-txt1">1호</div>
            <div className='check1-st'>추가요금 :{additionalCosts.one}원</div>
          </div>
          <div className="to-check-3">
          <Checkbox 
          checked={cake_size === 'two'}
          onChange={() => handleSizeChange('two')}
          ></Checkbox>
            <div className="to-check-txt2" >2호</div>
            <div className='check1-st'>추가요금 : {additionalCosts.two}원</div>
          </div>
          <div className="to-check-4">
          <Checkbox 
          checked={cake_size === 'three'}
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
                    value={order_num}
                    onChange={(e)=>setOrderNum(e.target.value)}
                  />
      <div className="to-time">픽업 시간</div>
      <DatePicker
        selected={pickup_time}
        onChange={(date) => setPickupTime(date)}
        showTimeSelect
        showTimeSelectOnly // Add this prop to only show the time picker
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="to-timetitle"
        value={pickup_time}
        customInput={<TimeInput />} // Use the TimeInput component for time picker
      />
      
   
      <div className="to-daytitle">픽업 날짜</div>
      <div className='to-datepicker-container'>
      <DatePicker 
        selected={pickup_date} 
        onChange={(date) => setPickupDate(date)}
        className="to-day"
        value={pickup_date}
        dateFormat="yyyy/MM/dd"
        customInput={<CustomInput />} // 여기에 커스텀 인풋을 추가합니다.
      />
      </div>

      </div>
      
      <div className="to-usernametitle">예약자 성함</div>
      <input className="to-username"
                    type='text'
                    placeholder='이름을 입력하세요'
                    value={order_name}
                    onChange={(e)=>setOrderName(e.target.value)}
                  />
          </div>
          <div className="co-cakemoneytt">가격</div>
          <div className='co-cakemn' value={cakeprice}>{cakeprice}</div>
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