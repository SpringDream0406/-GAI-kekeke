import React, { useState, useContext } from "react"; // useContext 추가
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from "../api_url";
import '../css/AdminLogin.css'
// StoreContext를 App.js 파일에서 정의한 위치에서 가져옵니다.
import { StoreContext } from '../App'; // '../App'은 실제 경로에 맞게 수정해야 합니다.
import Swal from 'sweetalert2'

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useContext(StoreContext); // StoreContext를 사용합니다.
  const [seller_id, setSeller_id] = useState('');
  const [seller_pw, setSeller_pw] = useState('');



  const handleLogin = () => {
    const url = `${API_URL}/seller/login`;
    const data = { seller_id: seller_id, seller_pw: seller_pw };

    axios.post(url, data)
      .then(response => { // status(200) 인 경우
        console.log(response.data.seller_id);
        // 성공적으로 로그인되었을 때 처리
        // setAuthData(response.data); // 인증 데이터를 컨텍스트에 저장
        // 추가적으로 로그인 후 페이지 이동을 처리할 수 있습니다.
        sessionStorage.setItem('adminData', JSON.stringify(response.data));
        // 세션 스토리지에서 데이터 불러오기
        const adminStorageData = sessionStorage.getItem('adminData');
        if (adminStorageData) {
          const adminData = JSON.parse(adminStorageData);
          console.log('Data from Session Storage:', adminData);
        }
        Swal.fire({
          title: '로그인 성공!',
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
          },}).then(() => {
            // 일정 시간(2초)이 지난 후에 페이지를 리다이렉트
            window.location.href = '/admin';
          })
      .catch(error => { // status(200)이 아닌 경우 ex status(500)
        console.error('에러', error, error.response.data);
        if (error.response.data.message == '비밀번호 길이 벗어남') {
          alert('비밀번호 길이 벗어남')
        }
      });
  })};

  const handleAdminJoinClick = () => {
    navigate('/admin/join');
  }



  return (
    <div className="admin-login">
      <div className="div-4">
        <div className="div-5">
          <div className="admin-login-input">
            <div className="admin-pw-input">
              <input
                className="admin-input"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={seller_pw} // 비밀번호에는 seller_pw 상태를 사용해야 합니다.
                onChange={(event) => setSeller_pw(event.target.value)} // 여기도 seller_pw를 업데이트해야 합니다.
              />
            </div>
            <div className="admin-id-input">
              <input
                className="admin-input"
                type="text"
                placeholder="아이디를 입력하세요"
                value={seller_id} // 아이디 입력에는 seller_id 상태를 사용해야 합니다.
                onChange={(event) => setSeller_id(event.target.value)} // 여기도 seller_id를 업데이트해야 합니다.
              />

            </div>
          </div>
          <div className="admin-not">
            <div className="admin-not-text">회원이 아니라면?</div>
          </div>
          <div className="admin-join-text">
            <div className="admin-join"
              onClick={handleAdminJoinClick}>회원가입</div>
          </div>
          <div className="admin-login-text">
            <div className="admin-login-title">판매자 로그인</div>
          </div>
          <div className="admin-login-button">

            <button className="admin-login-button-text"
              onClick={handleLogin}>로그인하기</button>

          </div>
        </div>
        {/* <DivWrapper className="admin-header" /> */}
      </div>
    </div>
  );
};

export default AdminLogin;