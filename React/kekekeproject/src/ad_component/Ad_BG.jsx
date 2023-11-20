import React from 'react'
import '../ad_css/Ad_BG.css'
import Ad_Header from '../component/Ad_Header'
import Ad_Menubar from '../component/Ad_Menubar.jsx'

const Ad_BG = (props) => {
  // props에서 height 값을 추출합니다.
  const { height } = props;
  const { marginTop } = props;

  return (
    <div className='admain-bg-container'>
      <div className='adbg-container' style={{ height: height, marginTop:marginTop}}>
      </div>
    </div>
  );
};



export default Ad_BG