import React , {useEffect, useState} from "react";
import "../css/AdHeader.css";
import { Link } from "react-router-dom";

const Ad_Header = () => {

  const [sellerinfo, setSellerInfo] = useState({});

  // 세션 스토리지에서 데이터 불러오기
useEffect(() => {
  const adminStorageData = sessionStorage.getItem('adminData');
  if (adminStorageData) {
    const adminData = JSON.parse(adminStorageData);
    console.log('Data from Session Storage:', adminData);
    setSellerInfo(adminData);
  }
}, []);

    return (

        <div className="adminhd-container">
         
          <div className="view">
          <div className="view-2">
              <div className="text-wrapper">사장님</div>
              </div>
            <div className="view-2">
              <div className="text-wrapper2">{sellerinfo.seller_id}</div>
            </div>
            <Link to={'/admin'}>
            <div className="view-3" />
            </Link>
             <div className="ellipse-wrapper">
                   <img className="ellipse" src="/assets/images/cake1.jpg" alt="케이크2"/>
                   </div>
             
             
           
          
       
          </div>
        </div>
      
    );
  };
export default  Ad_Header;