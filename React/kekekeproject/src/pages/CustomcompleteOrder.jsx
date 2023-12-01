import React, { useEffect, useState } from "react";
import "../css/CustomcompleteOrder.css";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api_url';
import BlueBg from "../component/BlueBg";


const CustomcompleteOrder = () => {
  const location = useLocation();
  const [custid, setCustId] = useState()
  const [customInfo, setCustomInfo] = useState(null);


 
  // 구매자 ID(cust_id불러오기)
  useEffect(() => {
    const userStorageData = sessionStorage.getItem('userData');
    if (userStorageData) {
      const userData = JSON.parse(userStorageData);
      setCustId(userData.cust_id);
  
    }
  }, []);

 

  // cust_id를가지고  커스텀데이터 조회
  useEffect(() => { 
    const custData = async () => {
      try {
        const response = await axios.post(`${API_URL}/store/custom`, { cust_id :custid });
        setCustomInfo(response.data); 
      
      } catch (error) {
        console.error('오류:', error);
      }
    };
   
    if (custid) {
      custData();
    }
  }, [custid]); 

  useEffect(()=>{
console.log("나다",customInfo);
  },[customInfo])
  
  //커스텀 이미지 처리
  useEffect(() => {
    if (customInfo?.CUSTOM_IMG) {
      const imagePath = customInfo.CUSTOM_IMG.split("\\").join("/");
      console.log(imagePath);
    }
  }, [customInfo]);


   
 
  return (
    <div className="tour-detail-container1">
      <div className="tco-mt12">주문내역 확인</div>
      <div className="image-container">
        {customInfo?.CUSTOM_IMG && (
          <img src={`/${customInfo.CUSTOM_IMG.substring("public/".length)}`} className="tco-cakeimg4" alt="케이크1" />
        )}
        {customInfo?.CUST_DRAW && (
          <img src={`/${customInfo.CUST_DRAW.substring("public/".length)}`} className="tco-cakeimg3" alt="케이크2" />
        )}
      </div>
      <div className="tco-mt-container2">
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

       
      </div>
      
      <div className="tco-st-container2">
        <div className="tco-st-1">
        {customInfo ? customInfo.CLIENT_NAME : "정보없음"}
        </div>
       
        <div className="tco-st-2">
        {customInfo ? customInfo.CLIENT_NUM : "정보없음"}
        </div>

        <div className="tco-st-3">
        {customInfo ? customInfo.CAKE_SIZE : "정보없음"}
        </div>

        <div className="tco-st-4">
        {customInfo ? customInfo.CAKE_FLAVOR : "정보없음"}
        </div>
        <div className="tco-st-5">
        {customInfo ? customInfo.CAKE_DETAIL : "정보없음"}
        </div>

        <div className="tco-st-6">
        {customInfo ? customInfo.ADD_DETAIL : "정보없음"}
        </div>

       
      </div>

    {/* 버튼 컨테이너 */}
    <div className="tco-btn-container1">
    <Link to={{
        pathname: '/message',
        state: { CUSTOM_ID: customInfo?.CUSTOM_ID } // 커스텀 ID를 전달
        }} className='tco-msgbtn'>문의하기</Link>

    <Link to={{
        pathname: '/mporderlist',
        state: { CUSTOM_ID: customInfo?.CUSTOM_ID }
    }} className='tco-okbtn'> 확인</Link>
    </div>

    <BlueBg top={340} height={2300}/>
        </div>
    );
    };

    export default CustomcompleteOrder;
