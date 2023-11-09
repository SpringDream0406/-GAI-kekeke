import React from "react";
import "../css/TourDet2.css";



export const TourDet2 = () => {
    const CakeStoreName = '랑랑케이크';
    const StoreAddr = '강남구 도곡동';
    const StoreDetail = '강남구 도곡동에 위치한 주문제작 및 클래스 공방입니다. 사랑과 정성이 깃든 수제케이크로 당신의 소중한 순간을 더욱 특별하게 만들어드립니다! 달콤한 순간을 케이크와 함께 최상의 재료와 정성이 담긴 수제케이크로 당신을 맞이합니다.';
    const CakeName = '티아라케이크' ;
    const ReviewDate = '2023.10.31';
    const ReviewCust = "홍길동";
    const tourdet3_StoreLogo = "https://blogpfthumb-phinf.pstatic.net/MjAyMDA4MTNfMTQ4/MDAxNTk3MzA4MTg4MzQx._OxSWKBpTMPUkFOlAc0UUAWfeUVEzn-FStcvdwlxxFcg.fc00U8MAeCw9QDqNML0a6XGWcmgdn57fCjTu5dO1vnkg.PNG.theyoon_cake/%25EB%25A1%259C%25EA%25B3%25A0.png?type=w161";

    
    
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
                    
                      <div className="TourDet2_text-tourdet3-Sample">샘플케이크</div>
                   
                
                      <div className="TourDet2_text-tourdet3-StoreE">매장정보</div>
                  
                    
                      <div className="TourDet2_tour-det-review">리뷰</div>
                   
                  </div>{/* 샘플케이크, 매장정보, 리뷰 탭 div 끝*/} 
                </div>
              </div>




              <div className="TourDet2_storeinfo"> {/* 가게이미지,케이크집이름, 주소, 가게설명, 1:1:채팅div*/}
                <div className="TourDet2_tourdet">
                  <img className="TourDet2_tourdet3-StoreLog"
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
                    <div className="TourDet2_tour-det-chatbox"> {/* 1:1 채팅*/}
                      <div className="TourDet2_tourdet3Chatbox" />
                    </div>
                    <div className="TourDet2_tourdet3ChatboxTx">1:1 채팅</div>
                  
                </div>
              </div>{/* 가게이미지,케이크집이름, 주소, 가게설명, 1:1:채팅div끝*/}

              <div className="TourDet2_tour-det-white-fr">{/*리뷰목록 있는하얀색 블록 div시작*/}
               

              </div>




             





            </div>
          </div>
        </div>
      );
    };
        
    

export default TourDet2;