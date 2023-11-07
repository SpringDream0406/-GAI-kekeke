import React, { useState } from 'react' // useState를 한 번에 임포트
import '../Fonts/Font.css'
import GlobalStyle from './GlobalStyle';
import { Link} from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";




const StyledHeader = styled.header`
  


  width: 80%;
  max-width: 1440px;
  padding: 10px 52px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  

  border: 10px solid;
  border-color: #ffdee6;
  border-radius: 30px;
  height: 67px;
  margin: auto;
  position: relative;
  top:30px;


  .kekekelogo {
    position:absolute;
    top:-40px;
    width: 140px;
    height: 136px;
    
  }
  .menuToggleBtn {
    display: none;
    color: pink;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 12px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    .menuToggleBtn {
      display: block;
    }
  }
`;
const NavManu = styled.ul`
  list-style: none;
  display: flex;

  li {
    &:hover {
      cursor: pointer;
      background: pink;
      border-radius: 4px;
    }
  }
  .nav-menu-list {
    text-decoration: none;
    color: black;
    font-family: 'Pretendard-Regular';
    display: block;
    padding: 10px 10px;
  }
  .nav-menu-icon{
    display:block;
    padding:6px  ;
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    text-align :center;
    width: 100%;
    margin-top: 60px;
  }
`;



const Header_af = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };
  return (
    <>
    <GlobalStyle/>
      <StyledHeader >
        <div className="nav_logo">
          <Link to={"/"} className="nav-logo-link">
          <img src={'/assets/images/logo-header.svg'} className='kekekelogo'/>
          </Link>
        </div>

        <NavManu isToggleOpen={isToggleOpen}>
          
          <li>
            <Link to={"/cakes"} className="nav-menu-list">
              둘러보기
            </Link>
          </li>
          <li>
            <Link to={"/customcake"} className="nav-menu-list">
              커스텀케이크주문
            </Link>
          </li>
          <li>
            <Link to={'/mypage'} className="nav-menu-icon">
            <img 
                            src={'/assets/images/mypage-icon.svg'}/>
            </Link>
              
           
          </li>
          <li>
            <Link to={'/'} className="nav-menu-icon">
            <img
                        src={'/assets/images/message-icon.svg'}
                        />
            </Link>
              
           
          </li>

       
          <li>
            <Link to={'/'} className="nav-menu-icon">
            <img
                        
src={'/assets/images/alert-icon.svg'}
                        />
            </Link>
              
           
          </li>
        </NavManu>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </StyledHeader>
    </>
  );
};

export default Header_af;
