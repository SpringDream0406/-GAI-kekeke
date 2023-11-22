// 상품 관리의 상품 목록 페이지

import React, {useState} from 'react'
import AdMT from '../ad_component/AdMT'
import Ad_BG from '../ad_component/Ad_BG'
import Ad_Menubar from '../component/Ad_Menubar'
import ProductManagement from '../ad_component/ProductManagement'
import {FaTrash} from 'react-icons/fa';
import '../ad_css/PMList.css'
import '../ad_css/ProductPopup.css'
import PageButton from '../component/PageButton';

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
      status: "품절",
      sales: "34"
    },
    {
      id: 3,
      imageUrl: "/assets/images/cake1.jpg", // 상품 이미지 경로
      name: "고소하고짭짤한맛소금팝콘케이쿠", // 상품명
      price: "50000", // 상품 가격
      status: "품절", // 판매 상태
      sales: "50" // 누적 판매량
    },
    {
      id: 4,
      imageUrl: "/assets/images/cake2.png",
      name: "베리 초콜릿 케이크",
      price: "45000",
      status: "판매중",
      sales: "14"
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

     // 편집 모드에서 상태 변경 핸들러
  const handleStatusChange = (e, product) => {
    setEditProductDetails({ ...editProductDetails, status: e.target.value });
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


// ----------------------------------------------------

// 상품 등록 팝업에서의 데이터 로직

const [productList, setProductList] = useState(products); // 실제 상품 목록 상태


const handleAddProduct = (newProduct) => {
  const updatedProducts = [newProduct, ...productList]; // 새 상품을 목록의 시작 부분에 추가
  setProductList(updatedProducts); // 상품 목록 상태 업데이트
  setFilteredProducts(updatedProducts); // 필터링된 상품 목록도 업데이트
};



// 페이지버튼/
  // 페이지네이션을 위한 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 한 페이지에 표시할 항목 수
  const [totalPages, setTotalPages] = useState(Math.ceil(filteredProducts.length / itemsPerPage));

  // 현재 페이지에 따라 표시할 상품 목록을 계산합니다.
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // 페이지 변경 함수
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };





  return (
    
    <div>
      <PageButton
        pages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        height={1180}
        left={900}
      /> 
      <AdMT>상품목록</AdMT>
      <Ad_Menubar/>
      <Ad_BG height={1620}>
  
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

      {currentProducts.map((product, index) => (
  
    
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
    <select 
              value={editProductDetails.status} 
              onChange={(e) => handleStatusChange(e, product)}
              className='PM-edit-input PM-edit-status'>
              <option value="판매중">판매중</option>
              <option value="품절">품절</option>
            </select>
            <div className="PM-edit-sales">{product.sales}</div>
          </div>
        ) : (
<div className="product-details">
  <div className="product-name">{product.name}</div>
  <div className="product-price">{product.price}원</div>
  <div className={`product-status ${product.status === "품절" ? "product-status-sold-out" : ""}`}>
      {product.status}
    </div>
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
    <ProductRegisterPopup 
      onClose={handleClosePopup} 
      onAddProduct={handleAddProduct}
    />
  )}



    </div>

  )
}

export default PMList


// -------------------------------------------------------------


// 상품 등록 팝업 컴포넌트
const ProductRegisterPopup = ({ onClose, onAddProduct }) => {

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    // 이미 업로드된 이미지를 유지하면서 새 이미지 추가
    const newImages = Array.from(e.target.files);
    setImages(currentImages => [...currentImages, ...newImages]);
    
    // 미리보기 URL 생성 및 상태 업데이트
    const newImagePreviews = newImages.map(file => URL.createObjectURL(file));
    setImagePreviews(currentPreviews => [...currentPreviews, ...newImagePreviews]);
  };

  const removeImage = (index) => {
    // 선택된 이미지의 URL을 해제
    URL.revokeObjectURL(imagePreviews[index]);

    // 상태에서 해당 이미지 제거
    setImages(currentImages => currentImages.filter((_, i) => i !== index));
    setImagePreviews(currentPreviews => currentPreviews.filter((_, i) => i !== index));
  }


  // ----------------------------------------------------------

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  // 새 상품 등록 함수
  const handleRegister = () => {
    // 입력 검증 또는 필요한 로직 수행
    if (!productName || !productPrice) {
      // 필요한 경우 사용자에게 경고
      alert("상품명과 가격을 입력해주세요.");
      return;
    }
  
    // 상품 정보 객체 생성
    const newProduct = {
      id: Date.now(), // 실제 앱에서는 더 견고한 ID 생성 방법을 사용
      imageUrl: imagePreviews[0] || '/assets/images/placeholder.png', // 첫 번째 이미지 또는 기본 이미지
      name: productName,
      price: productPrice,
      status: '판매중',
      sales: 0,
    };
  
    // 부모 컴포넌트의 상품 추가 함수 호출
    onAddProduct(newProduct);
  
    // 상태 초기화 및 팝업 닫기
    setProductName('');
    setProductPrice('');
    setImagePreviews([]);
    onClose();
  };
  
  return (
    <div className="adminPopupOverlay">
      <div className="adminPopupContainer">
        
        <div className="adminPopupHeader">

          <p className='productText'>상품 등록</p>
          <div className="adminImageUploadContainer">
          <div className="adminImageUploadArea">
            <label htmlFor="imageUpload" className="image-upload-button">
              {images.length < 4 && (
                <>
                  <input 
                    type="file" 
                    id="imageUpload" 
                    onChange={handleImageChange} 
                    multiple
                    style={{ display: 'none' }}
                    
                  />
                  <div className="upload-icon-placeholder">+</div>
                </>
              )}
            </label>

            <div className="image-preview-container">
              {imagePreviews.map((image, index) => (
                <div key={index} className="image-preview">
                  <img src={image} alt={`preview ${index}`} />
                  <button type="button" onClick={() => removeImage(index)}>×</button>
                </div>
              ))}
            </div>
            </div>
            </div>

          
            <div className="adminInputGroup">
  <label htmlFor="productName">상품명:</label>
  <input
    type="text"
    id="productName"
    value={productName} // 상태와 바인딩
    onChange={(e) => setProductName(e.target.value)} // 상태 업데이트
    className="adminInput"
  />
</div>
<div className="adminInputGroup">
  <label htmlFor="productPrice">상품가격:</label>
  <input
    type="text"
    id="productPrice"
    value={productPrice} // 상태와 바인딩
    onChange={(e) => setProductPrice(e.target.value)} // 상태 업데이트
    className="adminInput"
  />
</div>


        </div>
        <div className="adminPopupFooter">
        <button className="adminRegisterButton" onClick={handleRegister}>등록</button>
        <button className="adminCancelButton" onClick={onClose}>취소</button>
      </div>
      </div>
    </div>
  );
};