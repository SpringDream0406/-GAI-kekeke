import React from 'react'
import '../css/Ad_Menubar.css'

const Ad_Menubar = () => {
  return (
    <div className="ad-menubar-all">
      <div className="ad-menubar-container">
        <div className="frame">
          <img className="ad" alt="Ad" src={'/assets/images/menubar1.png'} />
          <img className="ad-menu" alt="Ad" src={'/assets/images/menubar2.png'} />
          <img className="img" alt="Ad" src={'/assets/images/menubar3.png'} />
          <img className="ad-2" alt="Ad" src={'/assets/images/menubar4.png'} />
          <img className="ad-3" alt="Ad" src={'/assets/images/menubar5.png'} />
        </div>
      </div>
    </div>
  )
}

export default Ad_Menubar