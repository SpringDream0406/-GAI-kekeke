import React from "react";
// import { DivWrapper } from "../../components/DivWrapper";
import "../css/AdminJoin.css";
import { useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios';
import API_URL from '../api_url';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

// import { ADDRCONFIG } from "dns";
// import { NONAME } from "dns";


export const AdminJoin = () => {

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

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


  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 주소 상태를 업데이트합니다.
        setAddress(data.address);
        // 필요하다면 다른 상태도 업데이트할 수 있습니다. 예: 지번, 도로명 주소 등
      }
    }).open();
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

  const [address, setAddress] = useState('');
  const [address_detail, setAddress_detail] = useState('');
  const [start_time, setStart_time] = useState('');
  const [end_time, setEnd_time] = useState('');





  const handleJoin = () => {
    const url = `${API_URL}/seller/join`;
    const adminformData = new FormData();

    const adminfileInput = document.getElementById('image-upload');
    adminformData.append('user_name', user_name);
    adminformData.append('seller_id', seller_id);
    adminformData.append('seller_pw', seller_PW);
    adminformData.append('seller_pwcheck', seller_PW_Check);
    adminformData.append('store_name', store_name);
    adminformData.append('store_detail', store_detail);
    adminformData.append('shop_tel', shop_tel);
    adminformData.append('add_detail', add_detail);
    adminformData.append('strg_use', strg_use);
    adminformData.append('business_num', business_num);
    adminformData.append('phone', phone);
    adminformData.append('shop_addr1', address);
    adminformData.append('shop_addr2', address_detail);
    adminformData.append('start_time', start_time);
    adminformData.append('end_time', end_time);
    if (adminfileInput && adminfileInput.files[0]) {
      adminformData.append('seller_profile1', adminfileInput.files[0]);
    }

    axios.post(url, adminformData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => { // status(200) 인 경우
        console.log(response.data);
        Swal.fire({
          title: '회원가입 성공!',
          text: '케케케에 오신걸 환영합니다~',
          imageUrl:
            'https://cdn.class101.net/images/02279595-b8f5-4753-8d57-0000d8ac64ae',
          imageWidth: 250,
          imageHeight: 300,
          imageAlt: 'Custom image',
          showConfirmButton: true, // 확인 버튼 표시
          timer: 2000, // 모달이 자동으로 닫히는 시간 (예: 2초)
          customClass: {
            confirmButton: 'custom-swal-button', // 사용자 지정 CSS 클래스 적용
          },});
        navigate('/admin/login');
        // 성공적으로 로그인되었을 때 처리
        // setAuthData(response.data); // 인증 데이터를 컨텍스트에 저장
        // 추가적으로 로그인 후 페이지 이동을 처리할 수 있습니다.

      })
      .catch(error => { // status(200)이 아닌 경우 ex status(500)
        alert(error.response.data.message)
      });

    for (let [key, value] of adminformData.entries()) {
      console.log(`${key}:`, value);
    }

  }





  const handlecheckid = () => {
    const url = `${API_URL}/seller/check`;
    const data = { seller_id: seller_id }

    axios.post(url, data)
      .then(response => {
        console.log(response.data);
        alert(response.data.message)
      })
      .catch(error => {
        alert(error.response.data.message)
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
                  onChange={(event) => setUser_name(event.target.value)}
                />
              </div>
            </div>
            <div className="admin-info-id">
              <div className="admin-info-id-input">
                <input className="text-wrapper-4"
                  type="text"
                  placeholder="아이디 입력"
                  value={seller_id}
                  maxLength="20"
                  onChange={(event) => setSeller_id(event.target.value)} />
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
                  maxLength="20"
                  onChange={(event) => setSeller_PW(event.target.value)} />
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
                  onChange={(event) => setSeller_PW_Check(event.target.value)}
                />
              </div>
            </div>
            <div className="admin-info-number">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">전화번호</div>
              </div>
              <div className="admin-info-password-6">
                <input className="text-wrapper-4"
                  type="tel"
                  placeholder="전화번호 입력"
                  value={phone}
                  onChange={(event) => setphone(event.target.value)} />
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
                  onChange={(event) => setStore_name(event.target.value)} />
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
                  onChange={(event) => setShop_tel(event.target.value)} />

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
                  onChange={(event) => setBusiness_num(event.target.value)} />

              </div>
            </div>
            <div className="store-address">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">가게 주소</div>
              </div>
              <button className="address_btn" onClick={handleAddressSearch}>주소 찾기</button>
              <div className="store-address-input">
                <div className="store-address-city">
                  <input
                    className="text-wrapper-4"
                    type="text"
                    placeholder="가게 주소"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} // 사용자가 직접 주소를 수정할 수 있도록 합니다.
                    readOnly // 혹은 주소 입력을 API를 통해서만 하게 하려면 readOnly 속성을 사용합니다.
                  />

                </div>

                <div className="store-address-input-2">
                  <input
                    className="text-wrapper-4"
                    type="text"
                    placeholder="상세주소를 입력하세요"
                    value={address_detail}
                    onChange={(e) => setAddress_detail(e.target.value)}

                  />
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
                  <textarea
                    className="ad-info-input"
                    maxLength="100"
                    placeholder="가게를 소개해주세요"
                    value={store_detail}
                    onChange={(event) => setStore_detail(event.target.value)}
                    rows="2" // 원하는 줄 수를 설정할 수 있습니다.
                    cols="50" // 가로 너비를 문자 수로 설정할 수 있습니다.
                    style={{ resize: 'none' }} // 사용자가 크기를 조정하지 못하도록 설정합니다.
                  ></textarea>

                </div>
              </div>
            </div>
            <div className="caution">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">예약 주의사항</div>
              </div>
              <div className="store-explain-input">
                <textarea
                  className="ad-info-input"
                 
                  placeholder="주의사항을 입력해주세요"
                  value={add_detail}
                  onChange={(event) => setAdd_detail(event.target.value)}
                  rows="2" // 원하는 줄 수를 설정할 수 있습니다.
                  cols="50" // 가로 너비를 문자 수로 설정할 수 있습니다.
                  style={{ resize: 'none' }} // 사용자가 크기를 조정하지 못하도록 설정합니다.
                ></textarea>


              </div>
            </div>
            <div className="keep-method">

              <div className="div-wrapper-2">
                <div className="text-wrapper-3">보관 및 이용방법</div>
              </div>
              <div className="store-explain-input">
                <textarea
                  className="ad-info-input"
              
                  placeholder="보관 및 이용방법을 입력해주세요"
                  value={strg_use}
                  onChange={(event) => setStrg_use(event.target.value)}
                  rows="2" // 원하는 줄 수를 설정할 수 있습니다.
                  cols="50" // 가로 너비를 문자 수로 설정할 수 있습니다.
                  style={{ resize: 'none' }} // 사용자가 크기를 조정하지 못하도록 설정합니다.
                ></textarea>

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
                    onChange={(event) => setStart_time(event.target.value)}
                  />
                </div>
                <div className="close-time">
                  <input
                    className="text-wrapper-4"
                    type="time"
                    value={end_time}
                    onChange={(event) => setEnd_time(event.target.value)}
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
            <Link className="qq" onClick={handleJoin} to={'/admin/login'}>가입하기</Link>



          </div>

        </div>
        {/* <DivWrapper className="admin-header" /> */}
      </div>
    </div>
  );
};
