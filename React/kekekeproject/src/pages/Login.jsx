import React from 'react'
import GlobalStyle from '../component/GlobalStyle'
import '../css/Login.css'
import { useState, useContext } from 'react';

import axios from 'axios';
import API_URL from '../api_url';


const AuthContext = React.createContext(null);

// export const useAuth = () => {
//   return useContext(AuthContext);
// };



const Login = () => {
  const [cust_id, setCust_id] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const url = `${API_URL}/user/login`;
    const data = { cust_id: cust_id, password: password, user_type : 0 };

    axios.post(url, data)
      .then(response => { // status(200) 인 경우
          console.log(response.data);
          alert(response.data.message)
          // 성공적으로 로그인되었을 때 처리
          // setAuthData(response.data); // 인증 데이터를 컨텍스트에 저장
          // 추가적으로 로그인 후 페이지 이동을 처리할 수 있습니다.
      })
      .catch(error => { // status(200)이 아닌 경우 ex status(500)
        console.error('에러', error, error.response.data);
        if (error.response.data.message == '비밀번호 길이 벗어남') {
          alert('비밀번호 길이 벗어남')
        }
      });
  };



  return (

    <div className='index'>
      <GlobalStyle />
      <div className="index">
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <div className="login-to-join-text" onClick={'/join'}>회원가입</div>
              </div>
            </div>
          </div>
          {/* <DivWrapper className="component-68" /> */}
        </div>
      </div>
    </div>
  )
}

export default Login