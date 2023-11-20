import React from 'react'
import '../css/Ad_Menubar.css'
import { Link } from 'react-router-dom'
import Ad_BG from '../ad_component/Ad_BG'

const Ad_Menubar = () => {
  return (
    <div className="ad-menubar-all">
      
      <div className="ad-menubar-container">
        <div className="frame">
          <Link to={'/admin/message'}>
              <img className="ad" alt="Ad" src={'/assets/images/menubar1.png'} />
          </Link>
          
          <Link >
          <img className="ad-menu" alt="Ad" src={'/assets/images/menubar2.png'} />
          </Link>
          <Link to={'/admin/productquantity'}>
          <img className="img" alt="Ad" src={'/assets/images/menubar3.png'} />
          </Link>
          <Link >
          <img className="ad-2" alt="Ad" src={'/assets/images/menubar4.png'} />
          </Link>
          <Link>
          <img className="ad-3" alt="Ad" src={'/assets/images/menubar5.png'} />
          </Link>
         
        </div>
      </div>
    </div>
  )
}

export default Ad_Menubar