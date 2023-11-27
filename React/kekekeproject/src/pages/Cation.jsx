import React from 'react'
import styled ,{css} from "styled-components";
import { Link} from "react-router-dom";

const Cation = () => {

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
        width: auto;
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
  
  const LinkWrapper = styled(Link)`
  color: black;
    text-align: center;
    position: relative;
    font-size: 16px;
    font-family: 'Pretendard-Regular';
    text-decoration: none;
                            
  `;
  const StyledImage = styled.img`
  width: 70px; 
  height: 70px;
  border-radius: 100px;
  
  margin-top: 30px;
  margin-left: -250px;
  /* 여기에 원하는 스타일을 추가 */
`;
const StyledMT = styled.div`
font-size: 14px;
color: black;
  font-family: 'Pretendard-bold';
  margin-top: -60px;
  margin-left: 70px;
  
`

const StyledST = styled.div`
  font-family: 'Pretendard-Regular';
  font-size: 12px;

  margin-top: 10px;
  color: black;
  margin-left: 70px;
  text-decoration: none;
`
const StyledHR =styled.hr`
    margin-top: 30px;
    margin-left: -30px;
    color: #ececec;
    background-color: #ececec;
    
`
const Button =styled.button`
  color: black;
  text-align: center;
  position: relative;
  font-size: 16px;
  font-family: 'Pretendard-Regular';
  text-decoration: none;
`

  return (
    <div>
        <Ul>
            <LinkWrapper to="/usermessage" >
              <StyledImage src={'/assets/images/cakelogo2.jpg'} />
              <StyledMT>건식케이크에서 제안이 왔어요!</StyledMT>
              <StyledST>지금 바로 확인해보세요 !</StyledST>
              <StyledHR />
            </LinkWrapper>
        
            <LinkWrapper to="/usermessage">
              <StyledImage src={'/assets/images/cakelogo1.jpg'} />
              <StyledMT>건식케이크에서 제안이 왔어요!</StyledMT>
              <StyledST>지금 바로 확인해보세요 !</StyledST>
              <StyledHR />
            </LinkWrapper>
         
            <LinkWrapper to="/usermessage">
             <StyledImage src={'/assets/images/cakelogo3.jpg'} />
              <StyledMT>건식케이크 픽업 하루 전이에요!</StyledMT>
              <StyledST>날짜/시간을 확인해보세요 !</StyledST>
              <StyledHR />
            </LinkWrapper>

            <LinkWrapper to="/usermessage">
             <StyledImage src={'/assets/images/cakelogo2.jpg'} />
              <StyledMT>건식케이크 픽업 하루 전이에요!</StyledMT>
              <StyledST>날짜/시간을 확인해보세요 !</StyledST>
              <StyledHR />
            </LinkWrapper>
        
        </Ul>
    </div>
  )
}

export default Cation

