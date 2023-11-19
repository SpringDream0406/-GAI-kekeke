// 상품 관리의 수량확인 페이지

import React, { useEffect } from 'react'
import ProductManagement from '../ad_component/ProductManagement'
import Ad_Menubar from  '../component/Ad_Menubar'
import '../ad_css/PMquantity.css'

const PMquantity = () => {
  return (
    <div>
      <Ad_Menubar/>
      <div className='PMContainer'>
      <ProductManagement initialActiveTab="quantity" />


      </div>
    </div>
  )
}

export default PMquantity