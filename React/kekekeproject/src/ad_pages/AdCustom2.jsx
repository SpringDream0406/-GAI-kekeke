import React, { useEffect, useState } from 'react'
import AdMenubar from '../component/AdMenubar'
import AdMT from '../ad_component/AdMT'
import AdBG from '../ad_component/AdBG'
import '../ad_css/AdCustom2.css'
import {useNavigate} from 'react-router-dom'
import AdHeader from '../component/AdHeader'
import { useLocation } from 'react-router-dom';
import API_URL from '../api_url'
import axios from 'axios'


const AdCustom2 = () => {
  const [sellerinfo, setSellerInfo] = useState()
  const location = useLocation(null);
  const selectedData = location.state?.selectedData;
  const [reviewmsg, setReviewMsg] = useState('');



    // 세션 스토리지에서 데이터 불러오기 및 초기 데이터 작성
    useEffect(() => {
      const adminStorageData = sessionStorage.getItem('adminData');
      if (adminStorageData) {
        const adminData = JSON.parse(adminStorageData);
        setSellerInfo(adminData);
      }
    }, []); // 빈 배열을 의존성 배열로 사용하여 한 번만 실행되도록 설정
   
    const navigate = useNavigate(); // useHistory 훅을 사용하여 history 인스턴스를 가져옵니다.

    const handleSendClick = async () => {
      if (selectedData && sellerinfo && sellerinfo.seller_id) {
        try {
          // 서버로 데이터 전송
          const response = await axios.post(`${API_URL}/seller/customreivew`, {
            seller_id: sellerinfo.seller_id,
            custom_id: selectedData.CUSTOM_ID,
            message: reviewmsg
          });
          console.log("응답:", response);
    
          // 데이터 전송 후 /admin/message 경로로 이동
          navigate('/admin/message');
        } catch (error) {
          console.log('에러:', error);
          // 에러 처리 (예: 사용자에게 에러 메시지 표시)
        }
      }
    };
    
      const handleBackClick = () => {
        navigate('/admin/customcake'); // '취소' 버튼을 클릭하면 /admin/customcake 경로로 이동합니다.
      };


    // 이미지 경로를 웹 URL로 변환하는 함수
    const convertImagePathToUrl = (imagePath) => {
      const pathWithoutPublic = imagePath.split('public\\').pop(); // 'public\' 부분을 제거합니다.
      return `${API_URL}/${pathWithoutPublic.replace(/\\/g, '/')}`; // 경로 구분자를 웹 표준에 맞게 변경합니다.

    };
   
      // 받아온데이터
      useEffect(() => {
        if (selectedData) {
          console.log("데이터이지롱:", selectedData);
        } else {
          console.log("선택된 데이터가 없습니다.");
        }
      }, [selectedData]);

      // 시간을 "HH:mm" 형식으로 변환하는 함수
        const formatTime = (timeString) => {
          const parts = timeString.split(' ');
          const timeParts = parts[0].split(':');
          const hours = parseInt(timeParts[0]);
          const minutes = parseInt(timeParts[1]);
          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        };

         // 날짜를 "YYYY-MM-DD" 형식으로 변환하는 함수
          const formatDate = (dateString) => {
            const date = new Date(dateString);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          };



         
            
    
  return (
    <div>
      <AdHeader></AdHeader>
         <AdMenubar/>
        <AdMT>커스텀케이크</AdMT>
        <AdBG height={1280}>

             <img src={convertImagePathToUrl(selectedData.CUST_DRAW)} alt='커스텀케이크이미지' className='ccd-img'/>

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
                    <div className='ccd-order-st-txt'>{formatDate(selectedData.CREATED_AT)}</div>
                    <div className='ccd-order-st-txt'>{selectedData.CAKE_SIZE}</div>
                    <div className='ccd-order-st-txt'>{selectedData.CAKE_FLAVOR}</div>
                    <div className='ccd-order-st-txt'>{selectedData.CKAE_DETAIL}</div>
                    <div className='ccd-order-st-txt'>{formatDate(selectedData.PICKUP_DATE)} / {formatTime(selectedData.PICKUP_TIME)}
                       
                    </div>
                </div>
                <div className='ccd-sendmsg'>메시지 보내기</div>
                <div className='ccd-sendmsgst'>※ 안내사항, 가격 등을 적어주시면 더 좋습니다.</div>
                <textarea
                                className="ccd-msg"
                                placeholder="보낼 메시지를 입력하세요."
                                rows="2" // 원하는 줄 수를 설정할 수 있습니다.
                                cols="50" // 가로 너비를 문자 수로 설정할 수 있습니다.
                                style={{ resize: 'none' }
                              } value={reviewmsg} onChange={(e)=>setReviewMsg(e.target.value)}// 사용자가 크기를 조정하지 못하도록 설정합니다.
                              ></textarea>

                <div className='ccd-sendbtn' onClick={handleSendClick}>보내기</div>
                <div className='ccd-backbtn' onClick={handleBackClick}>삭제</div>

            
             </div>
        </AdBG>
    </div>
  )
}

export default AdCustom2