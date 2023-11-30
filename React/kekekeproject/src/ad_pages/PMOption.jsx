// 상품 관리의 상품 옵션 페이지

import React,{useState, useEffect} from 'react'
import AdMT from '../ad_component/AdMT'
import AdBG from '../ad_component/AdBG'
import AdMenubar from '../component/AdMenubar'
import ProductManagement from '../ad_component/ProductManagement'
import '../ad_css/PMOption.css'
import {FaTrash} from 'react-icons/fa';
import AdHeader from '../component/AdHeader'
import API_URL from '../api_url';
import axios from 'axios';
import Swal from 'sweetalert2'

const PMOption = () => {

  const [cakeFlavor, setCakeFlavor] = useState(''); // 케이크 맛 입력 상태
  const [additionalCost, setAdditionalCost] = useState(''); // 추가 금액 입력 상태
  const [flavorList, setFlavorList] = useState([]); // 케이크 맛 리스트

  
  const [cakeSize, setCakeSize] = useState(''); 
  const [additionalCost2, setAdditionalCost2] = useState(''); // 추가 금액 입력 상태
  const [flavorList2, setFlavorList2] = useState([]); // 케이크 맛 리스트
  const [sellerinfo, setSellerInfo] = useState([]);



  
  // 세션 스토리지에서 데이터 불러오기
useEffect(() => {
  const adminStorageData = sessionStorage.getItem('adminData');
  if (adminStorageData) {
    const adminData = JSON.parse(adminStorageData);
    setSellerInfo(adminData);
    console.log('어드민정보',adminData);
    
    
  }
}, []);





  const addFlavorAndCost = () => {
    if (cakeFlavor && additionalCost) {
      // 입력된 정보가 있을 경우에만 추가
      const newFlavor = `케이크 맛 : ${cakeFlavor}, 추가 금액 :    ${additionalCost}원`; // 케이크 맛과 추가 금액을 합침
      setFlavorList([...flavorList, newFlavor]); // 새로운 정보를 리스트에 추가
      setCakeFlavor(''); // 케이크 맛 입력값 초기화
      setAdditionalCost(''); // 추가 금액 입력값 초기화
    }
  };
  const addFlavorAndCost2 = () => {
    if (cakeSize && additionalCost2) {
      // 입력된 정보가 있을 경우에만 추가
      const newFlavor2 = `케이크 크기 : ${cakeSize}, 추가 금액 :    ${additionalCost2}원`; // 케이크 맛과 추가 금액을 합침
      setFlavorList2([...flavorList2, newFlavor2]); // 새로운 정보를 리스트에 추가
      setCakeSize(''); // 케이크 맛 입력값 초기화
      setAdditionalCost2(''); // 추가 금액 입력값 초기화
    }
  };



  const removeFlavor = (index) => {
    const updatedList = [...flavorList];
    updatedList.splice(index, 1); // 선택한 인덱스의 요소를 삭제
    setFlavorList(updatedList); // 새로운 리스트로 업데이트
  };
  
  const removeFlavor2 = (index) => {
    const updatedList = [...flavorList2];
    updatedList.splice(index, 1); // 선택한 인덱스의 요소를 삭제
    setFlavorList2(updatedList); // 새로운 리스트로 업데이트
  };

  
  const [logInfo,setLog] = useState(''); // 로그를 저장할 상태

  const saveLog = () => {
    // flavorList, flavorList2, 그리고 레터링 안내문구를 로그에 저장
    const logInfo = `Flavor List: ${flavorList.join(', ')}, Flavor List 2: ${flavorList2.join(', ')}, 레터링 안내문구: ${letteringText}`;
    setLog(logInfo); // 로그 상태 업데이트
    console.log("로그정보다운받는곳",logInfo); // 콘솔에 로그 출력
  };

  const [letteringText, setLetteringText] = useState(''); // 레터링 안내문구 상태


  const saveOptions = async () => {
    // 케이크 맛과 크기 정보를 JSON 형식으로 변환
    const payload = {
      flavors: flavorList.map(item => {
        const [flavor, cost] = item.replace('케이크 맛 : ', '').split(', 추가 금액 : ');
        return { flavor, cost };
      }),
      sizes: flavorList2.map(item => {
        const [size, cost] = item.replace('케이크 크기 : ', '').split(', 추가 금액 : ');
        return { size, cost };
      }),
      sellerId: sellerinfo.seller_id,
      letteringGuide: letteringText
    };
  
    
  try {
    // API 요청
    const response = await fetch(`${API_URL}/order/saveoption`, { // 경로 수정
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log("옵션 저장 성공");
      saveLog(); // 로그 저장 함수 호출

      Swal.fire({
        title: '성공!',
        text: '옵션이 성공적으로 수정되었습니다.',
        icon: 'success',
        confirmButtonText: '확인'
      }).then(() => {
        window.location.reload(); // 팝업 닫힌 후 페이지 새로고침
      });

    } else {
      console.error("옵션 저장 실패");
      Swal.fire({
        title: '실패!',
        text: '옵션 저장에 실패했습니다.',
        icon: 'error',
        confirmButtonText: '닫기'
      });
    }
  } catch (error) {
    console.error("API 요청 중 에러 발생:", error);
    Swal.fire({
      title: '오류 발생',
      text: '오류가 발생했습니다.',
      icon: 'error',
      confirmButtonText: '닫기'
    });
  }

  console.log('Payload:', payload);
};



  return (
    <div>
      <AdHeader />
        <AdMT>상품옵션</AdMT>
        <AdMenubar/>
        <AdBG>
        <ProductManagement initialActiveTab="option" />  

      <div className='pmoption_container'>
          <div className='pmoption_list1'>케이크 맛 : </div>
            <div className='pmoption_screen1'>
              <input className='screen_taste'
                type='text'
                placeholder='케이크 맛을 작성해주세요'
                value={cakeFlavor}
                onChange={(e)=>setCakeFlavor(e.target.value)}></input>
            </div>
            <div className='pmoption_screen2'>
              <input className='taste_cost'
                     type='number'
                     placeholder='추가 금액을 입력해주세요'
                     value={additionalCost}
                     onChange={(e) => {
                      // Make sure the input value is not longer than 7 digits
                      if (e.target.value.length <= 7) {
                        setAdditionalCost(e.target.value);
                      }
                    }}
                     min={0}
              />
            </div>
            <div className='pmoption_screen3'>
              <div className='add_button' onClick={addFlavorAndCost}>+</div>
            </div>
            <div className='flavor_list'>
        {flavorList.map((item, index) => (
          <div className='result' key={index}>{item}
          <FaTrash className='delete_button' size={20} onClick={() => removeFlavor(index)}/></div>
        ))}
      </div>  
            
          <div className='pmoption_list2'>케이크 크기 : </div>
          <div className='pmoption_screen4'>
              <input className='screen_size'
                type='text'
                placeholder='케이크 크기'
                value={cakeSize}
                onChange={(e)=>setCakeSize(e.target.value)}></input>
            </div>
           
<div className='pmoption_screen5'>
  <input className='taste_cost'
         type='number'
         placeholder='추가 금액을 입력해주세요'
         value={additionalCost2} // 이 부분을 setAdditionalCost2로 바꿔야 합니다.
         onChange={(e) => {
          // Make sure the input value is not longer than 7 digits
          if (e.target.value.length <= 7) {
            setAdditionalCost2(e.target.value); // 이 부분도 setAdditionalCost2로 바꿔야 합니다.
          }
        }}
         min={0}
  />
</div>

            <div className='pmoption_screen6'>
              <div className='add_button' onClick={addFlavorAndCost2}>+</div>
            </div>
            <div className='flavor_list2'>
        {flavorList2.map((item, index) => (
          <div className='result2' key={index}>{item}
          <FaTrash className='delete_button' size={15} onClick={() => removeFlavor2(index)} /> </div>
        ))}
      </div>  
          <div className='pmoption_list3'>레터링 안내문구 : </div>
          <input 
            className='pmoption_textarea'
            type='textarea'
            placeholder='예) 15~20자 이내 작성'
            maxLength={30}
            value={letteringText}
            onChange={(e)=>setLetteringText(e.target.value)}
          
          />
      </div>  
   {/* 수정하기 버튼 */}
   <div className="PMOPtion-modify-btn">
            <button className="PMOPtion-modifytxt" onClick={saveOptions}>
              수정하기
            </button>
          </div>
          {/* <div className="log-output">
        <p>로그:</p>
        <p>{log}</p>
      </div> */}
      </AdBG>
    </div>
  )
}

export default PMOption 