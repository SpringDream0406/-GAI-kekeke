// 상품 관리의 상품 옵션 페이지

import React,{useState} from 'react'
import AdMT from '../ad_component/AdMT'
import AdBG from '../ad_component/AdBG'
import AdMenubar from '../component/AdMenubar'
import ProductManagement from '../ad_component/ProductManagement'
import '../ad_css/PMOption.css'
import {FaTrash} from 'react-icons/fa';
import AdHeader from '../component/AdHeader'

const PMOption = () => {

  const [cakeFlavor, setCakeFlavor] = useState(''); // 케이크 맛 입력 상태
  const [additionalCost, setAdditionalCost] = useState(''); // 추가 금액 입력 상태
  const [flavorList, setFlavorList] = useState([]); // 케이크 맛 리스트

  
  const [cakeSize, setCakeSize] = useState(''); 
  const [additionalCost2, setAdditionalCost2] = useState(''); // 추가 금액 입력 상태
  const [flavorList2, setFlavorList2] = useState([]); // 케이크 맛 리스트





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

  
  const [ setLog] = useState(''); // 로그를 저장할 상태

  const saveLog = () => {
    // flavorList, flavorList2, 그리고 레터링 안내문구를 로그에 저장
    const logInfo = `Flavor List: ${flavorList.join(', ')}, Flavor List 2: ${flavorList2.join(', ')}, 레터링 안내문구: ${letteringText}`;
    setLog(logInfo); // 로그 상태 업데이트
    console.log(logInfo); // 콘솔에 로그 출력
  };

  const [letteringText, setLetteringText] = useState(''); // 레터링 안내문구 상태

  const handleNumberChange = (e, setterFunction) => {
    const value = e.target.value;
    const numberValue = parseFloat(value); // 입력값을 숫자로 변환합니다.
    // 입력값이 숫자이고 양수인 경우에만 상태를 업데이트합니다.
    if (!isNaN(numberValue) && numberValue >= 0) {
      setterFunction(value); // 상태 업데이트 함수를 호출합니다.
    }
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
            <button className="PMOPtion-modifytxt" onClick={saveLog}>
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