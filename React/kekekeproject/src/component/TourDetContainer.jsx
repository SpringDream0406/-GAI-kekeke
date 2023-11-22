import React from "react";
import { Link } from 'react-router-dom';
import '../css/TourDetContainer.css'
import { useLocation } from 'react-router-dom';


const TourDetContainer = ({ children, containerHeight }) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
  
    const prd_id = searchParams.get('prd_id');
    console.log('가게정보cake_prd_id:', prd_id);
  

    const containerStyle = {
        height: containerHeight || 'auto', // prop으로 받은 높이 또는 기본값 'auto'
      };

    const storeInfo = {
        StoreLogo: '/assets/images/cakelogo1.jpg',
        CakeStoreName: '랑랑케이크',
        StoreAddr: '강남구 도곡동',
        StoreDetail: '강남구 도곡동에 위치한 주문제작 및 클래스 공방입니다. 사랑과 정성이 깃든 수제케이크로 당신의 소중한 순간을 더욱 특별하게 만들어드립니다! 달콤한 순간을 케이크와 함께 최상의 재료와 정성이 담긴 수제케이크로 당신을 맞이합니다.',
        CakeName: '티아라케이크',
        ReviewDate: '2023.10.31',
        ReviewCust: "홍길동"
    };

    return (
        <div className="frame">
                <div className="tour-detail-container"  style={containerStyle}>
            <div className="frameTour">

                    <div className="tour-detail-content">
                        <div className="store-info-section">
                            <img className="store-logo" src={storeInfo.StoreLogo} alt={storeInfo.CakeName} />
                            <div className="store-text-content">
                                <p className="Tour-store-name">{storeInfo.CakeStoreName}</p>
                                <p className="store-address">{storeInfo.StoreAddr}</p>
                                <p className="store-description">{storeInfo.StoreDetail}</p>
                            </div>
                            <button className="chat-button">
                                <span className="chat-text">1:1 채팅</span>
                            </button>
                        </div>
                        <div className="sub-bar">
                            <Link to="/samplecake" className="sub-bar-item">샘플케이크</Link>
                            <Link to="/tour-det2" className="sub-bar-item">매장정보</Link>
                            <Link to="/tour-det3" className="sub-bar-item">리뷰</Link>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourDetContainer