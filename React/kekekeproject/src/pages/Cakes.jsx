
import React, { useState, useEffect } from "react";
import "../css/Cake.css";
import { Link } from 'react-router-dom'
import axios from "axios";
import API_URL from "../api_url";
import AdPagebtn from '../ad_component/AdPagebtn'
import Keyword from '../component/Keyword'


/*둘러보기 케이크 리스트*/
export const Cakes = () => {

  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredCakes, setFilteredCakes] = useState([]);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [myLocation, setMyLocation] = useState(false);
  const [ setCake] = useState(null); // cake 객체 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [cakesFromServer, setCakesFromServer] = useState([]);
  const itemsPerPage = 9;


  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const url = `${API_URL}/product/cakes`;
    const data = { gu: selectedLocation };

     axios.post(url, data)
    .then(response => {
      const shuffledCakes = shuffleArray(response.data); // 데이터 섞기
      setCakesFromServer(shuffledCakes);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}, [selectedLocation]);

  const getPageNumbers = () => {
    const totalPageCount = Math.ceil(cakesFromServer.length / itemsPerPage);
    const maxPageNumberDisplay = 5; // 한 번에 표시할 최대 페이지 수
    let startPage, endPage;
  
    if (totalPageCount <= maxPageNumberDisplay) {
      startPage = 1;
      endPage = totalPageCount;
    } else {
      // 현재 페이지가 최대 페이지 수의 절반 이상인 경우
      if (currentPage <= Math.floor(maxPageNumberDisplay / 2)) {
        startPage = 1;
        endPage = maxPageNumberDisplay;
      } else if (currentPage + Math.floor(maxPageNumberDisplay / 2) >= totalPageCount) {
        startPage = totalPageCount - maxPageNumberDisplay + 1;
        endPage = totalPageCount;
      } else {
        startPage = currentPage - Math.floor(maxPageNumberDisplay / 2);
        endPage = startPage + maxPageNumberDisplay - 1;
      }
    }
  
    return Array.from({ length: (endPage - startPage + 1) }, (_, idx) => startPage + idx);
  };

   // useEffect 훅을 사용하여 선택된 지역이 변경될 때마다 필터링을 수행
  useEffect(() => {
    if (selectedLocation) {
      // 선택된 지역과 일치하는 케이크 목록 필터링
      const filtered = cakesFromServer.filter(cake => cake.shop_addr1.includes(selectedLocation));
      setFilteredCakes(filtered);
    } else {
      // 선택된 지역이 없는 경우 전체 목록 표시
      setFilteredCakes(cakesFromServer);
    }
    setCurrentPage(1); // 필터링 후 페이지 번호를 첫 페이지로 초기화
  }, [selectedLocation, cakesFromServer]);



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;  
  const currentCakes = cakesFromServer.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = getPageNumbers();


  const toggleLocationModal = () => {
    if (myLocation === true) {
      setMyLocation(false);
      setLocationModalOpen(!isLocationModalOpen);
    } else {
      setLocationModalOpen(!isLocationModalOpen);
    }
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

// const handleCakeClick = (selectedCake) =>{
//   setCake(selectedCake)
// }

// 키워드

const [selectedKeyword, setSelectedKeyword] = useState("");

 // 키워드 필터링 로직
 useEffect(() => {
  let filtered = cakesFromServer;

  if (selectedLocation) {
    filtered = filtered.filter(cake => cake.shop_addr1.includes(selectedLocation));
  }

  if (selectedKeyword) {
    // 선택된 키워드에 따라 케이크를 필터링합니다.
    filtered = filtered.filter(cake => cake.tags && cake.tags.includes(selectedKeyword));
  }

  setFilteredCakes(filtered);
  setCurrentPage(1); // 페이지 번호 초기화
}, [selectedLocation, selectedKeyword, cakesFromServer]);
  


  return (
    <div className="tour">
      <Keyword onSelectKeyword={setSelectedKeyword}/>
      <div className="tour-contents-fr">
        <div className="tour-contents">
          {/* 상단 지역 선택 */}
          <hr className="tour-hr"/>
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
              setLocationModalOpen={setLocationModalOpen} />) : null}



            {/* 중앙 케이크 지역 */}
            <div className="tour-cake">
              <div className="tour-container">
                {currentCakes.map((cake) => (

                  <Link to={`/tour-order?prd_id=${cake.prd_id}`} key={cake.prd_id}>
                

                    <div className="tour-cake-container">
                      <div className="tour-cake-img">
                        <img
                          className="tourcakeimg"
                          alt={`tourcakeimg ${cake.prd_id}`}
                          src={`/img/product/${cake.img_name2}`}
                        />
                      </div>
                      <div className="tour-cake-name">
                        <div className="ourcakename">{cake.prd_name}</div>
                      </div>
                      <div className="tour-cake-add">
                        <div className="cake-address">{cake.shop_addr1}</div>
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
  <AdPagebtn type="prev" onClick={goToPrevPage} />
  {pageNumbers.map(num => (
    <button
      key={num}
      onClick={() => setCurrentPage(num)}
      className={`page-number ${currentPage === num ? 'active' : ''}`}
    >
      {num}
    </button>
  ))}
  <AdPagebtn type="next" onClick={goToNextPage} />
</div>
      </div>
   
    </div>
  );
};

export default Cakes

const SelectLocation = ({ setSelectedLocation, setLocationModalOpen }) => {

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLocationModalOpen(false);
  };

  return (
    <div className="cake-location">

      <div className="tour-select-location-2" onClick={() => handleLocationSelect("광주광역시")}>
        <div className="select-gj">광주광역시</div>
      </div>
      <div className="tour-select-location-2" onClick={() => handleLocationSelect("남구")}>
        <div className="select-gu">남구</div>
      </div>
      <div className="tour-select-location-2" onClick={() => handleLocationSelect("서구")}>
        <div className="select-gu">서구</div>
      </div>
      <div className="tour-select-location-2" onClick={() => handleLocationSelect("광산구")}>
        <div className="select-gu-gu">광산구</div>
      </div>
      <div className="tour-select-location-2" onClick={() => handleLocationSelect("동구")}>
        <div className="select-gu">동구</div>
      </div>
      <div className="tour-select-location-2" onClick={() => handleLocationSelect("북구")}>
        <div className="select-gu">북구</div>
      </div>
    </div>

  );
};