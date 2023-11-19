import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../ad_css/ProductManagement.css';

const ProductManagement = ({ initialActiveTab }) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  return (
    <div className="PMbutton-container">
      <Link
        to="/admin/productquantity"
        className={`PMbutton ${activeTab === 'quantity' ? 'active' : ''}`}
        onClick={() => setActiveTab('quantity')}
      >
        수량 확인
      </Link>
      <Link
        to="/admin/productlist"
        className={`PMbutton ${activeTab === 'list' ? 'active' : ''}`}
        onClick={() => setActiveTab('list')}
      >
        상품 목록
      </Link>
      <Link
        to="/admin/productoption"
        className={`PMbutton ${activeTab === 'option' ? 'active' : ''}`}
        onClick={() => setActiveTab('option')}
      >
        상품 옵션
      </Link>
    </div>
  );
}

export default ProductManagement;
