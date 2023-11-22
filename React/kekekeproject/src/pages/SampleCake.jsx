import "../css/SampleCake.css";
import "../component/TourDetContainer"
import TourDetContainer from "../component/TourDetContainer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../api_url";
import { useLocation } from 'react-router-dom';
import PageButton from '../component/PageButton';
import "../css/SampleCake.css";

const SampleCake = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cakesPerPage = 12;
  const [storeInfo, setStoreInfo] = useState(null);
  const [sellerProducts, setSellerProducts] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const prd_id = searchParams.get('prd_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (prd_id) {
          const response = await axios.post(`${API_URL}/sample/samplecake`, { prd_id });
          const responseData = response.data;

          // 상태 업데이트
          setStoreInfo({
            CakeLogo: responseData.productInfo.SELLER_PROFILE1,
            StoreName: responseData.productInfo.STORE_NAME,
            StoreAddr1: responseData.productInfo.SHOP_ADDR1,
            StoreDetail: responseData.productInfo.STORE_DETAIL
          });

          setSellerProducts(responseData.sellerProducts);
          console.log('답',responseData)
          console.log(sellerProducts);
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [prd_id]);

  // 페이지 번호 계산
  const indexOfLastCake = currentPage * cakesPerPage;
  const indexOfFirstCake = indexOfLastCake - cakesPerPage;
  const currentCakes = sellerProducts.slice(indexOfFirstCake, indexOfLastCake);

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sellerProducts.length / cakesPerPage); i++) {
    pageNumbers.push(i);
  }


  // 이전 페이지 이동 함수
  const goToPrevPage = () => {
    setCurrentPage(prev => prev > 1 ? prev - 1 : 1);
  };

  // 다음 페이지 이동 함수
  const goToNextPage = () => {
    const totalPages = Math.ceil(sellerProducts.length / cakesPerPage);
    setCurrentPage(prev => prev < totalPages ? prev + 1 : totalPages);
  };

  return (
    <div className="Sample__Container">
      <TourDetContainer containerHeight='1900px' storeInfo={storeInfo}>
      
        <div className="Sam_index">
          <div className="Sam_samplecontainer">
            
                {currentCakes.map((product, index) => (
              <div key={index} className="Sam_cake-item">
                <img className="Sam_img" alt={product.PRD_NAME} src={`/img/product/${product.IMG_NAME2}`} />
                <div className="Sam_cake-name">{product.PRD_NAME}</div>
                <div className="Sam_cake-price">{product.PRD_AMT}</div>
              </div>
            ))}
          </div>
          {/* 페이징 */}
          <div className="Samplepagination">
            <PageButton type="prev" onClick={goToPrevPage} />
            {pageNumbers.map(num => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`page-number ${currentPage === num ? 'active' : ''}`}
              >
                {num}
              </button>
            ))}
            <PageButton type="next" onClick={goToNextPage} />
          </div>
        </div>
      </TourDetContainer>
    </div>

     
  );
};

export default SampleCake;
