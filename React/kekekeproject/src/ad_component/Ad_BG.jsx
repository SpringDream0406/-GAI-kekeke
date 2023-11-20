import React from 'react'
import '../ad_css/Ad_BG.css'
import Ad_Header from '../component/Ad_Header'
import Ad_Menubar from '../component/Ad_Menubar.jsx'

const Ad_BG = ({children, height, marginBottom}) => {

  const containerStyle = {
    height: height,
    marginBottom: marginBottom,
};


  return <div className="adbg-container" style={containerStyle}>{children}</div>;
};



export default Ad_BG