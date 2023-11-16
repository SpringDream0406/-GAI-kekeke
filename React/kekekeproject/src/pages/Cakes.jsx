
import React , { useState, useEffect }from "react";
import "../css/Cake.css";
import {Link} from 'react-router-dom'
import PageButton from '../component/PageButton';



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

  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredCakes, setFilteredCakes] = useState(cakeList);// 필터링된 케이크 목록을 위한 상태
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [myLocation, setMyLocation] = useState(false);

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;


  useEffect(() => {
    if (selectedLocation) {
      // 선택된 지역과 일치하는 케이크 목록 필터링
      const filtered = cakeList.filter(cake => cake.Cake_Add.includes(selectedLocation));
      setFilteredCakes(filtered);
    } else {
      // 선택된 지역이 없는 경우 전체 목록 표시
      setFilteredCakes(cakeList);
    }
    setCurrentPage(1); //필터링 후 페이지 번호를 첫 페이지로 초기화
  }, [selectedLocation]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCakes = filteredCakes.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCakes.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const toggleLocationModal = () => {
    if (myLocation === true) {
      setMyLocation(false);
      setLocationModalOpen(!isLocationModalOpen);
    }else{
    setLocationModalOpen(!isLocationModalOpen);}
  };
  
  const handlePageClick = (event, number) => {
    event.preventDefault(); // 페이지 새로고침 방지
    setCurrentPage(number);
    window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동
  };

  /*이전페이지로 가는 로직 */
  const goToPrevPage = () => {
    setCurrentPage(prev => prev > 1 ? prev - 1 : 1);
    window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동
  };
  /*다음페이지로 가는 로직 */
  const goToNextPage = () => {
    setCurrentPage(prev => prev < pageNumbers.length ? prev + 1 : pageNumbers.length);
    window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동
  };


  return (
    <div className="tour">
      <div className="tour-contents-fr">
        <div className="tour-contents">
          {/* 상단 지역 선택 */}
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
        {isLocationModalOpen ? (<SelectLocation 
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        setLocationModalOpen={setLocationModalOpen}/>) : null}
      </div>

          {/* 중앙 케이크 지역 */}
          <div className="tour-cake">
  <div className="tour-container">
    {currentCakes.map((cakeList) => (
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
      {/* 빈 요소 추가 */}
{Array(9 - currentCakes.length).fill().map((_, index) => (
  <div key={`empty-${index}`} className="tour-cake-container empty"></div>
))}
    </div>
</div>
      </div>
    </div>
    <div className="Tourpagination">
                <PageButton type="prev"  onClick={goToPrevPage} />
              {pageNumbers.map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`page-number ${currentPage === num ? 'active' : ''}`}
                >
                  {num}
                </button>
              ))}
              <PageButton type="next"  onClick={goToNextPage} />

          </div>
  </div>  
  

  );
};

export default Cakes

const SelectLocation = ({selectedLocation, setSelectedLocation, isLocationModalOpen, setLocationModalOpen}) => {

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLocationModalOpen(false);
  };

  return (
    <div className="cake-location">
    
      <div className="tour-select-location-2" onClick={() => handleLocationSelect("광주광역시")}>
        <div className="select-gj">광주광역시</div>
      </div>
      <div className="tour-select-location-2" onClick={() => handleLocationSelect("광주광역시 남구")}>
        <div className="select-gu">남구</div>
      </div>
      <div className="tour-select-location-2" onClick={() => handleLocationSelect("광주광역시 서구")}>
        <div className="select-gu">서구</div>
      </div>
      <div className="tour-select-location-2" onClick={() => handleLocationSelect("광주광역시 광산구")}>
        <div className="select-gu-gu">광산구</div>
      </div>
      <div className="tour-select-location-2" onClick={() => handleLocationSelect("광주광역시 동구")}>
        <div className="select-gu">동구</div>
      </div>
      <div className="tour-select-location-2" onClick={() => handleLocationSelect("광주광역시 북구")}>
        <div className="select-gu">북구</div>
      </div>
    </div>
    
  );
};