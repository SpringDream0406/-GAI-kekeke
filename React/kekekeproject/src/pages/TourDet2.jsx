import React from "react";
import "../css/TourDet2.css";
import { Link } from 'react-router-dom';
import TourDetContainer from '../component/TourDetContainer'



const TourDet2 = () => {
  const Det2_addrImg = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNjEyMThfNjIg%2FMDAxNDgyMDEwOTYyMjE3.NBz1SUuPdMIeljh7qMeh9bopCaRXoSDJdaWJDQm-MS4g.1QeSqdg_GX69J-9A6vLsCYrhD73sc7pbrl-GLgXhgJYg.JPEG.mistralnam%2F00000_161117_083404_9852.jpg&type=a340"
  
  const SellerData = {
    shopInfo: {
      name: "랑랑케이크",
      phoneNumber: "010-1234-1234",
      availableTime: "09:00 ~ 21:00",
      businessNumber: "613-13-21032135",
      representativeName: "홍길동",
      address: "서울 강남구 남부순환로363길 16 1층",
      orderInfo: "주문은 최소 7일전에 부탁합니다. \n\n하루에 정해진 양만 만들기 때문에 마감을 예상하지 못합니다.\n\n주문제작 특성상 제작 순서는 입금순으로 정해집니다. \n\n당일 100% 환불, 주문 다음날부터 픽업 5일전 50% 환불, 픽업 3일전 30% 환불, 픽업 1~2일전 환불 불가. 직접 픽업을 원칙으로 합니다.\n\n 고객님께서 퀵업체를 픽업시간에 맞추어 공방으로 보내주시기 바랍니다. (퀵요금 현금 선불입니다.) \n\n배송요청시 구매자가 파손면책 동의한 것으로 간주되며 발송후 어떠한 문제에 대하여 책임지지 않습니다.",
      storageUsage: "제품 특성상 당일 섭취를 권장드립니다. \n\n픽업 후 고온의 장소, 차안이나 밀폐된 공간은 보관 금지합니다. \n\n수령 후 30분 이내로 냉장 (0~5도 이하) 보관하셔야 하며, 섭취 전 미리 꺼내어 놓으시면 좋습니다. \n\n생크림 제품은 제작 2일 이내에 모두 드시는 것을 추천드립니다."
    },
    
  };

    return (
      <div>
      <TourDetContainer containerHeight="2050px">
        <div className="index">
            <div className="TourDet2_bluebox2">

              <div className="TourDet2_tour-det-white-fr">{/*리뷰목록 있는하얀색 블록 div시작*/}
              <vr className="TourDet2_line"></vr>{/*구분선*/}

              <div className="TourDet2_tour-det-map-fr">{/*지도*/}
                <div className="TourDet2_tour-det-addr-fr">
                  <p className="TourDet2_mapAddr">{SellerData.shopInfo.address}</p>
                </div>
                <div className="TourDet2_tour-det-map-wrapper">
                  <img className="TourDet2_tour-det-map" alt="Tour det map" src={Det2_addrImg} />
                </div>
              </div>{/*지도끝*/}


              <div className="TourDet2_usefr"> {/*보관및이용방법*/}
                  <div className="TourDet2_tourdet-usefr">
                    <div className="TourDet2_usefrtx">보관 및 이용방법</div>  
                  </div>
            
                <div className="TourDet2_useinput">
                  <pre className="TourDet2_useinputtx">
                    {SellerData.shopInfo.storageUsage}                 
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
                              <div className="TourDet2_infoValue">{SellerData.shopInfo.phoneNumber}</div>
                            </div>
                          </div>
                          <div className="TourDet2_Introadvicefr">
                            <div className="TourDet2_Introadtx">
                              <div className="TourDet2_infoLabel">상담가능 시간</div>
                            </div>
                            <div className="TourDet2_Introadinput">
                              <div className="TourDet2_infoValue">{SellerData.shopInfo.availableTime}</div>
                            </div>
                          </div>
                          <div className="TourDet2_Intronumfr">
                            <div className="TourDet2_Introreginput">
                              <div className="TourDet2_infoValue">{SellerData.shopInfo.businessNumber}</div>
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
                              <div className="TourDet2_infoValue">{SellerData.shopInfo.representativeName}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="TourDet2_Introintro">
                        <div className="TourDet2_infoLabel" style={{fontSize : '28px'}}>★ {SellerData.shopInfo.name} ★</div>
                      </div>
                    </div>{/*랑랑케이크를 소개합니다끝*/}


                    <div className="TourDet2_reserve">{/*예약주의사항시작*/}
                    <div className="TourDet2_resinputfr">
                      <p className="TourDet2_resinputtx">

                        {SellerData.shopInfo.orderInfo}

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