// 상품 관리의 상품 목록 페이지

import React, {useState} from 'react'
import AdMT from '../ad_component/AdMT'
import Ad_BG from '../ad_component/Ad_BG'
import Ad_Menubar from '../component/Ad_Menubar'
import ProductManagement from '../ad_component/ProductManagement'
import {FaTrash} from 'react-icons/fa';
import '../ad_css/PMList.css'

const PMList = () => {

  // 임시 데이터
  const products = [
    {
      id: 1,
      imageUrl: "/assets/images/cake1.jpg", // 상품 이미지 경로
      name: "플라워 케이크", // 상품명
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
    {
      id: 3,
      imageUrl: "/assets/images/cake1.jpg", // 상품 이미지 경로
      name: "플라워 케이크플라워 케이크플라워 케이크", // 상품명
      price: "50000", // 상품 가격
      status: "판매중", // 판매 상태
      sales: "21" // 누적 판매량
    },
    {
      id: 4,
      imageUrl: "/assets/images/cake2.png",
      name: "베리 초콜릿 케이크",
      price: "45000",
      status: "판매중",
      sales: "34"
    },
    {
      id: 5,
      imageUrl: "/assets/images/cake1.jpg", // 상품 이미지 경로
      name: "플라워 케이크플라워 케이크플라워 케이크", // 상품명
      price: "50000", // 상품 가격
      status: "판매중", // 판매 상태
      sales: "21" // 누적 판매량
    },
    {
      id: 6,
      imageUrl: "/assets/images/cake2.png",
      name: "베리 초콜릿 케이크",
      price: "45000",
      status: "판매중",
      sales: "34"
    },
  ];

    // 검색어 상태와 필터링된 상품 목록 상태 추가
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
  
    // 검색 버튼 클릭 이벤트 핸들러
    const handleSearch = () => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    };

    // ---------------------------------------------
    const [editingProductId, setEditingProductId] = useState(null);
    const [editProductDetails, setEditProductDetails] = useState({});
  
    const handleEdit = (product) => {
      setEditingProductId(product.id);
      setEditProductDetails({ name: product.name, price: product.price, status: product.status, sales: product.sales });
    };
  
    // 확인 버튼 클릭 핸들러
    // 입력값 저장해서 바뀌게 하는 부분

    const handleConfirm = () => {
      // 새로운 상품 정보 배열 생성
      const updatedProducts = filteredProducts.map((product) => {
        if (product.id === editingProductId) {
          return { ...product, ...editProductDetails };
        }
        return product;
      });
    
      setFilteredProducts(updatedProducts); // 상태 업데이트
      setEditingProductId(null); // 편집 모드 종료
    };
  
    // 편집 모드에서 입력 변경 핸들러
    const handleInputChange = (e, field) => {
      setEditProductDetails({ ...editProductDetails, [field]: e.target.value });
    };

    
  return (
    <div>
      <AdMT>상품목록</AdMT>
      <Ad_Menubar/>
      <Ad_BG>
        
      <ProductManagement initialActiveTab="list" />
      
      <div className="search-container">
          <input
            type="text"
            placeholder="상품명 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">검색하기</button>
        </div>

    <div className="product-list">

    <div className="product-list-header">
        <div className="header-image">상품 이미지</div>
        <div className="header-name">상품명</div>
        <div className="header-price">상품 가격</div>
        <div className="header-status">판매 상태</div>
        <div className="header-sales">누적 판매량</div>
      </div>


  {filteredProducts.map((product, index) => (
          <div key={index} className="product-item">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>


      {editingProductId === product.id ? (
  <div className='product-details'>
    <input 
      type="text" 
      value={editProductDetails.name} 
      onChange={(e) => handleInputChange(e, 'name')} 
      className='PM-edit-input PM-edit-name'
    />
    <input 
      type="text" 
      value={editProductDetails.price} 
      onChange={(e) => handleInputChange(e, 'price')} 
      className='PM-edit-input PM-edit-price' />
    <input 
      type="text" 
      value={editProductDetails.status} 
      onChange={(e) => handleInputChange(e, 'status')} 
      className='PM-edit-input PM-edit-status'/>
    <input 
      type="text" 
      value={editProductDetails.sales} 
      onChange={(e) => handleInputChange(e, 'sales')} 
      className='PM-edit-input PM-edit-sales'/>
  </div>
) : (
<div className="product-details">
  <div className="product-name">{product.name}</div>
  <div className="product-price">{product.price}원</div>
  <div className="product-status">{product.status}</div>
  <div className="product-sales">{product.sales}</div>
</div>

)}
      
      <div className="product-actions">
              {editingProductId === product.id ? (
                <button className="confirm-button" onClick={handleConfirm}>확인</button>
              ) : (
                <button className="edit-button" onClick={() => handleEdit(product)}>수정</button>
              )}
              <FaTrash className="delete-icon" size={20} />
            </div>
          </div>
        ))}
</div>

      </Ad_BG>
  
    </div>

  )
}

export default PMList