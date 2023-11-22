import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트합니다.
import './css/Main.css';
import GlobalStyle from './component/GlobalStyle';
import ReviewSlider from './component/ReviewSlider';


const Main = () => {
  const navigate = useNavigate();
  const refMain1 = useRef(null); // main1 섹션을 위한 ref
  const refMain2 = useRef(null); // main2 섹션을 위한 ref

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // isIntersecting이 true일 때 화면에 요소가 있는 것
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          } else {
            entry.target.classList.remove('animate');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    // main1 섹션의 요소를 관찰 대상으로 추가
    const main1Elements = refMain1.current ? [refMain1.current] : [];
    main1Elements.forEach((el) => observer.observe(el));

    // main2 섹션의 요소를 관찰 대상으로 추가
    const main2Elements = refMain2.current ? refMain2.current.querySelectorAll('.animate-on-scroll') : [];
    main2Elements.forEach((el) => observer.observe(el));

    // 컴포넌트 언마운트 시 관찰 취소
    return () => {
      main1Elements.forEach((el) => observer.unobserve(el));
      main2Elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // 둘러보기 버튼 클릭 핸들러
  const handleBrowseClick = () => {
    navigate('/cakes');

  };
  const handleOrderClick = () => {
    navigate('/customcake');
  };


  return (

      
    <div className="user_main_container">
      <GlobalStyle/>
      <div className='main_img1 animate-on-scroll' ref={refMain1}>
        <img src={'/assets/images/Main_1.svg'} alt="Main" />
      </div>
      <button className="main1_button animate-on-scroll" onClick={handleBrowseClick}>
        <div className="m1_button_text">둘러보기</div>
      </button>

      <div className="main2" ref={refMain2}>
        
        <div className="main2-group animate-on-scroll">
          <img className="bg" alt="Bg" src={'/assets/images/main2_bg.png'} />
          <img className="customtitle animate-on-scroll" alt="Customtitle" src={'/assets/images/main2_customtitle.png'}/>
          <img className="cakeimg animate-on-scroll" alt="Cakeimg" src={'/assets/images/main2_cakeimg.png'} />
          <img className="cakeicon animate-on-scroll" alt="Cakeicon" src={'/assets/images/main2_cakeicon.png'} />
          <img className="drawicon animate-on-scroll" alt="Drawicon" src={'/assets/images/drawicon.png'} />
          <button className="m2_button animate-on-scroll" onClick={handleOrderClick}>
            <div className="m2_button_text">주문하기→</div>
          </button>
        </div>
      </div>


      <div className="main3-wrapper">
      <div className="m3-group-wrapper">
        <div className="m3-group">
          <div className="m3">

          </div>
          <img className="maintitle" alt="Maintitle" src={'/assets/images/m3_maintitle.png'} />
          <ReviewSlider className="main3_slider"/>
        </div>
      </div>
    </div>

    </div>

  );
};

export default Main;
