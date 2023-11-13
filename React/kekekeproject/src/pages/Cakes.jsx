import React from "react";
import { useState } from "react";

import "../css/Cake.css";

import Footer from '../component/Footer'


export const Cakes = () => {
  return (

    <div className="tour">
      <div className="tour-contents-wrapper">
        <div className="tour-contents">
          <div className="tour-page">
            <div className="tour-page-before">
              <img className="polygon" alt="Polygon" src="https://c.animaapp.com/YHefgPrk/img/polygon-3.svg" />
            </div>
            <div className="tour-page-num">
              <div className="one">
                <div className="text-wrapper">1</div>
              </div>
              <div className="two">
                <div className="text-wrapper">2</div>
              </div>
              <div className="three">
                <div className="text-wrapper">3</div>
              </div>
              <div className="four">
                <div className="text-wrapper">4</div>
              </div>
              <div className="five">
                <div className="text-wrapper">5</div>
              </div>
            </div>
            <div className="tour-page-next">
              <img className="img" alt="Polygon" src="https://c.animaapp.com/YHefgPrk/img/polygon-3-1.svg" />
            </div>
          </div>
          <div className="tour-cake">
            <div className="div">
              <div className="element">
                <div className="div-2">
                  <div className="img-wrapper">
                    <img
                      className="firstcake-img"
                      alt="Firstcake img"
                      src="https://c.animaapp.com/YHefgPrk/img/firstcake-img@2x.png"
                    />
                  </div>
                  <div className="tour-first-cake-name">
                    <div className="firstcake-name">티아라케이크</div>
                  </div>
                  <div className="div-wrapper">
                    <div className="text-wrapper-2">광주광역시 동구</div>
                  </div>
                </div>
                <div className="div-2">
                  <div className="tour-second-cake-img" />
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-3">노을케이크</div>
                  </div>
                  <div className="div-wrapper">
                    <div className="text-wrapper-2">광주광역시 동구</div>
                  </div>
                </div>
                <div className="div-2">
                  <div className="tour-third-cake-img" />
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-3">리본케이크</div>
                  </div>
                  <div className="div-wrapper">
                    <div className="text-wrapper-2">광주광역시 동구</div>
                  </div>
                </div>
              </div>
              <div className="element-2">
                <div className="div-2">
                  <div className="tour-fourth-cake-img" />
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-3">생일케이크</div>
                  </div>
                  <div className="div-wrapper">
                    <div className="text-wrapper-2">광주광역시 동구</div>
                  </div>
                </div>
                <div className="div-2">
                  <div className="tour-fiveth-cake-img" />
                  <div className="div-wrapper-2">
                    <div className="fivethcake-name">비눗방울케이크</div>
                  </div>
                  <div className="div-wrapper">
                    <div className="text-wrapper-2">광주광역시 동구</div>
                  </div>
                </div>
                <div className="div-2">
                  <div className="tour-sixth-cake-img" />
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-4">곰돌이케이크</div>
                  </div>
                  <div className="div-wrapper">
                    <div className="text-wrapper-2">광주광역시 동구</div>
                  </div>
                </div>
              </div>
              <div className="element-2">
                <div className="div-2">
                  <div className="tour-seventh-cake" />
                  <div className="div-wrapper-2">
                    <div className="seventhcake-name">아이스크림케이크</div>
                  </div>
                  <div className="div-wrapper">
                    <div className="text-wrapper-2">광주광역시 동구</div>
                  </div>
                </div>
                <div className="div-2">
                  <div className="tour-eighth-cake-img" />
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-4">꽃다발케이크</div>
                  </div>
                  <div className="div-wrapper">
                    <div className="text-wrapper-2">광주광역시 동구</div>
                  </div>
                </div>
                <div className="div-2">
                  <div className="img-wrapper">
                    <img
                      className="ninethcake-img"
                      alt="Ninethcake img"
                      src="https://c.animaapp.com/YHefgPrk/img/ninethcake-img@2x.png"
                    />
                  </div>
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-3">산타케이크</div>
                  </div>
                  <div className="div-wrapper">
                    <div className="text-wrapper-2">광주광역시 동구</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tour-location">
          <div className="tour-wherelocation">
      <div className="tour-selectlocation">
      <div className="tour-location-shape">
                  <img className="polygon-2" alt="Polygon" src="https://c.animaapp.com/YHefgPrk/img/polygon-2.svg" />
                </div>
                 <div className="tour-location-text">
          <div className="text-wrapper">지역 선택</div>
                </div>
              </div>
            </div>
            <div className="tour-whereami">
              <div className="tour-my-location">
                <div className="div-3">
                  <div className="tour-my-location-2" />
                  <div className="tour-my-location-3">
                    <div className="text-wrapper-5">내 주변</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  
   
  );
};


export default Cakes