import React from "react";
// import { DivWrapper } from "./DivWrapper";
import "../css/AdminLogin.css";
import { useState } from "react";
import axios from 'axios';
import API_URL from "../api_url";
import { useNavigate } from 'react-router-dom';


export const AdminLogin = () => {


  const navigate = useNavigate();
    
  const [Seller_id, setSeller_id] = useState('');
  const [Seller_pw, setSeller_pw] = useState('');
  
  const handleLogin = () => {
    const url = `${API_URL}/seller/login`;
    const data = { Seller_id: Seller_id, Seller_pw: Seller_pw};

    axios.post(url, data)
      .then(response => { // status(200) 인 경우
          console.log(response.data.cust_id);
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

const handleAdminJoinClick = () => {
  navigate('/adminjoin');
}




  return (
    <div className="admin-login">
      <div className="div-4">
        <div className="div-5">
          <div className="admin-login-input">
            <div className="admin-pw-input">
              <input className="admin-input"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={Seller_id}
                    onChange={(event)=> setSeller_id(event.target.value)}
              />
            </div>
            <div className="admin-id-input">
              <input className="admin-input"
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={Seller_pw}
                    onChange={(event)=> setSeller_pw(event.target.value)}/>

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
            <div className="admin-login-button-2">
              <button className="admin-login-button-text"
              onClick={handleLogin}>로그인하기</button>
            </div>
          </div>
        </div>
        {/* <DivWrapper className="admin-header" /> */}
      </div>
    </div>
  );
};

export default AdminLogin;