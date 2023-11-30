
import React, { useState , useEffect } from "react";
import axios from 'axios';
import API_URL from '../api_url';
import { Link } from 'react-router-dom';
import '../css/TourDetContainer.css'
import { useLocation } from 'react-router-dom';


// import axios from "axios";
// import API_URL from "../api_url";

const TourDetContainer = ({ children, containerHeight, containerTop ,storeInfo, initialActiveTab }) => {
    const [custid, setCustId] = useState()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const prd_id = searchParams.get('prd_id');



    console.log('가게정보cake_prd_id:', prd_id);

// 구매자 ID(cust_id불러오기)
useEffect(() => {
    const userStorageData = sessionStorage.getItem('userData');
    if (userStorageData) {
      const userData = JSON.parse(userStorageData);
      console.log('세션 스토리지에서 가져온 유저아이디값:', userData.cust_id);
      setCustId(userData.cust_id);
    }
  }, []);


    const containerStyle = {
        height: containerHeight || 'auto', // prop으로 받은 높이 또는 기본값 'auto'
        top : containerTop || 'auto'
    };


    const [activeTab, setActiveTab] = useState(initialActiveTab);

    // const handleclickcheck = async () => {
    //     const chatroomData = {
    //       cust_id: custid,
    //       seller_id: storeInfo.seller_id,
    //       created_ID: new Date().toISOString().slice(0, 19).replace('T', ' '), // 문자열로 변환
    //       cons_or_oc: 'N',
    //     };
    
    //     try {
    //       // axios를 사용하여 서버로 POST 요청을 보냅니다.
    //       await axios.post(`${API_URL}/store/createchat`, chatroomData);
    
    //     } catch (error) {
    //       console.error('메시지 전송 오류:', error);
    //     }
    // };



    return (
        <div>
        <div className="frame">
          
            <div className="tour-detail-container" style={containerStyle}>
                <img src="/assets/images/bluebox.png" className="blue-bg"/>
                <div className="frameTour">

                    <div className="tour-detail-content">
                        <div className="store-info-section">
                            <img className="store-logo" src={`img/seller/${storeInfo?.CakeLogo}`} alt={storeInfo?.StoreName} />
                            <div className="store-text-content">
                                <p className="Tour-store-name">{storeInfo?.StoreName}</p>
                                <p className="store-address">{storeInfo?.StoreAddr1}</p>
                                <p className="store-description">{storeInfo?.StoreDetail}</p>
                            </div>
                            <Link to={'/usermessage'} className="chat-button">
                                <span className="chat-text" /*onClick={handleclickcheck}*/>1:1 채팅</span>
                            </Link>
                        </div>



                        <div className="sub-bar">
                            <Link
                                to={`/samplecake?prd_id=${prd_id}`}
                                className={`sub-bar-item ${activeTab === 'samplecake' ? 'active' : ''}`}
                                onClick={() => setActiveTab('samplecake')}
                            >
                                샘플케이크
                            </Link>
                            <Link
                                to={`/tour-det2?prd_id=${prd_id}`}
                                className={`sub-bar-item ${activeTab === 'tour-det2' ? 'active' : ''}`}
                                onClick={() => setActiveTab('tour-det2')}
                            >
                                매장정보
                            </Link>
                            <Link
                                to={`/tour-det3?prd_id=${prd_id}`}
                                className={`sub-bar-item ${activeTab === 'tour-det3' ? 'active' : ''}`}
                                onClick={() => setActiveTab('tour-det3')}
                            >
                                리뷰
                            </Link>

                           

                            
                        </div>
                     
                        {children}
                    </div>
                   
                </div>
          
            </div>
      
        </div>

              </div>
    )
}

export default TourDetContainer