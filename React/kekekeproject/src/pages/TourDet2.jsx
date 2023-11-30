import React, { useState, useEffect } from "react";
import "../css/TourDet2.css";
import TourDetContainer from '../component/TourDetContainer'
import axios from 'axios';
import API_URL from '../api_url';
import { useLocation } from 'react-router-dom';
import MapContainer from "./MapContainer";
import BlueBg from "../component/BlueBg";

const TourDet2 = () => {


  const [storeInfo, setStoreInfo] = useState({
    StoreAddr1: "",
    SHOP_ADDR2: "",
    // 다른 필드들에 대한 초기값도 추가할 수 있음
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const prd_id = searchParams.get('prd_id');

  
  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (prd_id) {
          const response = await axios.post(`${API_URL}/sample/samplecake`, { prd_id });
          const responseData = response.data;

          // 상태 업데이트
          setStoreInfo({
            CakeLogo: responseData.productInfo.SELLER_PROFILE1, //가게 로고
            StoreName: responseData.productInfo.STORE_NAME,   // 상호명
            StoreAddr1: responseData.productInfo.SHOP_ADDR1,  // 주소1
            StoreDetail: responseData.productInfo.STORE_DETAIL ,// 가게소개
            SHOP_ADDR2: responseData.productInfo.SHOP_ADDR2,//가게 상세주소
            SEL_LAT: responseData.productInfo.SEL_LAT,//위도
            SEL_LONG: responseData.productInfo.SEL_LONG,//경도
            STRG_USE: responseData.productInfo.STRG_USE,//보관및이용방법
            ADD_DETAIL: responseData.productInfo.ADD_DETAIL, // 예약주의사항
            PHONE: responseData.productInfo.PHONE,// 전화번호
            START_TIME: responseData.productInfo.START_TIME, //가게시간 시작
            END_TIME: responseData.productInfo.END_TIME, // 가게시간끝
            BUSINESS_NUM: responseData.productInfo.BUSINESS_NUM,// 사업자등록번호
            USER_NAME: responseData.productInfo.USER_NAME,// 대표자명(닉네임?)
          });

        
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [prd_id]);
  
 // 시작 시간과 종료 시간을 초까지 포함된 형식에서 시간만 표시하는 함수
const formatTime = (timeString) => {
  if (timeString) {
    return timeString.split(":").slice(0, 2).join(":");
  }
  return ""; // timeString이 없을 때는 빈 문자열 반환
};
window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동

    return (
      <div>
        <TourDetContainer initialActiveTab="tour-det2"  storeInfo={storeInfo}>
        <div className="index">
            <div className="TourDet2_bluebox2">

              <div className="TourDet2_tour-det-white-fr">{/*리뷰목록 있는하얀색 블록 div시작*/}
              <vr className="TourDet2_line"></vr>{/*구분선*/}

              <div className="TourDet2_tour-det-map-fr">{/*지도*/}
                <div className="TourDet2_tour-det-addr-fr">
                  <p className="TourDet2_mapAddr">{storeInfo.StoreAddr1} {storeInfo.SHOP_ADDR2}</p>
                </div>
                <div className="TourDet2_tour-det-map-wrapper">
                {/* <MapContainer lat={storeInfo.SEL_LAT} lng={storeInfo.SEL_LONG} /> */}
                <MapContainer address={`${storeInfo.StoreAddr1} ${storeInfo.SHOP_ADDR2}`} />
                </div>
              </div>{/*지도끝*/}


              <div className="TourDet2_usefr"> {/*보관및이용방법*/}
                  <div className="TourDet2_tourdet-usefr">
                    <div className="TourDet2_usefrtx">보관 및 이용방법</div>  
                  </div>
            
                <div className="TourDet2_useinput">
                  <pre className="TourDet2_useinputtx">
                    {storeInfo.STRG_USE}                 
                  </pre>
                  </div>
                    
                  </div>  {/*보관및이용방법*/}

                  <div className="TourDet2_Introtour">{/*랑랑케이크를 소개합니다*/}
                      <div className="TourDet2_Introdetailfr">
                        <div className="TourDet2_Introoverlap-group">
                          <div className="TourDet2_Introcallfr">
                            <div className="TourDet2_Introcalltx">
                              <div className="TourDet2_infoLabel">문의 전화</div>
                            </div>
                            <div className="TourDet2_Introcallinput">
                              <div className="TourDet2_infoValue">{storeInfo.PHONE}</div>
                            </div>
                          </div>
                          <div className="TourDet2_Introadvicefr">
                            <div className="TourDet2_Introadtx">
                              <div className="TourDet2_infoLabel">상담가능 시간</div>
                            </div>
                            <div className="TourDet2_Introadinput">
                              <div className="TourDet2_infoValue">{formatTime(storeInfo.START_TIME)} ~ {formatTime(storeInfo.END_TIME)}</div>
                            </div>
                          </div>
                          <div className="TourDet2_Intronumfr">
                            <div className="TourDet2_Introreginput">
                              <div className="TourDet2_infoValue">{storeInfo.BUSINESS_NUM}</div>
                            </div>
                            <div className="TourDet2_Introregnum">
                              <div className="TourDet2_infoLabel">사업자등록번호</div>
                            </div>
                          </div>
                          <div className="TourDet2_Introonerfr">
                            <div className="TourDet2_Introtextfr">
                              <div className="TourDet2_infoLabel">대표자명</div>
                            </div>
                            <div className="TourDet2_Intronamefr">
                              <div className="TourDet2_infoValue">{storeInfo.USER_NAME}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="TourDet2_Introintro">
                        <div className="TourDet2_infoLabel" style={{fontSize : '28px'}}>★ {storeInfo.StoreName} ★</div>
                      </div>
                    </div>{/*랑랑케이크를 소개합니다끝*/}


                    <div className="TourDet2_reserve">{/*예약주의사항시작*/}
                    <div className="TourDet2_resinputfr">
                      <p className="TourDet2_resinputtx">

                        {storeInfo.ADD_DETAIL}

                      </p>
                    </div>
                    <div className="TourDet2_resfr">
                      <div className="TourDet2_restx">예약 주의사항</div>
                    </div>
                  </div>{/*예약주의사항끝*/}

              </div>

            </div>
          </div>
          </TourDetContainer>
         
          </div>
      );
    };
        
    

export default TourDet2;