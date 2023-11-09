import React from "react";
// import { DivWrapper } from "./DivWrapper";
import "../css/AdminLogin.css";


export const AdminLogin = () => {
  return (
    <div className="admin-login">
      <div className="div-4">
        <div className="div-5">
          <div className="admin-login-input">
            <div className="admin-pw-input">
              <input className="admin-input"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div className="admin-id-input">
              <input className="admin-input"
                    type="text"
                    placeholder="아이디를 입력하세요"/>
            </div>
          </div>
          <div className="admin-not">
            <div className="admin-not-text">회원이 아니라면?</div>
          </div>
          <div className="admin-join-text">
            <div className="admin-join">회원가입</div>
          </div>
          <div className="admin-login-text">
            <div className="admin-login-title">판매자 로그인</div>
          </div>
          <div className="admin-login-button">
            <div className="admin-login-button-2">
              <div className="admin-login-button-text">로그인하기</div>
            </div>
          </div>
        </div>
        {/* <DivWrapper className="admin-header" /> */}
      </div>
    </div>
  );
};

export default AdminLogin;