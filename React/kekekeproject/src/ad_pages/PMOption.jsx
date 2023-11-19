// 상품 관리의 상품 옵션 페이지

import React from 'react'
import Ad_Menubar from '../component/Ad_Menubar'
import ProductManagement from '../ad_component/ProductManagement'

const PMOption = () => {
  return (
    <div>
      <Ad_Menubar/>
      <div className='PMContainer'>
      <ProductManagement initialActiveTab="option"/>

      
      </div>
    </div>
  )
}

export default PMOption