import React from 'react'
import GlobalStyle from '../component/GlobalStyle'
import '../css/Login.css'
import {useState,useContext} from 'react';
// import axios from 'axios';


// const AuthContext = React.createContext(null);

// export const useAuth = () => {
//   return useContext(AuthContext);
// };




const Login = () => {

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  // const { setAuthData } = useAuth();

  // const handleLogin = async () => {
  //   try {
  //     // 여기에 백엔드 인증 API 엔드포인트를 넣으세요
  //     const endpoint = 'http://your-api-endpoint.com/auth/login';
  //     const data = { username, password };
  //     const response = await axios.post(endpoint, data);
  //     // 성공적으로 로그인 되었을 때 처리
  //     setAuthData(response.data); // 인증 데이터를 컨텍스트에 저장
  //     // 추가적으로 로그인 후 페이지 이동을 처리할 수 있습니다.
  //   } catch (err) {
  //     // 로그인 실패시 에러 처리
  //     setError(err.response ? err.response.data.message : err.message);
  //   }
  // };



  return (
    
   <div className='index'>
    <GlobalStyle/>
    <div className="index">
      <div className="div-7">
      
        <div className="login-area">
          <div className="login-text">
            <div className="text-wrapper-3">로그인</div>
          </div>
          <div className="login-input-area">
            <div className="login-id-input">
              <div className="div-wrapper-2">
                <input className="text-wrapper-4"
                type='text'
                placeholder='아이디를 입력하세요'
                // value={username}
                // onChange={(e)=>setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="login-pw-input">
              <div className="div-wrapper-3">
                <input className="text-wrapper-4"
                type='password'
                placeholder='비밀번호를 입력하세요'
                // value={password}
                // onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="login-button">
            <div className="div-wrapper-4">
              <button className="text-wrapper-5" 
              // onClick={handleLogin}
              >로그인하기</button>
            </div>
          </div>
          <div className="loginto-join">
            <div className="div-wrapper-5">
              <div className="text-wrapper-6">회원이 아니라면?</div>
            </div>
            <div className="div-wrapper-6">
              <div className="text-wrapper-7">회원가입</div>
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