import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/SampleCake.css";
import "../component/TourDetContainer"
import TourDetContainer from "../component/TourDetContainer";



export const SampleCake = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cakesPerPage = 12; // 한 페이지에 표시할 케이크 수

  const cakeData = [
    {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-5@2x.png",
      name: "티아라 케이크",
      price: "40,000원"
    },
    {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-3@2x.png",
      name: "무늬케이크",
      price: "15,000원"
    },
    {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-4@2x.png",
      name: "숫자떡케이크",
      price: "40,000원"
    },
    {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-1@2x.png",
      name: "바다2단케이크",
      price: "50,000원"
    },
    {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-5@2x.png",
      name: "티아라 케이크",
      price: "40,000원"
    },
    {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-3@2x.png",
      name: "무늬케이크",
      price: "15,000원"
    },
    {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-4@2x.png",
      name: "숫자떡케이크",
      price: "40,000원"
    },
    {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-1@2x.png",
      name: "바다2단케이크",
      price: "50,000원"
    },
    {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-5@2x.png",
      name: "티아라 케이크",
      price: "40,000원"
    }, {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-5@2x.png",
      name: "티아라 케이크",
      price: "40,000원"
    },
    {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-3@2x.png",
      name: "무늬케이크",
      price: "15,000원"
    },
    {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-4@2x.png",
      name: "숫자떡케이크",
      price: "40,000원"
    },
    {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-1@2x.png",
      name: "바다2단케이크",
      price: "50,000원"
    },
    {
      id: 1,
      imgSrc: "https://c.animaapp.com/AyTKNrDN/img/rectangle-28-5@2x.png",
      name: "티아라 케이크",
      price: "40,000원"
    },
  ]
  // 현재 페이지에 표시할 케이크 계산
  const indexOfLastCake = currentPage * cakesPerPage;
  const indexOfFirstCake = indexOfLastCake - cakesPerPage;
  const currentCakes = cakeData.slice(indexOfFirstCake, indexOfLastCake);


 // 페이지 번호 배열 생성
 const pageNumbers = [];
 for (let i = 1; i <= Math.ceil(cakeData.length / cakesPerPage); i++) {
   pageNumbers.push(i);
 }

 // 페이지 번호 변경 함수
 const paginate = pageNumber => setCurrentPage(pageNumber);

 // 이전 페이지 이동 함수
 const goToPrevPage = () => {
   setCurrentPage(prev => prev > 1 ? prev - 1 : 1);
 };

 // 다음 페이지 이동 함수
 const goToNextPage = () => {
   const totalPages = Math.ceil(cakeData.length / cakesPerPage);
   setCurrentPage(prev => prev < totalPages ? prev + 1 : totalPages);
 };

  

  
  return (
    <div className="Sample__Container">
      <TourDetContainer containerHeight='2000px'>
    <div className="Sam_index"> 
       
      <div className="Sam_samplecontainer">
        {currentCakes.map(cake => (
          <div key={cake.id} className="Sam_cake-item">
            <img className="Sam_img" alt={cake.name} src={cake.imgSrc} />
            <div className="Sam_cake-name">{cake.name}</div>
            <div className="Sam_cake-price">{cake.price}</div>
          </div>
        ))}
      </div>
      
     {/* 페이지네이션 버튼 */}
     <div className="Sam_page-numbers">
        <button className="Sam_page-numbers-before" onClick={goToPrevPage}>
        <img src={'../assets/images/TourDet3Btn1.png'} alt="이전 페이지" className="Sam_btn1"/>
         
        </button>
        <div className="Sam_pagenum">
          {pageNumbers.map(num => (
            <a key={num} onClick={() => paginate(num)} href="#!">
              {num}
            </a>
          ))}
        </div>
        <button className="Sam_page-numbers-before-next" onClick={goToNextPage}>
        <img src={'../assets/images/TourDet3Btn2.png'} alt="이전 페이지"  className="Sam_btn1" />
        </button>
      </div>
    </div>
    </TourDetContainer>
    
    </div>
  );
};



export default SampleCake