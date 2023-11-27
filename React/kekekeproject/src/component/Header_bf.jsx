import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
// App.js 에서 StoreContext를 import합니다.
import { StoreContext } from '../App'; // '../App'은 실제 경로에 맞게 수정해야 합니다

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
    cursor: pointer;
    padding: 10px 15px;
  }

  button{
    text-decoration: none;
    color: black;
    border: none;
    font-size: 16px;
    background: none;
    font-family: 'Pretendard-Regular';
    display: block;
    padding: 10px 15px;
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

const Header_bf = () => {


  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const navigate = useNavigate();

  const { setIsAdminLoggedIn } = useContext(StoreContext);
  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  const testClick = () => {
    // 어드민 로그인 페이지로 이동하면서 상태를 변경합니다
    setIsAdminLoggedIn(false); // 어드민 로그인 상태를 false로 설정
    navigate("/admin/login");
  };

 
  return (
    <>
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
            <Link to={"/login"} className="nav-menu-list">
              로그인
            </Link>
          </li>
          <li>
            <Link to={"/join"} className="nav-menu-list" >
              회원가입
            </Link>
          </li>
          <li>
            <button className="nav-menu-list" onClick={testClick}>
              판매자페이지
            </button>
          </li>
        </NavManu>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </StyledHeader>
    </>
  );
};

export default Header_bf;
