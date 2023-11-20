// 상품 관리의 수량확인 페이지

import React, { useEffect } from 'react'
import ProductManagement from '../ad_component/ProductManagement'
import Ad_Menubar from  '../component/Ad_Menubar'
import '../ad_css/PMquantity.css'
import AdMT from '../ad_component/AdMT'
import Ad_BG from '../ad_component/Ad_BG'
import AdCalendar from '../ad_component/AdCalendar'

const PMquantity = () => {
  return (
    <div>
      <AdMT>수랑확인</AdMT>
      <Ad_Menubar/>
      <AdCalendar/>
      <Ad_BG height="1400px" marginTop="213px">
      <ProductManagement initialActiveTab="quantity" />


      </Ad_BG>
      
     
 


      </div>
    
  )
}

export default PMquantity