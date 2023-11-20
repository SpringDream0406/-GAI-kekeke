// 상품 관리의 상품 목록 페이지

import React, {useState} from 'react'
import AdMT from '../ad_component/AdMT'
import Ad_BG from '../ad_component/Ad_BG'
import Ad_Menubar from '../component/Ad_Menubar'
import ProductManagement from '../ad_component/ProductManagement'
import {FaTrash} from 'react-icons/fa';
import '../ad_css/PMList.css'
import '../ad_css/ProductPopup.css'

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

    const handleDelete = (productId) => {
      // 'productId'를 가진 상품을 제외한 새로운 배열을 생성하여 상태를 업데이트합니다.
      const updatedProducts = filteredProducts.filter(product => product.id !== productId);
      setFilteredProducts(updatedProducts);
    };
    
    
    // ----------------------------------------------

    // 상품 등록 팝업

     // 팝업의 가시성을 위한 state 추가
  const [isPopupVisible, setPopupVisible] = useState(false);

  // "상품 등록" 버튼 클릭 핸들러
  const handleRegisterClick = () => {
    setPopupVisible(true); // 팝업을 보이게 설정
  };

  // 팝업 닫기 핸들러
  const handleClosePopup = () => {
    setPopupVisible(false); // 팝업을 숨기게 설정
  };

  // -----------------------------------------------

  // 삭제 버튼 팝업

  // 상품 목록 내에 모달을 표시하는 상태와 삭제할 상품 ID를 위한 상태를 추가합니다.
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteProductId, setDeleteProductId] = useState(null);

// 삭제 버튼 이벤트 핸들러
const handleDeleteClick = (productId) => {
  setDeleteProductId(productId);
  setShowDeleteModal(true);
};

// 삭제 확인 핸들러
const handleDeleteConfirm = () => {
  const updatedProducts = filteredProducts.filter(product => product.id !== deleteProductId);
  setFilteredProducts(updatedProducts);
  setShowDeleteModal(false);
};

// 삭제 취소 핸들러
const handleDeleteCancel = () => {
  setShowDeleteModal(false);
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
<div className="PM-edit-sales">{product.sales}</div>
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
             <FaTrash
            className="delete-icon"
            size={15}
            onClick={() => handleDeleteClick(product.id)}
          />
            </div>
          </div>
        ))}
</div>


<div className="product-button-container">
        <button onClick={handleRegisterClick} className="product-button">
          상품 등록
        </button>
      </div>
    
    
      </Ad_BG>


{/* 삭제 확인 모달 */}
{showDeleteModal && (
  <div className="modal-overlay">
    <div className="adminConfirmPopup">
      <p>삭제하시겠습니까?</p>
      <div className="adminConfirmButtons">
        <button onClick={handleDeleteConfirm}>확인</button>
        <button onClick={handleDeleteCancel}>취소</button>
      </div>
    </div>
  </div>
)}

      {isPopupVisible && (
        <ProductRegisterPopup onClose={handleClosePopup} />
      )}
      

    </div>

  )
}

export default PMList

// 상품 등록 팝업 컴포넌트
const ProductRegisterPopup = ({ onClose }) => {

  return (
    <div className="adminPopupOverlay">
      <div className="adminPopupContainer">
        <div className="adminPopupHeader">
          <div className="adminImageUploadContainer">
            {/* 이미지 업로드 구역 */}
            <div className="adminImageUploadPlaceholder">
              {/* 이미지 업로드 관련 내용 */}
            </div>
          </div>
          <div className="adminInputGroup">
            <label htmlFor="productName">상품명:</label>
            <input type="text" id="productName" className="adminInput" />
          </div>
          <div className="adminInputGroup">
            <label htmlFor="productPrice">상품가격:</label>
            <input type="text" id="productPrice" className="adminInput" />
          </div>
        </div>
        <div className="adminPopupFooter">
          <button className="adminRegisterButton">등록</button>
          <button className="adminCancelButton" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};