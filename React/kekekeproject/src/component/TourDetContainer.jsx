import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../css/TourDetContainer.css'

const TourDetContainer = ({ children, containerHeight }) => {


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

    const [reviewData] = useState({
        id: 1,
        thumbnail: '/assets/images/cake1.jpg',
        status: '주문완료',
        orderDate: '2023.10.29',
        pickupDate: '2023.10.31',
        size: '도시락',
        flavor: '초콜릿',
        storeName: '주주케이크',
        productName: '곰돌이케이크',
        request: '이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당이렇게저렇게어쩌구해주시고이러케이러케이케부탁드립니당',
        customerName: '홍길동',
        reviewContent: '케이크가 너무 맛있어요! 다음에도 또 주문할게요!',
        reviewDate: '2023.10.30'
    });

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
                            <Link to="/SampleCake" className="sub-bar-item">샘플케이크</Link>
                            <Link to="/TourDet2" className="sub-bar-item">매장정보</Link>
                            <Link to="/TourDet3" className="sub-bar-item">리뷰</Link>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourDetContainer