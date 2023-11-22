import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import '../css/TourDetContainer.css'
import { useLocation } from 'react-router-dom';
import axios from "axios";
import API_URL from "../api_url";

const TourDetContainer = ({ children, containerHeight, storeInfo  }) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
  
    const prd_id = searchParams.get('prd_id');
    console.log('가게정보cake_prd_id:', prd_id);
  

  
    const containerStyle = {
        height: containerHeight || 'auto', // prop으로 받은 높이 또는 기본값 'auto'
      };
 
 

 
   

    return (
        <div className="frame">
                <div className="tour-detail-container"  style={containerStyle}>
            <div className="frameTour">

                    <div className="tour-detail-content">
                        <div className="store-info-section">
                            <img className="store-logo" src={`img/seller/${storeInfo?.CakeLogo}`} alt={storeInfo?.StoreName} />
                            <div className="store-text-content">
                                <p className="Tour-store-name">{storeInfo?.StoreName}</p>
                                <p className="store-address">{storeInfo?.StoreAddr1}</p>
                                <p className="store-description">{storeInfo?.StoreDetail}</p>
                            </div>
                            <button className="chat-button">
                                <span className="chat-text">1:1 채팅</span>
                            </button>
                        </div>
                        <div className="sub-bar">
                            <Link to={`/samplecake?prd_id=${prd_id}`} className="sub-bar-item">샘플케이크</Link>
                            <Link to={`/tour-det2?prd_id=${prd_id}`} className="sub-bar-item">매장정보</Link>
                            <Link to={`/tour-det3?prd_id=${prd_id}`} className="sub-bar-item">리뷰</Link>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourDetContainer