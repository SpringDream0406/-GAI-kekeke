
import React , { useState }from "react";
import "../css/Cake.css";


import Footer from '../component/Footer'

import {Link} from 'react-router-dom'



const selectLocation = () => {

  return(
    <div className="div-wrapper">
      <div className="tour-select-location" />
      <div className="div">
        <div className="tour-select-location-2">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/b3lWoGsb/img/vector-461-5.svg" />
          <div className="text-wrapper">광주광역시</div>
        </div>
        <div className="tour-select-location-2">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/b3lWoGsb/img/vector-461-5.svg" />
          <div className="text-wrapper-2">남구</div>
        </div>
        <div className="tour-select-location-2">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/b3lWoGsb/img/vector-461-5.svg" />
          <div className="text-wrapper-2">서구</div>
        </div>
        <div className="tour-select-location-2">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/b3lWoGsb/img/vector-461-5.svg" />
          <div className="text-wrapper-2">광산구</div>
        </div>
        <div className="tour-select-location-2">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/b3lWoGsb/img/vector-461-5.svg" />
          <div className="text-wrapper-2">동구</div>
        </div>
        <div className="tour-select-location-2">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/b3lWoGsb/img/vector-461-5.svg" />
          <div className="text-wrapper-2">북구</div>
        </div>
      </div>
    </div>
  );
};






/*둘러보기 케이크 리스트*/
export const Cakes = () => {

  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [myLocation, setMyLocation] = useState(false);

  const toggleLocationModal = () => {
    setLocationModalOpen(!isLocationModalOpen);
  };
  
  const toggleMyLocation = () => {
    setMyLocation(!myLocation);
  }


  return (

    <div className="tour">
      <div className="tour-contents-fr">
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

            <div className="tour-container">
              <div className="tour-element1">
              <Link to="/TourOrder">
                <div className="tour-cake-container">
                  <div className="tour-first-cake-img">
                  </div>
                  <div className="tour-cake-name">
                    <div className="firstcake-name">티아라케이크</div>
                  </div>
                  <div className="tour-cake-add">
                    <div className="cake-address">광주광역시 동구</div>
                  </div>
                </div>
                </Link>

                <Link to="/TourOrder">
                <div className="tour-cake-container">
                  <div className="tour-second-cake-img" />
                  <div className="tour-cake-name2">
                    <div className="secondcake-name">노을케이크</div>
                  </div>
                  <div className="tour-cake-add">
                    <div className="cake-address">광주광역시 동구</div>
                  </div>
                </div>
                </Link>
                
                <Link to="/TourOrder">
                <div className="tour-cake-container">
                  <div className="tour-third-cake-img" />
                  <div className="tour-cake-name2">
                    <div className="thirdcake-name">리본케이크</div>
                  </div>
                  <div className="tour-cake-add">
                    <div className="cake-address">광주광역시 동구</div>
                  </div>
                </div>
                </Link>
                
              </div>

              <div className="element-2">
              <Link to="/TourOrder">
                <div className="tour-cake-container">
                  <div className="tour-fourth-cake-img" />
                  <div className="tour-cake-name2">
                    <div className="fourthcake-name">생일케이크</div>
                  </div>
                  <div className="tour-cake-add">
                    <div className="cake-address">광주광역시 동구</div>
                  </div>
                </div>
                </Link>

                <Link to="/TourOrder">
                <div className="tour-cake-container">
                  <div className="tour-fiveth-cake-img" />
                  <div className="tour-cake-name2">
                    <div className="fivethcake-name">비눗방울케이크</div>
                  </div>
                  <div className="tour-cake-add">
                    <div className="cake-address">광주광역시 동구</div>
                  </div>
                </div>
                </Link>
                
                <Link to="/TourOrder">
                <div className="tour-cake-container">
                  <div className="tour-sixth-cake-img" />
                  <div className="tour-cake-name2">
                    <div className="sixthcake-name">곰돌이케이크</div>
                  </div>
                  <div className="tour-cake-add">
                    <div className="cake-address">광주광역시 동구</div>
                  </div>
                </div>
                </Link>
                </div>


              <div className="element-2">
              <Link to="/TourOrder">
                <div className="tour-cake-container">
                  <div className="tour-seventh-cake" />
                  <div className="tour-cake-name2">
                    <div className="seventhcake-name">아이스크림케이크</div>
                  </div>
                  <div className="tour-cake-add">
                    <div className="cake-address">광주광역시 동구</div>
                  </div>
                </div>
                </Link>

              <Link to="/TourOrder">
                <div className="tour-cake-container">
                  <div className="tour-eighth-cake-img" />
                  <div className="tour-cake-name2">
                    <div className="eighthcake-name">꽃다발케이크</div>
                  </div>
                  <div className="tour-cake-add">
                    <div className="cake-address">광주광역시 동구</div>
                  </div>
                </div>
                </Link>

              <Link to="/TourOrder">
                <div className="tour-cake-container">
                  <div className="tour-nine-cake-img">
                  </div>
                  <div className="tour-cake-name2">
                    <div className="ninethcake-name">산타케이크</div>
                  </div>
                  <div className="tour-cake-add">
                    <div className="cake-address">광주광역시 동구</div>
                  </div>
                </div>
              </Link>
              </div>
            </div>
          </div>

          <div className="location-container">
        <div className="tour-locationbutton">
            <button
                  className="locationbutton"
                  onClick={toggleLocationModal}
                  style={{ backgroundColor: isLocationModalOpen ? "#61a4d5" : "" , color: isLocationModalOpen ? "white" : "", }}
                >
                  지역 선택
                </button>
                {isLocationModalOpen && <selectLocation />}
                <button
                  className="mylocationbutton"
                  onClick={toggleMyLocation}
                  style={{ backgroundColor: myLocation ? "#61a4d5" : "" , color: myLocation ? "white" : "", }}
                >
                  내 주변
                </button>
        </div>
      </div>
      {isLocationModalOpen && <selectLocation/>}
    </div>

        </div>
        </div>       

  
  );
};


export default Cakes