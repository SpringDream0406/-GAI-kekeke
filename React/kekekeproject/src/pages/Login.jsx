import React from 'react'
import GlobalStyle from '../component/GlobalStyle'
import '../css/Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api_url';
import Swal from 'sweetalert2'


const AuthContext = React.createContext(null);

// export const useAuth = () => {
//   return useContext(AuthContext);
// };



const Login = () => {

  const navigate = useNavigate();

  const [cust_id, setCust_id] = useState('');

  const [cust_pw, setCust_pw] = useState('');


  const handleLogin = () => {
    const url = `${API_URL}/cust/login`;
    const data = { cust_id: cust_id, cust_pw: cust_pw };
  
    axios
      .post(url, data)
      .then((response) => {
        // 로그인 성공 시 SweetAlert2 모달 표시
        Swal.fire({
          title: '로그인 성공!',
          text: '케케케에 오신걸 환영합니다~',
          imageUrl:
            'https://cdn.class101.net/images/bf8761da-e161-488a-b0d1-1ff91a123c26',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          showConfirmButton: true, // 확인 버튼 표시
          timer: 2000, // 모달이 자동으로 닫히는 시간 (예: 2초)
          customClass: {
            confirmButton: 'custom-swal-button', // 사용자 지정 CSS 클래스 적용
          },
        }).then(() => {
          // 일정 시간(2초)이 지난 후에 페이지를 리다이렉트
          window.location.href = '/';
        });
  
        // 성공적으로 로그인되었을 때 처리
        sessionStorage.setItem('userData', JSON.stringify(response.data));
        console.log('Saved in Session Storage:', sessionStorage.getItem('userData'));
  
        const userStorageData = sessionStorage.getItem('userData');
        if (userStorageData) {
          const userData = JSON.parse(userStorageData);
          console.log('Message from Session Storage:', userData.message);
        }
      })
      .catch((error) => {
        console.error('에러', error, error.response.data);
        Swal.fire({
          icon: 'error',
          title: '어라?',
          text: error.response.data.message,
          customClass: {
            confirmButton: 'custom-swal-button',
          },
        });
      });
  };
  
  
  const handleJoinClick = () => {
    navigate('/join');
  };



  return (

  <div className='login-container'>
  
    
            <GlobalStyle />
        <div className="div-7">

          <div className="login-area">
            <div className="login-text-area">
              <div className="login-text">로그인</div>
            </div>
            <div className="login-input-area">
              <div className="login-id-input">
                <div className="login-id-input-area">
                  <input className="login-content"
                    type='text'
                    placeholder='아이디를 입력하세요'
                    value={cust_id}
                    onChange={(e) => setCust_id(e.target.value)}
                  />
                </div>
              </div>
              <div className="login-pw-input">
                <div className="login-pw-input-area">
                  <input className="login-content"
                    type='password'
                    placeholder='비밀번호를 입력하세요'
                    value={cust_pw}
                    onChange={(e) => setCust_pw(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="login-button-area">
              <div className="login-button">
                <button className="login-button-text"
                  onClick={handleLogin}
                >로그인하기</button>
              </div>
            </div>
            <div className="login-if">
              <div className="login-if-no-member">
                <div className="login-if-no-member-text">회원이 아니라면?</div>
              </div>
              <div className="login-to-join">
                <div className="login-to-join-text"  onClick={handleJoinClick}>회원가입</div>
              </div>
            </div>
          </div>
    
        </div>
       
      </div>
    
  )
}

export default Login