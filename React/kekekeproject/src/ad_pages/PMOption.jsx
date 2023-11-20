// 상품 관리의 상품 옵션 페이지

import React from 'react'
import AdMT from '../ad_component/AdMT'
import Ad_BG from '../ad_component/Ad_BG'
import Ad_Menubar from '../component/Ad_Menubar'
import ProductManagement from '../ad_component/ProductManagement'

const PMOption = () => {
  return (
    <div>
        <AdMT>상품옵션</AdMT>
      <Ad_Menubar/>
      <ProductManagement initialActiveTab="quantity" />
      <Ad_BG height="1050px" marginTop="213px"/>
    </div>
  )
}

export default PMOption