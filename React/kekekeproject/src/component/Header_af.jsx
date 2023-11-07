import React, { useEffect, useRef, useState } from 'react' // useState를 한 번에 임포트
import useDetectClose from './useDetectClose';
import '../Fonts/Font.css'
import GlobalStyle from './GlobalStyle';
import { Link} from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled ,{css} from "styled-components";




const StyledHeader = styled.header`

  width: 80%;
  max-width: 1440px;
  padding: 10px 52px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  border: 10px solid;
  border-color: #ffdee6;
  border-radius: 30px;
  height: 27px;
  margin: auto;
  position: relative;
  top: 30px;

  .kekekelogo {
    position: absolute;
    top: -40px;
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

const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  position: relative;

  li {
    position: relative;
    left :-10px;
    &:hover {
      cursor: pointer;
      background-color : pink;

    }

    @media screen and (max-width: 768px) {
      /* ...기존 스타일... */
      justify-content: center; // 가운데 정렬을 위해 추가
    }
  }

  .nav-menu-list {
    text-decoration: none;
    color: black;
    font-family: 'Pretendard-Regular';
    display: block;
    padding: 10px 10px;
  }

  .nav-menu-icon {
    display: block;
    padding: 6px;
  }

  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    
    width: 135px;
    margin-top: 60px;
    position: absolute;
    top: 10px;
    right: -10px;
    background-color: white;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    z-index: 10;
   
  }
`;

const Ul = styled.ul`
 position: relative;
 left:-3px;

  & > li {
    margin-bottom: 10px;
    margin-right : 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }
`;

const Li = styled.li`
  text-decoration: none;
  list-style: none;
  padding: 5px;
  display: block;
  margin-right: 0; // 오른쪽 여백 제거
  margin-left: 0;
`;

const LinkWrapper = styled.a`
  text-align: center;
  position: relative;
  font-size: 16px;
  font-family: 'Pretendard-Regular';
  text-decoration: none;
                              

 
`;

const Menu = styled.div`
  background-color: white;
  text-align : center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
 
  transform: translate(-50%, -20px);
  transition: opacity 0.8s ease, transform 0.4s ease, visibility 0.4s;
  position: absolute;
  top: 85px;
  right: -30px;
  z-index: 10;

  &:after {
    content: '';
    
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    
    border-bottom-color: white;
  }

  @media screen and (max-width: 768px) {
    position:relatvie;
    left:-80px;
    text-align:center;
    width: 134px;
  }
  
  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;




const Header_af = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  // 드롭다운 메뉴
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
  

  return (
    <>
    <GlobalStyle/>
      <StyledHeader >
        <div className="nav_logo">
          <Link to={"/"} className="nav-logo-link">
          <img src={'/assets/images/logo-header.svg'} className='kekekelogo'/>
          </Link>
        </div>

        <NavMenu isToggleOpen={isToggleOpen}>
          
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
          
          <div ref={myPageRef}>
          <li>
            <Link to={'/mypage'} className="nav-menu-icon" onClick={myPageHandler}>
            <img 
                            src={'/assets/images/mypage-icon.svg'}/>
            </Link>
              
          </li>
        
        {myPageIsOpen && (
          <Menu>
            {/* 드롭다운 메뉴 내용 */}
            <Ul>
              <Li>
               <LinkWrapper>주문내역</LinkWrapper>
              </Li>
              <Li>
              <LinkWrapper>내 정보수정</LinkWrapper>
              </Li>
              <Li>
              <LinkWrapper > 로그아웃</LinkWrapper>
              </Li>
            </Ul>
          </Menu>
        )}
      </div>
          
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
        </NavMenu>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </StyledHeader>
    </>
  );
};

export default Header_af;
