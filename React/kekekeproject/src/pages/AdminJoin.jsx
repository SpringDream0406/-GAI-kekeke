import React from "react";
// import { DivWrapper } from "../../components/DivWrapper";
import "../css/AdminJoin.css";
import { useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios';
import API_URL from '../api_url';
import { event } from "jquery";
// import { ADDRCONFIG } from "dns";
// import { NONAME } from "dns";


export const AdminJoin = () => {

    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setImage(reader.result);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };



    const [seller_id, setSeller_id] = useState('');
    const [seller_PW, setSeller_PW] = useState('');
    const [seller_PW_Check, setSeller_PW_Check] = useState('');
    const [store_name, setStore_name] = useState('');
    const [store_detail, setStore_detail] = useState('');
    const [shop_tel, setShop_tel] = useState('');
    const [add_detail, setAdd_detail] = useState('');
    const [strg_use, setStrg_use] = useState('');
    const [business_num, setBusiness_num] = useState('');

    const [user_name, setUser_name] = useState('');


    const [phone, setphone] = useState('');


    const [start_time, setStart_time] = useState('');
    const [end_time, setEnd_time] = useState('');





    const handleJoin = () => {
      const url = `${API_URL}/seller/join`;
  
      const data = { seller_id: seller_id, seller_pw: seller_PW,
                     seller_pwcheck: seller_PW_Check, store_name: store_name,
                     store_detail: store_detail, shop_tel: shop_tel,
                     add_detail: add_detail, strg_use: strg_use,
                     business_num: business_num, phone: phone,
                     start_time: start_time, end_time: end_time};
  
     
      axios.post(url, data)
        .then(response => { // status(200) 인 경우
            console.log(response.data);
            alert(response.data.message);
            
            // 성공적으로 로그인되었을 때 처리
            // setAuthData(response.data); // 인증 데이터를 컨텍스트에 저장
            // 추가적으로 로그인 후 페이지 이동을 처리할 수 있습니다.
        })
        .catch(error => { // status(200)이 아닌 경우 ex status(500)
          console.error('에러', error, error.response.data);
          if (error.response.data.message == '비밀번호 길이 벗어남') {
            alert('비밀번호 길이 벗어남')
          }
          else if (error.response.data.message == '비밀번호 불일치'){
            alert('비밀번호 불일치')
          }
        });
      }



      const handlecheckid = () => {
        const url = `${API_URL}/seller/check`;
        const data = {seller_id : seller_id }
  
        axios.post(url,data)
          .then(response=>{
            console.log(response.data);
            alert(response.data.message)
          })
          .catch(error => {
            console.log(error);
          })
      }







  return (
    <div className="admin-join">
      <div className="div-4">
        <div className="bluebox">
          <div className="admin-info-join">
            <div className="text-wrapper-2">회원가입</div>
          </div>
          <div className="admin-info">
            <div className="admin-info-name">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">사용자 이름</div>
              </div>
              <div className="admin-info-name-2">
                <input className="text-wrapper-4"
                        type="text"
                        placeholder="사용자 이름 입력"
                        value={user_name}
                        onChange={(event)=>setUser_name(event.target.value)}
                />
              </div>
            </div>
            <div className="admin-info-id">
              <div className="admin-info-id-input">
                <input className="text-wrapper-4"
                    type="text"
                    placeholder="아이디 입력"
                    value={seller_id}
                    onChange={(event)=>setSeller_id(event.target.value)} />
              </div>
              <div className="admin-info-id-check">
                <div className="overlap-group">
                  <div className="rectangle-wrapper">
                    <div className="rectangle" />
                  </div>
                  <div className="admin-info-id-check-2">
                    <div className="text-wrapper-5" onClick={handlecheckid} >중복 확인</div>
                  </div>
                </div>
              </div>
              
              <div className="admin-info-id-text">
                <div className="text-wrapper-3">아이디</div>
              </div>
              <div className="element-wrapper">
                <div className="text-wrapper-6">아이디 길이 제한&nbsp;&nbsp;: 6~20자</div>
              </div>
            </div>
            <div className="admin-info-password">
              <div className="admin-info-password-2">
                <div className="text-wrapper-3">비밀번호</div>
              </div>
              <div className="admin-info-password-3">
                <input className="text-wrapper-4"
                type="password"
                placeholder="비밀번호 입력"
                value={seller_PW}
                onChange={(event)=>setSeller_PW(event.target.value)} />
              </div>
              <div className="admin-info-password-4">
                <div className="text-wrapper-6">문자, 특수문자 포함 8~20자</div>
              </div>
            </div>
            <div className="admin-info-password-5">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">비밀번호 확인</div>
              </div>
              <div className="admin-info-password-6">
                <input className="text-wrapper-4"
                type="password"
                placeholder="비밀번호 재입력"
                value={seller_PW_Check}
                onChange={(event)=>setSeller_PW_Check(event.target.value)}
                />
              </div>
            </div>
            <div className="admin-info-number">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">전화번호</div>
              </div>
              <div className="div-wrapper-3">
                <input className="text-wrapper-4"
                type="tel"
                placeholder="전화번호 입력"
                value={phone}
                onChange={(event)=>setphone(event.target.value)} />
              </div>
            </div>
          </div>
          <div className="horizen">
            <img className="line" alt="Line" src="https://c.animaapp.com/BePgla5e/img/line-45.svg" />
          </div>
          <div className="store-input-area">
            <div className="store-name">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">가게 이름</div>
              </div>
              <div className="div-wrapper-3">
                <input className="text-wrapper-4"
                type="text"
                placeholder="가게 이름 입력"
                value={store_name}
                onChange={(event)=>setStore_name(event.target.value)} />
              </div>
            </div>
            <div className="store-number">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">가게 번호</div>
              </div>
              <div className="div-wrapper-3">
                <input className="text-wrapper-4"
                type="text"
                placeholder="가게 번호 입력"
                value={shop_tel}
                onChange={(event)=>setShop_tel(event.target.value)} />

              </div>
            </div>
            <div className="admin-number">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">사업자등록번호</div>
              </div>
              <div className="admin-number-input">
                <input className="text-wrapper-4"
                type="text"
                placeholder="사업자등록번호 입력"
                value={business_num}
                onChange={(event)=>setBusiness_num(event.target.value)} />

              </div>
            </div>
            <div className="store-address">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">가게 주소</div>
              </div>
              <div className="store-address-input">
                <div className="store-address-city">
                  <div className="text-wrapper-4">구 선택</div>
                </div>
                <div className="store-address-input-2">
                  <div className="text-wrapper-4">주소 찾기</div>
                </div>
              </div>
            </div>
            <div className="store-explain">
              <div className="overlap-group-2">
                <div className="div-wrapper-2">
                  <div className="text-wrapper-3">가게 설명</div>
                </div>
                <div className="store-explain-rule">
                  <div className="text-wrapper-7">100자 이내로 작성</div>
                </div>
              </div>
              <div className="store-explain-input">
                <div >
                    <textarea className="ad-text-wrapper-4"
                    type="text"
                    placeholder="가게 설명 입력"
                    value={store_detail}
                    onChange={(event)=>setStore_detail(event.target.value)}
                    />
                </div>
              </div>
            </div>
            <div className="caution">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">예약 주의사항</div>
              </div>
              <div className="store-explain-input">
                <textarea className="ad-text-wrapper-50"
                    type="text"
                    placeholder="예약 주의사항 입력"
                    value={add_detail}
                    onChange={(event)=>setAdd_detail(event.target.value)}

                />
              </div>
            </div>
            <div className="keep-method">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">보관 및 이용방법</div>
              </div>
              <div className="store-explain-input">
                <textarea className="ad-text-wrapper-60"
                    type="text"
                    placeholder="보관 및 이용방법 입력"
                    value={strg_use}
                    onChange={(event)=>setStrg_use(event.target.value)}

                    />
              </div>
            </div>
            <div className="business-hours">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">영업 시간</div>
              </div>
              <div className="business-hours-input">
                <div className="open-time">
                  <input 
                    className="text-wrapper-4"
                    type="time"
                    value={start_time}
                    onChange={(event)=>setStart_time(event.target.value)}
                  />
                </div>
                <div className="close-time">
                  <input
                    className="text-wrapper-4"
                    type="time"
                    value={end_time}
                    onChange={(event)=>setEnd_time(event.target.value)}
                  />
                </div>
                <div className="business-hours-bar">
                  <div className="text-wrapper-8">~</div>
                </div>
              </div>
            </div>
            <div className="store-profile">
              <div className="store-profile-text">
                <div className="text-wrapper-3">가게 프로필</div>
              </div>
              <div className="store-profile-2">
              {image ? (
          <img src={image} alt="가게 프로필" className="uploaded-image" />
        ) : (
          <label htmlFor="image-upload" className="upload-label">
            <AiOutlineCamera className="camera-icon" />
            <span>이미지 업로드</span>
          </label>
        )}
        <input
          type="file"
          id="image-upload"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
              </div>
            </div>
          </div>
         
          <div className="join-button">
            <div className="qq" onClick={handleJoin}>가입하기</div>
            
            
              
          </div>
          
        </div>
        {/* <DivWrapper className="admin-header" /> */}
      </div>
    </div>
  );
};
