import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import "../css/AdHeader.css";
import { Link } from "react-router-dom";




const AdSubMenu = styled.div`
  background-color: white;
  text-align : center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
 
  transform: translate(-50%, -20px);
  transition: opacity 0.8s ease, transform 0.4s ease, visibility 0.4s;
  position: absolute;
  top: 140px;
  right: -80px;
  z-index: 10;

  &:after {
    content: '';
    
    position: absolute;
    top: -1px;
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

const AdUl = styled.ul`
 position: relative;
 left:-3px;

  & > li {
    margin-bottom: 10px;
    margin-right : 30px;
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

const LinkWrapper = styled(Link)`
color: black;
  text-align: center;
  position: relative;
  font-size: 16px;
  font-family: 'Pretendard-Regular';
  text-decoration: none;
                              

 
`;



const Ad_Header = () => {  
 
const [sellerImg , setSellerImg] = useState(null);


  // 세션 스토리지에서 데이터 불러오기
useEffect(() => {
  const adminStorageData = sessionStorage.getItem('adminData');
  if (adminStorageData) {
    const adminData = JSON.parse(adminStorageData);
    setSellerInfo(adminData);
    setSellerImg(adminData.seller_profile1);
    console.log(adminData);
  }
}, []);


const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [sellerinfo, setSellerInfo] = useState({});
  const dropdownRef = useRef(null); // 드롭다운 메뉴를 위한 ref

  // 드롭다운 메뉴 외부 클릭 감지 기능
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // 드롭다운 메뉴 닫기
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // 세션스토리지에서 userData 제거
    sessionStorage.removeItem('adminData');
    console.log("Logging out...");
    window.location.href = '/admin/login';
  };

    return (

        <div className="adminhd-container">
         
          <div className="view">
          <div className="view-2">
              <div className="text-wrapper">사장님</div>
              </div>
            <div className="view-2">
              <div className="text-wrapper2">{sellerinfo.store_name}</div>
            </div>
            <Link to={'/admin'}>
            <div className="view-3" />
            </Link>
             <div className="ellipse-wrapper"  onClick={toggleDropdown}>
                   <img className="ellipse" src={`/img/seller/${sellerImg}`} alt="케이크2"/>
                   {isDropdownOpen && (
          <AdSubMenu>
            {/* 드롭다운 메뉴 내용 */}
            <AdUl>
            
              <Li>
              <LinkWrapper to={'/admin/mypage'}>마이페이지</LinkWrapper>
              </Li>
              <Li>
               {/* 로그아웃 버튼 */}
        <LinkWrapper onClick={handleLogout} style={{ background: 'none', border: 'none', padding: '5px', cursor: 'pointer', color: 'black', textAlign: 'left' }}>
          로그아웃
        </LinkWrapper>
              </Li>
            </AdUl>
          </AdSubMenu>
        )}
                   </div>
             
             
           
          
       
          </div>
        </div>
      
    );
  };
export default  Ad_Header;