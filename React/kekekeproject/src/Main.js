import React from 'react';
import './css/Main.css';

const Main = () => {
  return (
    <div className="user_main_container">
      <div className='main_img1'>
        <img src={'/assets/images/Main_1.svg'} alt="Main" />
      </div>
      <button className="main1_button">
        <div className="m1_button_text">둘러보기</div>
      </button>
    </div>
  );
};

export default Main;
