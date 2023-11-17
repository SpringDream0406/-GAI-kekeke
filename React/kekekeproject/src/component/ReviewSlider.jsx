import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider from 'react-slick';
import '../css/Slider.css'



const SimpleSlider = () => {
  // 슬라이더 설정
  const settings = {
    dots: false, // 점 페이지네이션 비활성화
    infinite: true, // 무한 반복 옵션
    speed: 500, // 애니메이션 속도
    slidesToShow: 3, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 스크롤 할 슬라이드 개수
    autoplay: true, // 자동 재생 활성화
    autoplaySpeed: 2000, // 자동 재생 속도 (2000ms = 2초)
  };


  return (
    // 설정을 props로 전달합니다.
    <Slider {...settings} className="slider-container">
  
      <div className="slider-bg">
        <img src={'/assets/images/cake1.jpg'} alt="Content 1" className="slider-img"/>
        <div className="slider-rvtxt">
          케이크맛이따 헤헤ㅁ마시/다헤헤마시따헤헤헿헤헤헤헤헤마
        </div>
        <div className="slider-usernick">
          김은호
        </div>
        <p className="slider-day">
          2023-04-05
        </p>
        <div className="slider-cakename">
          ㅇㅇ케이크
        </div>
        <hr className="slider-hr"/>
      </div>
      <div className="slider-bg">
        <img  src={'/assets/images/cake2.png'} alt="Content 2" className="slider-img"/>
        <div className="slider-rvtxt">
          케이크가너무맛있어여진짜개맛있음진짜맛있
          케이크가너무맛있어여진짜개맛있음진짜맛있
        </div>
        <div className="slider-usernick">
          김은호
        </div>
        <p className="slider-day">
          2023-04-05
        </p>
        <div className="slider-cakename">
          ㅇㅇ케이크
        </div>
        <hr className="slider-hr"/>
      </div>
      <div className="slider-bg">
        <img  src={'/assets/images/cake3.jpg'} alt="Content 3" className="slider-img"/>
        <div className="slider-rvtxt">
          케이크가너무맛있어여진짜개맛있음진짜맛있
          케이크가너무맛있어여진짜개맛있음진짜맛있
        </div>
        <div className="slider-usernick">
          김은호
        </div>
        <p className="slider-day">
          2023-04-05
        </p>
        <div className="slider-cakename">
          ㅇㅇ케이크
        </div>
        <hr className="slider-hr"/>
      </div>
      <div className="slider-bg">
        <img src={'/assets/images/cake1.jpg'} alt="Content 4" className="slider-img"/>
        <div className="slider-rvtxt">
          케이크가너무맛있어여진짜개맛있음진짜맛있
          케이크가너무맛있어여진짜개맛있음진짜맛있
        </div>
        <div className="slider-usernick">
          김은호
        </div>
        <p className="slider-day">
          2023-04-05
        </p>
        <div className="slider-cakename">
          ㅇㅇ케이크
        </div>
        <hr className="slider-hr"/>
      </div>
      <div className="slider-bg">
        <img  src={'/assets/images/cake2.png'} alt="Content 5" className="slider-img"/>
        <div className="slider-rvtxt">
          케이크가너무맛있어여진짜개맛있음진짜맛있
          케이크가너무맛있어여진짜개맛있음진짜맛있
        </div>
        <div className="slider-usernick">
          김은호
        </div>
        <p className="slider-day">
          2023-04-05
        </p>
        <div className="slider-cakename">
          ㅇㅇ케이크
        </div>
        <hr className="slider-hr"/>
      </div>
      <div  className="slider-bg">
        <img  src={'/assets/images/cake3.jpg'} alt="Content 6" className="slider-img"/>
        <div className="slider-rvtxt">
          케이크가너무맛있어여진짜개맛있음진짜맛있
          케이크가너무맛있어여진짜개맛있음진짜맛있
        </div>
        <div className="slider-usernick">
          김은호
        </div>
        <p className="slider-day">
          2023-04-05
        </p>
        <div className="slider-cakename">
          ㅇㅇ케이크
        </div>
        <hr className="slider-hr"/>
      </div>
    
      {/* 더 많은 슬라이드를 추가할 수 있습니다. */}
    </Slider>
  );
}

export default SimpleSlider;
