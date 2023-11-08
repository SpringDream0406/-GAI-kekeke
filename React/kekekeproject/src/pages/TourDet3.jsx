import React from "react";
import "../css/TourDet3.css";



export const TourDet3 = () => {
    const CakeStoreName = '랑랑케이크';
    const StoreAddr = '강남구 도곡동';
    const StoreDetail = '강남구 도곡동에 위치한 주문제작 및 클래스 공방입니다. 사랑과 정성이 깃든 수제케이크로 당신의 소중한 순간을 더욱 특별하게 만들어드립니다! 달콤한 순간을 케이크와 함께 최상의 재료와 정성이 담긴 수제케이크로 당신을 맞이합니다.';
    const CakeName = '티아라케이크' ;
    const ReviewDate = '2023.10.31';
    const ReviewCust = "홍길동";
    const tourdet3_StoreLogo = "https://blogpfthumb-phinf.pstatic.net/MjAyMDA4MTNfMTQ4/MDAxNTk3MzA4MTg4MzQx._OxSWKBpTMPUkFOlAc0UUAWfeUVEzn-FStcvdwlxxFcg.fc00U8MAeCw9QDqNML0a6XGWcmgdn57fCjTu5dO1vnkg.PNG.theyoon_cake/%25EB%25A1%259C%25EA%25B3%25A0.png?type=w161";

    
    
    return (
        <div className="index">
          <div className="tourFrame">
            <div className="bluebox">
              <div className="bodyfr">
                <div className="overlap-group">
                  <div className="group">
                    <div className="overlap-group">
                      <div className="div" />
                      <div className="ellipse" />
                      <div className="rectangle" />
                    </div>
                  </div>



                  <div className="tourdet3-SampleStoreReviewFr"> {/* 샘플케이크, 매장정보, 리뷰 탭 div */}
                    <div className="div-wrapper">
                      <div className="text-wrapper">샘플케이크</div>
                    </div>
                    <div className="div-wrapper">
                      <div className="text-wrapper">매장정보</div>
                    </div>
                    <div className="div-wrapper">
                      <div className="tour-det-review">리뷰</div>
                    </div>
                  </div>{/* 샘플케이크, 매장정보, 리뷰 탭 div 끝*/} 
                </div>
              </div>




              <div className="storeinfo"> {/* 가게이미지,케이크집이름, 주소, 가게설명, 1:1:채팅div*/}
                <div className="tourdet">
                  <img className="tourdet3-StoreLog"
                    src={tourdet3_StoreLogo}
                    alt={CakeName}
                     />{/*가게 로고*/}
                </div>
                <div className="tourdet-3">
                  <div className="tourdet3-CakeStoreNameFrame">
                    <div className="tourdet3-CakeStoreName">{CakeStoreName}</div>{/* 가게 이름 넣는곳*/}
                  </div>
                  <div className="tour-det-addr">
                    <div className="tour-det-addr-tx">{StoreAddr}</div>{/* 가게 주소넣는곳*/}
                  </div>
                  <div className="tour-det-det">
                    <p className="tour-det-det-tx" >
                    {StoreDetail}{/* 가게 설명넣는곳*/}
                    </p>
                  </div>
                </div>
                
                  <div className="overlap-group-2">
                    <div className="tour-det-chatbox"> {/* 1:1 채팅*/}
                      <div className="tourdet3Chatbox" />
                    </div>
                    <div className="tourdet3ChatboxTx">1:1 채팅</div>
                  
                </div>
              </div>{/* 가게이미지,케이크집이름, 주소, 가게설명, 1:1:채팅div끝*/}






              <div className="tour-det-white-fr">{/*리뷰목록 있는하얀색 블록 div시작*/}
                <div className="tour-det-white-rec" />
                <div className="wrvlisttxfr">
                  <div className="tour-det-rv-list">리뷰목록</div>
                </div>
                <div className="wreviewtxfr">
                  <div className="tourdet-5">


                    <div className="tourdet-wlistfr">{/*케이크리스트 목록 div*/}
                      <div className="tourdet-cakeimg">
                        {/*가게 로고 넣는곳*/}
                        <img 
                          className="cakeimgbox" 
                          alt="Cakeimgbox"
                          src="https://cdn.animaapp.com/projects/654a0c7461a415cac322d4c9/releases/654a0c7dc209185e0a9adad7/img/tourdet3-cakeimgbox1.png"
                        />
                      </div>
                      <div className="cakervfr">
                        <div className="cakervdetfr">
                          <div className="tourdet-6"> {/* 케이크 이름 날짜 작성자 div */}
                            <div className="div-CakeName">
                              <div className="text-CakeName"  >{CakeName}</div>{/* 케이크 이름 */}
                            </div>
                            <div className="div-ReviewDate">
                              <div className="text-ReviewDate">{ReviewDate}</div>{/* 리뷰 작성날짜*/}
                            </div>
                            <div className="div-ReviewCust">
                              <div className="text-ReviewCust">{ReviewCust} 님</div>{/* 리뷰 작성자*/}
                            </div>
                          </div>                         {/* 케이크 이름 날짜 작성자 div끝 */}
                          <div className="div-ReviewRequire">
                            <p className="text-ReviewRequire">
                              케이크 호수&nbsp;&nbsp;: 1호&nbsp;&nbsp;&nbsp;&nbsp;케이크 맛 : 바닐라&nbsp;&nbsp; 세부요 ...
                            </p>
                          </div>
                        </div>
                        <div className="div-ReviewDetail">
                            
                          <p className="text-ReviewDetail">
                            꼭 사고싶었던 케이크에요 ㅠ 너무 예쁜거아니에요? 진짜? <br />
                            케이크도 맛있고 냠냠 여기서 꼭 사세여 진짜 존맛탱 진짜...
                          </p>
                          

                        </div>
                      </div>
                      <div className="line-wrapper">
                      <img
                        className="line"
                        alt="Line"
                        src="https://cdn.animaapp.com/projects/654a0c7461a415cac322d4c9/releases/654a0c7dc209185e0a9adad7/img/tourdetrvlist1line1.svg"
                      />
                    </div>    
                    </div>{/*리뷰목록 있는하얀색 블록 div끝*/}





                    


                  </div>
                </div>
                <div className="pagenumfr">
                  <div className="bfpfr">
                    <img
                      className="nextpicon"
                      alt="Nextpicon"
                      src="https://cdn.animaapp.com/projects/654a0c7461a415cac322d4c9/releases/654a0c7dc209185e0a9adad7/img/tourdet-leftbtniconfr.svg"
                    />
                  </div>
                  <div className="nextpnumfr">
                    <div className="numfr">
                      <div className="tourdet-num">
                        <div className="tourdet-numt">1</div>
                      </div>
                      <div className="tourdet-numt-wrapper">
                        <div className="tourdet-numt">2</div>
                      </div>
                      <div className="tourdet-num-2">
                        <div className="tourdet-numt">3</div>
                      </div>
                      <div className="tourdet-num-2">
                        <div className="tourdet-numt">4</div>
                      </div>
                      <div className="tourdet-numt-wrapper">
                        <div className="tourdet-numt">5</div>
                      </div>
                    </div>
                  </div>
                  <div className="ntpfr">
                    <img
                      className="ntpicon"
                      alt="Ntpicon"
                      src="https://cdn.animaapp.com/projects/654a0c7461a415cac322d4c9/releases/654a0c7dc209185e0a9adad7/img/tourdet-rightbtniconfr.svg"
                    />
                  </div>
                </div>
              </div>{/*리뷰목록 있는하얀색 블록 div끝*/}





            </div>
          </div>
        </div>
      );
    };
        
    

export default TourDet3;