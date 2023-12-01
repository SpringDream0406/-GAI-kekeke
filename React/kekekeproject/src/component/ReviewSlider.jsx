import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import '../css/Slider.css'
import axios from 'axios';
import API_URL from '../api_url';



const SimpleSlider = () => {
  const [mainReview, setMainReview] = useState([]);
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  useEffect(() => {
    // 서버로부터 데이터를 가져옵니다.
    axios.post(`${API_URL}/sample/mainreview`)
      .then((response) => {
        console.log('받아온값:',response.data);
        const { mainreview } = response.data;
        setMainReview(mainreview);
        setLoading(false); // 데이터 로딩 완료
      })
      .catch((error) => {
        console.error('데이터 가져오기 실패:', error);
        setLoading(false); // 데이터 로딩 실패
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.


  useEffect (()=>{
    console.log('변환한 값', mainReview[0]);
  }, [mainReview]);


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

    // 날짜 형식 변환 함수
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
      return formattedDate;
    };


  return (
    // 설정을 props로 전달합니다.
<Slider {...settings} className="slider-container">
    {mainReview.map((review, index) => (
      <div key={index} className="slider-bg">
        <img src={`/img/product/${review.IMG_NAME2}`} alt={`Content ${index + 1}`} className="slider-img" />
        <div className="slider-rvtxt">
          {review.REVIEW_MSG}
        </div>
        <div className="slider-usernick">
        {review.NICK_NAME}
        </div>
        <p className="slider-day">
        {formatDate(review.CREATED_AT)}
        </p>
        <div className="slider-cakename">
        {review.CAKE_NAME}
        </div>
        <hr className="slider-hr" />
      </div>
    ))}
  </Slider>
);
}

export default SimpleSlider;
