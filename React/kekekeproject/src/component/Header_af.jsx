import React from 'react'
import '../css/Header.css'
import '../Fonts/Font.css'
import { useState } from 'react'
import { Link } from "react-router-dom";


const Header = () => {
    // 토글이벤트 만들기 
    const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (

   
    <div className='Header_bflogin-container'>
      <div className="Header_bflogin">
        <div className="Header_menubar" />
        <div className="Header_all">
          <div className="Header_menu_1_all">
            <Link className="Header_menu_1" to ={'/cakes'}>둘러보기</Link>
          </div>
          <div className="Header_menu_2_all">
            <Link className="Header_menu_2" to ={'/customcake'}>커스텀케이크주문</Link>
          </div>
          <div className="Headeraf_username_all">
                <a className="Headeraf_username">정건식 님</a>
              </div>
        </div>
        <div className="Headerlogo">
          <img src={'/assets/images/logo-header.svg'}/>
        </div>
        
                <div className="mypage_icon_frame">
                    <img className='header_mypage_icon' 
                            src={'/assets/images/mypage-icon.svg'}/>
                    <div className="message_icon_frame">
                        <img
                        className="header_message_icon"
                        src={'/assets/images/message-icon.svg'}
                        />
                    </div>
                    <div className="message_icon_frame">
                        
                        <img
                            className="header_alert_icon"
                            src={'/assets/images/alert-icon.svg'}
                        />
                     </div>
      </div>
      </div>
      </div>
     
      
      
     
    
 
  )
}

export default Header