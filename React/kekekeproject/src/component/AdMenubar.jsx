import React from 'react'
import '../css/AdMenubar.css'
import { Link } from 'react-router-dom'


const Ad_Menubar = () => {
  return (
    <div className="ad-menubar-all">
      
      <div className="ad-menubar-container">
        <div className="frame">
          <Link to={'/admin/message'}>
              <img className="ad" alt="Ad" src={'/assets/images/menubar1.png'} />
          </Link>
          
          <Link to={'/admin/orderlist'}>
          <img className="ad-menu" alt="Ad" src={'/assets/images/menubar2.png'} />
          </Link>
          <Link to={'/admin/productquantity'}>
          <img className="img" alt="Ad" src={'/assets/images/menubar3.png'} />
          </Link>
          <Link  to={'/admin/storeinfo'}>
          <img className="ad-2" alt="Ad" src={'/assets/images/menubar4.png'} />
          </Link>
          <Link to={'/admin/customcake'}>
          <img className="ad-3" alt="Ad" src={'/assets/images/menubar5.png'} />
          </Link>
         
        </div>
      </div>
    </div>
  )
}

export default Ad_Menubar