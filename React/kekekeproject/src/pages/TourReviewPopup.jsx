import React from 'react'
import "../css/TourReviewPopup.css";

export const TourReviewPopup = () => {
    return (
            <div className="ToureRvPop"> {/* 전체 프레임 */}

                <div className="ToureRvPoptopFr">{/* 작성자 작성일 출우을발 */}
                    <div className="ToureRvPoptop_div1">
                        <div className="text-wrapper">2023.10.20</div>
                        <div className="text-wrapper-2">작성일 :</div>
                    </div>
                    <div className="ToureRvPoptop_div2">
                        <div className="text-wrapper">홍길동 님</div>
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
                        <div className="ToureRvPop_cakeimFr_text-wrapper">라라케이크</div>
                        </div>
                        <div className="ToureRvPop_cakeimFr_div-2">
                        <div className="ToureRvPop_cakeimFr_text-wrapper-2">티아라 케이크</div>
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
                        <div className="ToureRvPop_divTextCakeFr">
                            <p className="ToureRvPop_p">
                            케이크 바닐라 반쪽만해주시고 <br />
                            어찌고저찌고 어찌고 저찌고
                            </p>
                        </div>
                        </div>
                        <div className="ToureRvPop_div-5">
                        <div className="ToureRvPop_div-4">
                            <div className="ToureRvPop_text-wrapper-2">케이크 맛 :</div>
                        </div>
                        <div className="ToureRvPop_div-4">
                            <div className="ToureRvPop_text-wrapper-3">바닐라</div>
                        </div>
                        </div>
                        <div className="ToureRvPop_div-6">
                        <div className="ToureRvPop_CakeSize">
                            <div className="ToureRvPop_text-wrapper-2">케이크 크기 :</div>
                        </div>
                        <div className="ToureRvPop_CakeSize">
                            <div className="ToureRvPop_text-wrapper-3">2호 케이크</div>
                        </div>
                        </div>
                    </div>   {/* 케이무주문내역끝 */}    
                        <div className="ToureRvPop_text-userRivew">사용자 리뷰</div>{/* 사용자리뷰텍스트 */}
                        <div className='ToureRvPop_userPinkbox'>
                        <div className ='ToureRvPop_userPinkboxRivewFr'>
                            하이용
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