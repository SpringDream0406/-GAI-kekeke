
import React, { useState, useEffect } from "react";
import "../css/Cake.css";
import { Link } from 'react-router-dom'
import axios from "axios";
import API_URL from "../api_url";
//import prdimg from '../../public/img/product/';
import AdPagebtn from '../ad_component/AdPagebtn'
import BlueBg from "../component/BlueBg";


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


  useEffect(() => {
    const url = `${API_URL}/product/cakes`;
    const data = { gu: selectedLocation };

    axios.post(url, data)
      .then(response => {

        console.log(response.data);
        setCakesFromServer(response.data);

      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });


  }, [selectedLocation]);

  



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
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cakesFromServer.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

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

const handleCakeClick = (selectedCake) =>{
  setCake(selectedCake)
}
  


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

const SelectLocation = ({ selectedLocation, setSelectedLocation, isLocationModalOpen, setLocationModalOpen }) => {

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