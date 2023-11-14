import React from 'react'
import "../css/TourReviewPopup.css";

export const TourReviewPopup = () => {
    const RvCakeSize = "2호 케이크"
    const RvCakeFlavor = "바닐라"
    const RvRequire =  "이제야 목적지를 정했지만 가려한 날 막아서네 난 갈 길이 먼데 새빨간 얼굴로 화를 냈던 친구가 생각나네 이미 난 발걸음을 떼었지만 가려한 날 재촉하네 걷기도 힘든데 새파랗게 겁에 질려 도망간 친구가 뇌에 멤"
    const Rvshopname = "라라케이크"
    const RvCakeName = "티아라케이크"
    const RvReview = "이제야 목적지를 정했지만 가려한 날 막아서네 난 갈 길이 먼데 새빨간 얼굴로 화를 냈던 친구가 생각나네 이미 난 발걸음을 떼었지만 가려한 날 재촉하네 걷기도 힘든데 새파랗게 겁에 질려 도망간 친구가 뇌에 멤도네"
    
    const RvCust = "홍길동"
    const RvDate = "2023.10.20"

    
    return (
            <div className="ToureRvPop"> {/* 전체 프레임 */}

                <div className="ToureRvPoptopFr">{/* 작성자 작성일 출우을발 */}
                    <div className="ToureRvPoptop_div1">
                        <div className="text-wrapper">{RvDate}</div>
                        <div className="text-wrapper-2">작성일 :</div>
                    </div>
                    <div className="ToureRvPoptop_div2">
                        <div className="text-wrapper">{RvCust} 님</div>
                        <div className="text-wrapper-2">작성자 :</div>
                    </div>
                    </div>{/* 작성자 작성일끝 */}



                <div className="ToureRvPop_cakeimg"> {/* 케이크이미지 */}
                     <img 
                          className="ToureRvPop_cakeimgbox" 
                          alt="Cakeimgbox"
                          src="https://cdn.animaapp.com/projects/654a0c7461a415cac322d4c9/releases/654a0c7dc209185e0a9adad7/img/tourdet3-cakeimgbox1.png"
                        />
                    <div className="ToureRvPop_cakeimFr">
                        <div className="ToureRvPop_cakeimFr_div">
                        <div className="ToureRvPop_cakeimFr_text-wrapper">{Rvshopname}</div>
                        </div>
                        <div className="ToureRvPop_cakeimFr_div-2">
                        <div className="ToureRvPop_cakeimFr_text-wrapper-2">{RvCakeName}</div>
                        </div>
                    </div>
                    
                    </div>{/* 케이크이미지 끝*/}




                    <div className="ToureRvPop_div"> 
                        <div className="ToureRvPop_text-wrapper">케이크 주문내역</div>{/*케이크 주문내역텍스트 */}
                    </div>
                    <div className="ToureRvPop_div-2">{/* 케이크주문내역시작 */}
                        <div className="ToureRvPop_div-2">
                        <div className="ToureRvPop_rectangle" />
                        </div>
                        <div className="ToureRvPop_div-3">
                        <div className="ToureRvPop_textDetCakeFr">
                            <div className="ToureRvPop_textDetCake">케이크 요청사항 :</div>
                        </div>
                       
                            <p className="ToureRvPop_p">
                            {RvRequire}
                            </p>
                       
                        </div>
                        <div className="ToureRvPop_div-5">
                        <div className="ToureRvPop_div-4">
                            <div className="ToureRvPop_text-wrapper-2">케이크 맛 :</div>
                        </div>
                        <div className="ToureRvPop_div-4">
                            <div className="ToureRvPop_text-wrapper-3">{RvCakeFlavor}</div>
                        </div>
                        </div>
                        <div className="ToureRvPop_div-6">
                        <div className="ToureRvPop_CakeSize">
                            <div className="ToureRvPop_text-wrapper-2">케이크 크기 :</div>
                        </div>
                        <div className="ToureRvPop_CakeSize">
                            <div className="ToureRvPop_text-wrapper-3">{RvCakeSize}</div>
                        </div>
                        </div>
                    </div>   {/* 케이무주문내역끝 */}    
                        <div className="ToureRvPop_text-userRivew">사용자 리뷰</div>{/* 사용자리뷰텍스트 */}
                        <div className='ToureRvPop_userPinkbox'>
                        <div className ='ToureRvPop_userPinkboxRivewFr'>
                            {RvReview}
                        </div>
                        </div>{/* 사용자리뷰박스 */}

                       
                            <div className="ToureRvPop_box_div-wrapper">{/* 확인버튼 */}
                            <div className="ToureRvPop_box_div">
                                <div className="ToureRvPop_box_text-wrapper">확인</div>
                            </div>  {/* 확인버튼 끝 */}
                            
                        </div>
            </div>
           



            
    );
};

export default TourReviewPopup;