import React from 'react'
import Ad_Menubar from '../component/Ad_Menubar'
import Ad_BG from '../ad_component/Ad_BG'
import AdMT from '../ad_component/AdMT'
import styled from 'styled-components'



const AdMain = () => {
  return (
    <div className='ad-main-continer'>
     
    
        <Ad_Menubar/>
        
        <AdMT>주문현황</AdMT>
        <Ad_BG />
        

    </div>
  )
}

export default AdMain