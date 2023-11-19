// 상품 관리의 수량확인 페이지

import React, { useEffect } from 'react'
import ProductManagement from '../ad_component/ProductManagement'
import Ad_Menubar from  '../component/Ad_Menubar'
import '../ad_css/PMquantity.css'
import AdMT from '../ad_component/AdMT'
import Ad_BG from '../ad_component/Ad_BG'

const PMquantity = () => {
  return (
    <div>
      <AdMT>수랑확인</AdMT>
      <Ad_Menubar/>
      <ProductManagement initialActiveTab="quantity" />
      <Ad_BG height="1050px" marginTop="213px"/>
      
     
 


      </div>
    
  )
}

export default PMquantity