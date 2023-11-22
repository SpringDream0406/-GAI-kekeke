import React from 'react'
import '../ad_css/AdBG.css'


const AdBG = ({children, height, marginBottom}) => {

  const containerStyle = {
    height: height,
    marginBottom: marginBottom,
};


  return <div className="adbg-container" style={containerStyle}>{children}</div>;
};



export default AdBG