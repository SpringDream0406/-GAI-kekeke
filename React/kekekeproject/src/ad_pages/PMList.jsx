// 상품 관리의 상품 목록 페이지

import React from 'react'
import AdMT from '../ad_component/AdMT'
import Ad_BG from '../ad_component/Ad_BG'
import Ad_Menubar from '../component/Ad_Menubar'
import ProductManagement from '../ad_component/ProductManagement'
import '../ad_css/PMList.css'

const PMList = () => {

  const products = [
    {
      id: 1,
      imageUrl: "/assets/images/cake1.jpg", // 상품 이미지 경로
      name: "플라워 케이크플라워 케이크플라워 케이크", // 상품명
      price: "50000", // 상품 가격
      status: "판매중", // 판매 상태
      sales: "21" // 누적 판매량
    },
    {
      id: 2,
      imageUrl: "/assets/images/cake2.png",
      name: "베리 초콜릿 케이크",
      price: "45000",
      status: "판매중",
      sales: "34"
    },
    // 더 많은 상품 데이터를 추가할 수 있습니다.
  ];

  
  return (
    <div>
      <AdMT>상품목록</AdMT>
      <Ad_Menubar/>
      <Ad_BG height="1050px">
      <ProductManagement initialActiveTab="list" />
    <div className="product-list">

    <div className="product-list-header">
        <div className="header-image">상품 이미지</div>
        <div className="header-name">상품명</div>
        <div className="header-price">상품 가격</div>
        <div className="header-status">판매 상태</div>
        <div className="header-sales">누적 판매량</div>
      </div>


      {products.map((product, index) => (
        <div key={index} className="product-item">
          <div className="product-image">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          <div className="product-details">
            <div className="product-name">{product.name}</div>
            <div className="product-price">{product.price}원</div>
            <div className="product-status">{product.status}</div>
            <div className="product-sales">{product.sales}</div>
          </div>
          <div className="product-actions">
            <button className="edit-button">수정</button>
            <div className="delete-icon">&#128465;</div>
          </div>
        </div>
      ))}
    </div>

      </Ad_BG>
  
    </div>

  )
}

export default PMList