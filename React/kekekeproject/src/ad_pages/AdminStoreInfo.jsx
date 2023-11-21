import React from 'react'
import Ad_Menubar from '../component/Ad_Menubar';
import AdMT from '../ad_component/AdMT';
import Ad_BG from '../ad_component/Ad_BG';

const AdminStoreInfo = () => {
  return (
    <div>      
        <AdMT>가게정보</AdMT>
        <Ad_Menubar/>
        <Ad_BG height={1500}>

            {/* 이 사이에 내용 작성하시면 됩니댱 */}
            



        </Ad_BG>
    </div>
  )
}

export default AdminStoreInfo;