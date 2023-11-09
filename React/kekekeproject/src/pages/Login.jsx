import React from 'react'
import GlobalStyle from '../component/GlobalStyle'
import '../css/Login.css'
import {useState,useContext} from 'react';
import { Link } from 'react-router-dom';


import axios from 'axios';


const AuthContext = React.createContext(null);

// export const useAuth = () => {
//   return useContext(AuthContext);
// };




const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // const { setAuthData } = useAuth();

  const handleLogin = async () => {
    console.log('된다된다');
    try {
      // 여기에 백엔드 인증 API 엔드포인트를 넣으세요
      const endpoint = 'thtp://192.168.70.76:3333/login';
      const data = { user_id : username, user_pw : password };
      const response = await axios.post(endpoint, data);
      console.log(response.data);
      alert(response.data)
      // 성공적으로 로그인 되었을 때 처리
      // setAuthData(response.data); // 인증 데이터를 컨텍스트에 저장
      // 추가적으로 로그인 후 페이지 이동을 처리할 수 있습니다.
    } catch (err) {
      // 로그인 실패시 에러 처리
      setError(err.response ? err.response.data.message : err.message);
    }
  };



  return (
    
    <div className='login-container'>
    <div className="index">
    <GlobalStyle/>
     
      
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
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="login-pw-input">
              <div className="login-pw-input-area">
                <input className="login-content"
                type='password'
                placeholder='비밀번호를 입력하세요'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
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
              <Link className="login-to-join-text" src="/join">회원가입 </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
 
  )
}

export default Login