// 상품 관리의 상품 목록 페이지

import React from 'react'
import Ad_Menubar from '../component/Ad_Menubar'
import ProductManagement from '../ad_component/ProductManagement'

const PMList = () => {
  return (
    <div>
    <Ad_Menubar/>
    <div className='PMContainer'>
    <ProductManagement initialActiveTab="list"/>

    
    </div>
  </div>
  )
}

export default PMList