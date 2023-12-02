import React, { useState, useEffect } from 'react'
import AdMT from '../ad_component/AdMT'
import AdBG from '../ad_component/AdBG'
import AdMenubar from '../component/AdMenubar'
import ProductManagement from '../ad_component/ProductManagement'
import { FaTrash } from 'react-icons/fa';
import '../ad_css/PMList.css'
import '../ad_css/ProductPopup.css'
import PageButton from '../component/PageButton';
import AdHeader from '../component/AdHeader';
import API_URL from '../api_url'
import axios from 'axios'
import Swal from 'sweetalert2'


const PMList = () => {
  const [sellerinfo, setSellerInfo] = useState('');
  const [products, setProducts] = useState([]);
  //세션에서 데이터불러오기!
  useEffect(()=>{
    const adminStorageData =sessionStorage.getItem('adminData');
    if(adminStorageData){
      const adminData = JSON.parse(adminStorageData);
      setSellerInfo(adminData);
      console.log(adminData);
    }
  },[]);


  
  // seller_id 로 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      let pdprd;
      try {
        const response = await axios.post(`${API_URL}/order/adproduct`, { seller_id: sellerinfo.seller_id });
        pdprd = response.data;
        console.log("데이터 받아옴", response.data);
      } catch (error) {
        console.log("데이터 오류", error);
        pdprd = [];
      }
      setProducts(pdprd); // products 업데이트
      setFilteredProducts(pdprd); // filteredProducts도 동시에 업데이트
    };
  
    fetchData();
  }, [sellerinfo.seller_id]);
  
 
  
  

  // 검색어 상태와 필터링된 상품 목록 상태 추가
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // 검색 버튼 클릭 이벤트 핸들러
  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.PRD_NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered); // 검색 결과에 따라 filteredProducts 업데이트
  };

  // ---------------------------------------------
  const [editingProductId, setEditingProductId] = useState(null);
  const [editProductDetails, setEditProductDetails] = useState({});


  //수정핸들러
  const handleEdit = (product) => {
    setEditingProductId(product.PRD_ID);
    setEditProductDetails({ 
      name: product.PRD_NAME, 
      price: product.PRD_AMT, 
      status: product.SALE_STATUS === "Y" ? "판매중" : "품절", // 현재 상태 반영
      sales: product.total_product_orders 
    });
  };
  useEffect(() => {
    console.log("업데이트된 editingProductId:", editingProductId,editProductDetails);
  }, [editingProductId]);

  // 확인 버튼 클릭 핸들러
  // 입력값 저장해서 바뀌게 하는 부분
  const handleConfirm = async () => {
    try {
      // 서버로 보낼 수정된 상품 데이터 구성
      const updatedProductData = {
        PRD_ID: editingProductId,
        SALE_STATUS: editProductDetails.status === "판매중" ? "Y" : "N",
        PRD_ATM: editProductDetails.price,
        PRD_NAME: editProductDetails.name,
      };

  
      // 서버 요청
      const response = await axios.put(`${API_URL}/seller/updateprd`, updatedProductData);
      console.log("상품 업데이트 성공", response.data);
  
      // 상태 업데이트
      setFilteredProducts(prevProducts => prevProducts.map(product => 
        product.PRD_ID === editingProductId ? { ...product, ...updatedProductData } : product
      ));
    } catch (error) {
      console.error("업데이트 실패", error);
    }
   
  
    setEditingProductId(null); // 편집 모드 종료
   // window.location.reload()
  };

  const handleNumberChange = (e, field) => {
    const value = e.target.value;
    // 입력값의 길이가 7자 이하인 경우에만 상태 업데이트 (문자 포함)
    if (field === 'price' && value.length <= 7) {
      setEditProductDetails(prevDetails => ({ ...prevDetails, [field]: value }));
    }
  };
  
  // 편집 모드에서 입력 변경 핸들러
  const handleInputChange = (e, field) => {
    setEditProductDetails({ ...editProductDetails, [field]: e.target.value });
  };

  // 편집 모드에서 상태 변경 핸들러
 const handleStatusChange = (e, product) => {
  console.log("Status 변경:", e.target.value); // 상태 변경 로깅
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

  const handleDeleteConfirm = async () => {
    // 클라이언트 측 상태 업데이트
    const updatedProducts = filteredProducts.filter(product => product.PRD_ID !== deleteProductId);
    setFilteredProducts(updatedProducts);
    setShowDeleteModal(false);
  
    // 서버에 삭제 요청
    try {
      // DELETE 요청에 prd_id 전달
      const response = await axios.delete(`${API_URL}/seller/prdDelete`, { 
        data: { prd_id: deleteProductId }
      });
  
      console.log("상품 삭제 성공", response.data);
      // 추가 상태 업데이트나 사용자 알림이 필요한 경우 여기에 작성합니다.
    } catch (error) {
      console.error("상품 삭제 실패", error);
      // 사용자에게 오류를 알리는 로직을 여기에 작성합니다.
    }
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // totalPages 상태 추가
  const itemsPerPage = 4; // 한 페이지에 표시할 항목 수


  // 페이지 변경 함수
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // filteredProducts가 변경될 때마다 totalPages를 업데이트
  useEffect(() => {
    const newTotalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    setCurrentPage(1);
    setTotalPages(newTotalPages); // 'totalPages' 상태 업데이트
  }, [filteredProducts]);


// 현재 페이지에 따라 표시할 상품 목록을 계산합니다.
const indexOfLastProduct = currentPage * itemsPerPage;
const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);



// -------------------------------------------------------

// 이미지 수정 팝업

const [selectedProduct, setSelectedProduct] = useState(null);
const [isImagePopupVisible, setImagePopupVisible] = useState(false);
const fileInputRef = React.createRef(); // 파일 입력을 위한 ref 생성

 // 이미지 클릭 핸들러
 const handleImageClick = (product) => {
  setSelectedProduct(product); // 선택된 상품 상태 업데이트
  setImagePopupVisible(true); // 이미지 팝업 표시
};

 // 이미지 팝업 닫기 핸들러
 const handleImageClosePopup = () => {
  setImagePopupVisible(false);
};

// 이미지 업데이트 핸들러
const handleImageUpdate = (newImageUrl) => {
  // 상품의 이미지 URL을 업데이트하는 로직
  const updatedProducts = currentProducts.map((p) =>
    p.id === selectedProduct.id ? { ...p, imageUrl: newImageUrl } : p
  );
  setImagePopupVisible(false); // 이미지 팝업 숨김
};




  return (

    <div>

      <AdHeader></AdHeader>


      <AdMT>상품목록</AdMT>
      <AdMenubar />
      <AdBG height={1620}>

        <ProductManagement initialActiveTab="list" />

        <div>

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


              <div key={product.id} className="product-item">
                <div className="product-image" onClick={() => handleImageClick(product)}>
                  <img src={`/img/product/${product.IMG_NAME2}`} alt={product.IMG_NAME2}/>
                </div>


                {editingProductId === product.PRD_ID ? (
                <div className='product-details'>
                  <input
                    type="text"
                    value={editProductDetails.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    className='PM-edit-input PM-edit-name'
                    maxLength="20"
                  />
                  <input
                    type="text"
                    value={editProductDetails.price}
                    onChange={(e) => handleNumberChange(e, 'price')}
                    className='PM-edit-input PM-edit-price'
                 
                    maxLength="10"
                  />
                  <select
                    value={editProductDetails.status}
                    onChange={(e) => handleStatusChange(e, product)}
                    className='PM-edit-input PM-edit-status'>
                    <option value="판매중">판매중</option>
                    <option value="품절">품절</option>
                  </select>
                  <div className="PM-edit-sales">{product.SALE_STATUS}</div>
                </div>
              ) : (
                <div className="product-details">
                  <div className="product-name">{product.PRD_NAME}</div>
                  <div className="product-price">{product.PRD_AMT}원</div>
                  <div className={`product-status ${product.SALE_STATUS === "Y" ? "product-status-sold-out" : ""}`}>
                    {product.SALE_STATUS === "Y"?"판매중" : "품절"}
                  </div>
                  <div className="product-sales">{product.total_product_orders}</div>
                </div>

              )}

              <div className="product-actions">
                {editingProductId === product.PRD_ID? (
                  <button className="confirm-button" onClick={() => handleConfirm(product)}>확인</button>
                ) : (
                  <button className="edit-button" onClick={() => handleEdit(product)}>수정</button>
                )}
                <FaTrash
                  className="delete-icon"
                  size={15}
                  onClick={() => handleDeleteClick(product.PRD_ID)}
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
        <PageButton
  className="pmlistpgbtn"
  pages={totalPages}
  currentPage={currentPage}
  onPageChange={onPageChange}
/>
        </div>


      </AdBG>


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

{/* 상품 등록 모달 */}
      {isPopupVisible && (
        <ProductRegisterPopup
          onClose={handleClosePopup}
          onAddProduct={handleAddProduct}
        />
      )}

{/* 이미지 수정 팝업 모달 */}
{isImagePopupVisible && selectedProduct && (
    <ImageEditPopup
      existingImageUrl={selectedProduct.imageUrl}
      onSave={handleImageUpdate}
      onClose={handleImageClosePopup}
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
  const [sellerinfo, setSellerInfo] = useState('');

  // 상품 목록 및 검색 관련 상태
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  //세션에서 데이터불러오기!
  useEffect(()=>{
    const adminStorageData =sessionStorage.getItem('adminData');
    if(adminStorageData){
      const adminData = JSON.parse(adminStorageData);
      setSellerInfo(adminData);
      console.log(adminData);
    }
  },[]);

  
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
  const handleRegister = async () => {
    // FormData 객체 생성
    const formData = new FormData();
    // 상품 정보 추가
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('seller_id', sellerinfo.seller_id);
  
    // 이미지 파일 추가
    if (images.length > 0) {
      formData.append('image', images[0]);
    } else {
      formData.append('image', '/assets/images/placeholder.png');
    }
  
    try {
      // 서버에 FormData 전송
      const response = await axios.post(`${API_URL}/product/prdreg`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log("상품 등록 성공", response.data);
      onAddProduct({ name: productName, price: productPrice, imageUrl: response.data.imageUrl });
  
      // 성공 알림 표시
      Swal.fire({
        title: '상품 등록 성공!',
        text: '새로운 상품이 성공적으로 등록되었습니다.',
        icon: 'success',
        confirmButtonText: '확인'
      });
  
      // 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error("상품 등록 실패", error);
      
      // 실패 알림 표시
      Swal.fire({
        title: '상품 등록 실패',
        text: '상품 등록 중 문제가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '닫기'
      });
    }
  
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

// -----------------------------------------------------------------------------------------------

const ImageEditPopup = ({ existingImageUrl, onSave, onClose }) => {
  const [newImage, setNewImage] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const fileInputRef = React.createRef(); // 파일 입력을 위한 ref 생성

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 기존 이미지 URL 해제
      if (newImage) {
        URL.revokeObjectURL(newImage);
      }
      // 새 이미지로 상태 업데이트
      setNewImage(URL.createObjectURL(file));
      setNewImageFile(file); // 새 이미지 파일 저장
    }
  };

  const handleImageClick = () => {
    // This will trigger the file input to open the file dialog
    fileInputRef.current.click();
  };


  const handleSave = () => {
    if (newImageFile) {
      onSave(newImageFile); // 새 이미지 파일을 onSave 함수를 통해 부모 컴포넌트에 전달
    } else {
      alert('변경할 이미지를 업로드해주세요.');
    }
  };

  return (
    <div className="imageEditPopupOverlay">
      <div className="imageEditPopupContainer">
        <div className="imageEditPopupHeader">이미지 수정</div>
        <div className="imageEditPopupContent">
        <img 
            src={newImage || existingImageUrl} 
            alt="Current" 
            className='current-image'
            onClick={handleImageClick} 
          />
          <input
            type="file"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: 'none' }} // 파일 입력 숨기기
          />
          
          <div className="imageEditActions">
            <button onClick={handleSave}>저장</button>
            <button onClick={onClose}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
};