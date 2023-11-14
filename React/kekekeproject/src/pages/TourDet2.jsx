import React from "react";
import "../css/TourDet2.css";
import { Link } from 'react-router-dom';



export const TourDet2 = () => {
    // 상단 소개 케이크 집 변수 
    const CakeStoreName = '랑랑케이크';
    const StoreAddr = '강남구 도곡동';
    const StoreDetail = '강남구 도곡동에 위치한 주문제작 및 클래스 공방입니다. 사랑과 정성이 깃든 수제케이크로 당신의 소중한 순간을 더욱 특별하게 만들어드립니다! 달콤한 순간을 케이크와 함께 최상의 재료와 정성이 담긴 수제케이크로 당신을 맞이합니다.';
    const CakeName = '티아라케이크' ;
    const tourdet3_StoreLogo = "https://blogpfthumb-phinf.pstatic.net/MjAyMDA4MTNfMTQ4/MDAxNTk3MzA4MTg4MzQx._OxSWKBpTMPUkFOlAc0UUAWfeUVEzn-FStcvdwlxxFcg.fc00U8MAeCw9QDqNML0a6XGWcmgdn57fCjTu5dO1vnkg.PNG.theyoon_cake/%25EB%25A1%259C%25EA%25B3%25A0.png?type=w161";

    // 예약주의사항 변수 임시
    const orderinfo = "주문은 최소 7일전에 부탁합니다. 하루에 정해진 양만 만들기 때문에 마감을 예상하지 못합니다.주문제작 특성상 제작 순서는 입금순으로 정해집니다"
    const Refund = "당일 100%환불 주문 다음날 부터 ~ 픽업 5일전 50% 환불픽업 3일전 30% 환불픽업 1~2일전 환불 불가"
    const deliveryinfo = "직접 픽업을 원칙으로 합니다고객님께서 퀵업체를 픽업시간에 맞추어 공방으로 보내주시기 바랍니다. (퀵요금 현금 선불입니다.)배송요청시 구매자가 파손면책 동의한 것으로 간주되며 발송후 어떠한 문제에 대하여 책임지지 않습니다."
    
    //보관 및 이용방법 변수 임시
    const use1 =  "1. 떡 및 앙금제품:\n" +
                  "1. 떡 및 앙금제품:\n" +
                  "   제품 특성상 당일 섭취를 권장드립니다.\n" +
                  "   픽업 후 고온의 장소, 차안이나 밀폐된 공간은 보관 금지합니다.\n" +
                  "   남은 떡은 소분하여\n" +
                  "   ● 설기: 냉동실 (자연해동 또는 랩핑하여 전자레인지 30초-1분 해동)\n" +
                  "   ● 앙금: 냉장실 (자연해동하여 설기에 토핑!)\n" +
                  "\n" +
                  "2. 생크림 제품:\n" +
                  "   수령 후 30분 이내로 냉장 (0~5도 이하) 보관하셔야 하며,\n" +
                  "   섭취 전 미리 꺼내어 놓으시면 좋습니다.\n" +
                  "   생크림 제품은 제작 2일 이내에 모두 드시는 것을 추천드립니다.asdsss"+
                  "\n" +
                  "2. 생크림 제품:\n" +
                  "   수령 후 30분 이내로 냉장 (0~5도 이하) 보관하셔야 하며,\n" +
                  "   섭취 전 미리 꺼내어 놓으시면 좋습니다.\n" +
                  "   생크림 제품은 제작 2일 이내에 모두 드시는 것을 추천드립니다.asdsss";
              
    
    // 가게 주소 지도 + 주소 변수 임시
    const Det2_addrtx = "서울 강남구 남부순환로363길 16 1층"
    const Det2_addrImg = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNjEyMThfNjIg%2FMDAxNDgyMDEwOTYyMjE3.NBz1SUuPdMIeljh7qMeh9bopCaRXoSDJdaWJDQm-MS4g.1QeSqdg_GX69J-9A6vLsCYrhD73sc7pbrl-GLgXhgJYg.JPEG.mistralnam%2F00000_161117_083404_9852.jpg&type=a340"

    // 본문 가게소개 임시
    const shopname = "랑랑케이크"
    const phone_num = "010-1234-1234"
    const business_num = "6131321032135"
    const chattime = "09:00 ~ 21:00"
    const onername = "홍길동"

    const handleChatBoxClick =() =>{
      window.open('/TourReviewPopup', '_blank');
    }


    return (
        <div className="index">
          <div className="TourDet2_tourFrame">
            <div className="TourDet2_bluebox">
              <div className="TourDet2_bodyfr">
                <div className="TourDet2_overlap-group">
                  <div className="TourDet2_group">
                    <div className="TourDet2_overlap-group">
                      <div className="TourDet2_div" />
                      <div className="TourDet2_ellipse" />
                      <div className="TourDet2_rectangle" />
                    </div>
                  </div>



                  <div className="TourDet2_tourdet3-SampleStoreReviewFr"> {/* 샘플케이크, 매장정보, 리뷰 탭 div */}
                    
                      <div className="TourDet2_text-tourdet3-Sample">
                      <Link to="/SampleCake"  style={{textDecoration: 'none'}} className="TourDet2_LinkStyle">샘플케이크</Link>
                      </div>
                   
                
                      <div className="TourDet2_text-tourdet3-Store">
                      매장정보
                      </div>
                  
                    
                      <div className="TourDet2_tour-det-review">
                      <Link to="/TourDet3"  style={{textDecoration: 'none'}} className="TourDet2_LinkStyle">리뷰</Link>
                      </div>
                   
                  </div>{/* 샘플케이크, 매장정보, 리뷰 탭 div 끝*/} 
                </div>
              </div>




              <div className="TourDet2_storeinfo"> {/* 가게이미지,케이크집이름, 주소, 가게설명, 1:1:채팅div*/}
                <div className="TourDet2_tourdet">
                  <img className="TourDet2_tourdet3-StoreLogo"
                    src={tourdet3_StoreLogo}
                    alt={CakeName}
                     />{/*가게 로고*/}
                </div>
                <div className="TourDet2_tourdet-3">
                  <div className="TourDet2_tourdet3-CakeStoreNameFrame">
                    <div className="TourDet2_tourdet3-CakeStoreName">{CakeStoreName}</div>{/* 가게 이름 넣는곳*/}
                  </div>
                  <div className="TourDet2_tour-det-addr">
                    <div className="TourDet2_tour-det-addr-tx">{StoreAddr}</div>{/* 가게 주소넣는곳*/}
                  </div>
                  <div className="TourDet2_tour-det-det">
                    <p className="TourDet2_tour-det-det-tx" >
                    {StoreDetail}{/* 가게 설명넣는곳*/}
                    </p>
                  </div>
                </div>
                
                  <div className="TourDet2_overlap-group-2">
                
                    <button className="TourDet2_tour-det-chatbox"  onClick = {handleChatBoxClick}> {/* 1:1 채팅*/}
                      <div className="TourDet2_tourdet3Chatbox" />
                      <div className="TourDet2_tourdet3ChatboxTx" >1:1 채팅</div>
                    </button>
                  
                </div>
              </div>{/* 가게이미지,케이크집이름, 주소, 가게설명, 1:1:채팅div끝*/}

              <div className="TourDet2_tour-det-white-fr">{/*리뷰목록 있는하얀색 블록 div시작*/}
              <vr className="TourDet2_line"></vr>{/*구분선*/}

              <div className="TourDet2_tour-det-map-fr">{/*지도*/}
                <div className="TourDet2_tour-det-addr-fr">
                  <p className="TourDet2_mapAddr">{Det2_addrtx}</p>
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
                    {use1}                 
                  </pre>
                  </div>
                    
                  </div>  {/*보관및이용방법*/}

                  <div className="TourDet2_Introtour">{/*랑랑케이크를 소개합니다*/}
                      <div className="TourDet2_Introdetailfr">
                        <div className="TourDet2_Introoverlap-group">
                          <div className="TourDet2_Introcallfr">
                            <div className="TourDet2_Introcalltx">
                              <div className="TourDet2_Introtext-wrapper">문의 전화</div>
                            </div>
                            <div className="TourDet2_Introcallinput">
                              <div className="TourDet2_Introtext-Number">{phone_num}</div>
                            </div>
                          </div>
                          <div className="TourDet2_Introadvicefr">
                            <div className="TourDet2_Introadtx">
                              <div className="TourDet2_Introtext-wrapper">상담가능 시간</div>
                            </div>
                            <div className="TourDet2_Introadinput">
                              <div className="TourDet2_Introtext-Time">{chattime}</div>
                            </div>
                          </div>
                          <div className="TourDet2_Intronumfr">
                            <div className="TourDet2_Introreginput">
                              <div >{business_num}</div>
                            </div>
                            <div className="TourDet2_Introregnum">
                              <div className="TourDet2_Introtext-wrapper">사업자등록번호</div>
                            </div>
                          </div>
                          <div className="TourDet2_Introonerfr">
                            <div className="TourDet2_Introtextfr">
                              <div className="TourDet2_Introtext-Oner">대표자명</div>
                            </div>
                            <div className="TourDet2_Intronamefr">
                              <div className="TourDet2_Introtext-Name">{onername}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="TourDet2_Introintro">
                        <div className="TourDet2_Introintrotx">{shopname}를 소개합니다★</div>
                      </div>
                    </div>{/*랑랑케이크를 소개합니다끝*/}
                    
                    <div className="TourDet2_reserve">{/*예약주의사항시작*/}
                    <div className="TourDet2_resinputfr">
                      <p className="TourDet2_resinputtx">
                        {" "}
                        주문관련 
                        <br />
                        <br />
                        {orderinfo}
                        <br />
                        <br />
                        <br />
                        환불규정
                        <br />
                        <br />
                        {Refund}
                        <br />
                        <br />
                        배송관련
                        <br />
                        <br />
                        {deliveryinfo}
                      </p>
                    </div>
                    <div className="TourDet2_resfr">
                      <div className="TourDet2_restx">예약 주의사항</div>
                    </div>
                  </div>{/*예약주의사항끝*/}

              </div>

            </div>
          </div>
        </div>
      );
    };
        
    

export default TourDet2;