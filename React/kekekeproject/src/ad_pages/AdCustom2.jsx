import React from 'react'
import AdMenubar from '../component/AdMenubar'
import AdMT from '../ad_component/AdMT'
import AdBG from '../ad_component/AdBG'
import '../ad_css/AdCustom2.css'
import {useNavigate} from 'react-router-dom'
import AdHeader from '../component/AdHeader'



const AdCustom2 = () => {
    const navigate = useNavigate(); // useHistory 훅을 사용하여 history 인스턴스를 가져옵니다.

    const handleSendClick = () => {
        navigate('/admin/message'); // '보내기' 버튼을 클릭하면 /admin/message 경로로 이동합니다.
      };
    
      const handleBackClick = () => {
        navigate('/admin/customcake'); // '취소' 버튼을 클릭하면 /admin/customcake 경로로 이동합니다.
      };


     
    
  return (
    <div>
      <AdHeader></AdHeader>
         <AdMenubar/>
        <AdMT>커스텀케이크</AdMT>
        <AdBG height={1280}>

             <img src={'/assets/images/cake3.jpg'} alt='커스텀케이크이미지' className='ccd-img'/>

             <div className='ccd-order-st-container'>
                <div className='ccd-ordermt'>케이크 주문서</div>

                <div className='ccd-order-st'>
                <div>예약날짜 :</div>
                <div>케이크크기 :</div>
                <div>케이크맛 :</div>
                <div>케이크문구 :</div>
                <div>픽업요청 :</div>
                </div>

                <div className='ccd-order-st-2'>
                    <div className='ccd-order-st-txt'>2023.04.05</div>
                    <div className='ccd-order-st-txt'>2호</div>
                    <div className='ccd-order-st-txt'>생과일</div>
                    <div className='ccd-order-st-txt'>메리크리스마스(영어로)</div>
                    <div className='ccd-order-st-txt'>2023.04.09 
                        14:00 PM
                    </div>
                </div>
                <div className='ccd-sendmsg'>메시지 보내기</div>
                <div className='ccd-sendmsgst'>※ 안내사항, 가격 등을 적어주시면 더 좋습니다.</div>
                <textarea
                                className="ccd-msg"
                                placeholder="보낼 메시지를 입력하세요."
                                rows="2" // 원하는 줄 수를 설정할 수 있습니다.
                                cols="50" // 가로 너비를 문자 수로 설정할 수 있습니다.
                                style={{ resize: 'none' }} // 사용자가 크기를 조정하지 못하도록 설정합니다.
                              ></textarea>

                <div className='ccd-sendbtn' onClick={handleSendClick}>보내기</div>
                <div className='ccd-backbtn' onClick={handleBackClick}>삭제</div>

            
             </div>
        </AdBG>
    </div>
  )
}

export default AdCustom2