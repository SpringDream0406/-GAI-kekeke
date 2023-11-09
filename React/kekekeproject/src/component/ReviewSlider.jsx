import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider from 'react-slick';



const SimpleSlider = () => {
  // 슬라이더 설정
  const settings = {
    dots: true, // 아래 점으로 페이지네이션을 표시할 지 여부
    infinite: true, // 무한 반복 옵션
    dots:false,
    speed: 500, // 애니메이션 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 스크롤 할 슬라이드 개수
  };

  return (
    // 설정을 props로 전달합니다.
    <Slider {...settings}>
      <div>
        <img src={'/assets/images/cake1.jpg'} alt="Content 1" />
      </div>
      <div>
        <img  src={'/assets/images/cake2.png'} alt="Content 2" />
      </div>
      <div>
        <img  src={'/assets/images/cake3.jpg'} alt="Content 3" />
      </div>
      {/* 더 많은 슬라이드를 추가할 수 있습니다. */}
    </Slider>
  );
}

export default SimpleSlider;
