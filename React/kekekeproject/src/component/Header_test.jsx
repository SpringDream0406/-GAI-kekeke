import React from 'react'
import '../css/Header.css'
import '../Fonts/Font.css'
import { useState } from 'react'
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";


const Header = () => {
    // 토글이벤트 만들기 
    const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  const StyledHeader = styled.header`
 


  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
  }
`;


  const NavManu = styled.ul`

  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
  }
`;

  return (
    

    <StyledHeader>
    <div className='Header_bflogin-container'>
      <div className="Header_bflogin">
        <div className="Header_menubar" />
        <div className="Header_all">
      
        <div className="Headerlogo">
          <img src={'/assets/images/logo-header.svg'}/>
        </div>
        <NavManu isToggleOpen={isToggleOpen}>
          <li  className="Header_menu_1_all">
            <Link  className="Header_menu_1" to ={'/cakes'}>
            둘러보기
            </Link>
          </li>
          <li className="Header_menu_2_all">
            <Link className="Header_menu_2" to ={'/customcake'}>커스텀케이크주문</Link>
          </li>
          <li className="Headeraf_username_all">
                <a className="Headeraf_username">정건식 님</a>
              </li>
              <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
          
        </NavManu>
       
     
   
                    
                  
      </div>
      </div>
      </div>
      </StyledHeader>
      
      
     
    
 
  )
}

export default Header