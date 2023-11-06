import React from 'react'
import '../css/Header.css'
import '../Fonts/Font.css'
import { useState } from 'react'
import { Link } from "react-router-dom";

const Header = () => {
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
          <div className="Header_menu_3_all">
            <Link className="Header_login" to ={'/login'}>로그인</Link>
          </div>
          <div className="Header_menu_4_all">
            <Link className="Header_join" to ={'/join'}>회원가입</Link>
          </div>
        </div>
        <div className="Headerlogo">
          <img src={'/assets/images/logo-header.svg'}/>
        </div>
      </div>
      </div>
     
    
 
  )
}

export default Header