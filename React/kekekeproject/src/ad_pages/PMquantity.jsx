// 상품 관리의 수량확인 페이지

import React from 'react'
import ProductManagement from '../ad_component/ProductManagement'
import AdMenubar from  '../component/AdMenubar'
import '../ad_css/PMquantity.css'
import AdMT from '../ad_component/AdMT'
import AdBG from '../ad_component/AdBG'
import AdCalendar from '../ad_component/AdCalendar'
import AdHeader from '../component/AdHeader'


const PMquantity = () => {
  return (
    <div>
      <AdHeader />
      <AdMT>수랑확인</AdMT>
      <AdMenubar/>
      <AdCalendar/>
      <AdBG height="1400px" marginTop="213px">
      <ProductManagement initialActiveTab="quantity" />


      </AdBG>
      
     
 


      </div>
    
  )
}

export default PMquantity