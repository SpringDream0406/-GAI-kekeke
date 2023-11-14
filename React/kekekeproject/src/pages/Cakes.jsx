
import React , { useState }from "react";
import "../css/Cake.css";
import Footer from '../component/Footer'
import {Link} from 'react-router-dom'



/*둘러보기 케이크 리스트*/
export const Cakes = () => {

  const cakeList = [
    {
      Cake_Id : 1,
      Cake_Url : "https://c.animaapp.com/YHefgPrk/img/firstcake-img@2x.png",
      Cake_Name : "티아라 케이크",
      Cake_Add : "광주광역시 동구",
    },
    {
      Cake_Id : 2,
      Cake_Url : "https://c.animaapp.com/YHefgPrk/img/secondcake-img@2x.png",
      Cake_Name : "노을 케이크",
      Cake_Add : "광주광역시 광산구",
    },
    {
      Cake_Id : 3,
      Cake_Url : "https://c.animaapp.com/YHefgPrk/img/thirdcake-img@2x.png",
      Cake_Name : "리본 케이크",
      Cake_Add : "광주광역시 북구",
    },
    {
      Cake_Id : 4,
      Cake_Url : "https://c.animaapp.com/YHefgPrk/img/fourthcake-img@2x.png",
      Cake_Name : "생일 케이크",
      Cake_Add : "광주광역시 남구",
    },
    {
      Cake_Id : 5,
      Cake_Url : "https://c.animaapp.com/YHefgPrk/img/fivethcake-img@2x.png",
      Cake_Name : "비눗방울 케이크",
      Cake_Add : "광주광역시 서구",
    },
    {
      Cake_Id : 6,
      Cake_Url : "https://c.animaapp.com/YHefgPrk/img/sixthcake-img@2x.png",
      Cake_Name : "곰돌이 케이크",
      Cake_Add : "광주광역시 동구",
    },
    {
      Cake_Id : 7,
      Cake_Url : "https://c.animaapp.com/YHefgPrk/img/seventhcake-img@2x.png",
      Cake_Name : "아이스크림 케이크",
      Cake_Add : "광주광역시 광산구",
    },
    {
      Cake_Id : 8,
      Cake_Url : "https://c.animaapp.com/YHefgPrk/img/eighthcake-img@2x.png",
      Cake_Name : "꽃다발 케이크",
      Cake_Add : "광주광역시 광산구",
    },
    {
      Cake_Id : 9,
      Cake_Url : "https://c.animaapp.com/YHefgPrk/img/ninethcake-img@2x.png",
      Cake_Name : "산타 케이크",
      Cake_Add : "광주광역시 남구",
    },
    {
      Cake_Id : 10,
      Cake_Url : "https://c.animaapp.com/YHefgPrk/img/firstcake-img@2x.png",
      Cake_Name : "티아라 케이크",
      Cake_Add : "광주광역시 서구",
    },
  ]

  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [myLocation, setMyLocation] = useState(false);


  const toggleLocationModal = () => {
    if (myLocation == true) {
      setMyLocation(false);
      setLocationModalOpen(!isLocationModalOpen);
    }else{
    setLocationModalOpen(!isLocationModalOpen);}
  };
  
  const toggleMyLocation = () => {
    if (isLocationModalOpen == true) {
      setLocationModalOpen(false);
      setMyLocation(!myLocation);
    }else{
    setMyLocation(!myLocation);}
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCakes = cakeList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cakeList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (event, number) => {
    event.preventDefault(); // 페이지 새로고침 방지
    setCurrentPage(number);
  };

  /*이전페이지로 가는 로직 */
  const goToPrevPage = () => {
    setCurrentPage(prev => prev > 1 ? prev - 1 : 1);
  };
  /*다음페이지로 가는 로직 */
  const goToNextPage = () => {
    setCurrentPage(prev => prev < pageNumbers.length ? prev + 1 : pageNumbers.length);
  };






  return (

    <div className="tour">
      <div className="tour-contents-fr">
        <div className="tour-contents">
          {/* 하단 페이지 구역 */}
          <div className="tour-page">
  <div className="tour-page-before" onClick={goToPrevPage}>
    <img className="polygon" alt="이전 페이지" src="https://c.animaapp.com/YHefgPrk/img/polygon-3.svg" />
  </div>
          {/* 페이지네이션 */}
          <div className="pagination">
            {pageNumbers.map(number => (
              <a key={number} onClick={(e) => handlePageClick(e, number)} href="!#">
                {number}
              </a>
            ))}
          </div>
          <div className="tour-page-next" onClick={goToNextPage}>
    <img className="img" alt="다음 페이지" src="https://c.animaapp.com/YHefgPrk/img/polygon-3-1.svg" />
  </div>
          </div>

          {/* 중앙 케이크 지역 */}
          <div className="tour-cake">
  <div className="tour-container">
    <div className="tour-element1">
      {currentCakes.map(cakeList => (
        <Link to={'/TourOrder'} key={cakeList.Cake_Id}>
          <div className="tour-cake-container">
            <div className="tour-cake-img">
              <img 
                className="tourcakeimg" 
                alt={`tourcakeimg ${cakeList.Cake_Id}`}
                src={`${cakeList.Cake_Url}`} 
              /> 
            </div>
            <div className="tour-cake-name">
              <div className="tourcakename">{cakeList.Cake_Name}</div>
            </div>
            <div className="tour-cake-add">
              <div className="cake-address">{cakeList.Cake_Add}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</div>


          {/* 상단 지역 선택 */}
          <div className="location-container">
      <div className="tour-locationbutton">
        <button
          className="locationbutton"
          onClick={toggleLocationModal}
          style={{
            backgroundColor: isLocationModalOpen ? "#61a4d5" : "",
            color: isLocationModalOpen ? "white" : "",
          }}
        >
          지역 선택
        </button>
        <button
                  className="mylocationbutton"
                  onClick={toggleMyLocation}
                  style={{ backgroundColor: myLocation ? "#61a4d5" : "" , color: myLocation ? "white" : "", }}
                >
                  내 주변
                </button>
      </div>
      
    </div>
    {/* 드롭다운 효과를 위한 div, 상태에 따라 클래스명을 변경합니다. */}
    <div className={`tour-location-container ${isLocationModalOpen ? "active" : ""}`}>
      <SelectLocation />
    </div>
        </div>
      </div>
    </div>  

  
  );
};


export default Cakes



const SelectLocation = () => {

  return(
    <div className="tour-location-container">
      <div className="tour-select-location" />
      <div className="tour-loaction-fr">
        <div className="tour-select-location-2">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/b3lWoGsb/img/vector-461-5.svg" />
          <div className="tour-location-gj">광주광역시</div>
        </div>
        <div className="tour-select-location-2">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/b3lWoGsb/img/vector-461-5.svg" />
          <div className="tour-location-gu">남구</div>
        </div>
        <div className="tour-select-location-2">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/b3lWoGsb/img/vector-461-5.svg" />
          <div className="tour-location-gu">서구</div>
        </div>
        <div className="tour-select-location-2">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/b3lWoGsb/img/vector-461-5.svg" />
          <div className="tour-location-gu">광산구</div>
        </div>
        <div className="tour-select-location-2">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/b3lWoGsb/img/vector-461-5.svg" />
          <div className="tour-location-gu">동구</div>
        </div>
        <div className="tour-select-location-2">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/b3lWoGsb/img/vector-461-5.svg" />
          <div className="tour-location-gu">북구</div>
        </div>
      </div>
    </div>
  );
};