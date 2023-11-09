import React from "react";
// import { DivWrapper } from "../../components/DivWrapper";
import "../css/AdminJoin.css";

export const AdminJoin = () => {
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
                <div className="text-wrapper-4">사용자 이름 입력</div>
              </div>
            </div>
            <div className="admin-info-id">
              <div className="admin-info-id-input">
                <div className="text-wrapper-4">아이디 입력</div>
              </div>
              <div className="admin-info-id-check">
                <div className="overlap-group">
                  <div className="rectangle-wrapper">
                    <div className="rectangle" />
                  </div>
                  <div className="admin-info-id-check-2">
                    <div className="text-wrapper-5">중복 확인</div>
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
                <div className="text-wrapper-4">비밀번호 입력</div>
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
                <div className="text-wrapper-4">비밀번호 재입력</div>
              </div>
            </div>
            <div className="admin-info-number">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">전화번호</div>
              </div>
              <div className="div-wrapper-3">
                <div className="text-wrapper-4">전화번호 입력</div>
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
                <div className="text-wrapper-4">가게 이름 입력</div>
              </div>
            </div>
            <div className="store-number">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">가게 번호</div>
              </div>
              <div className="div-wrapper-3">
                <div className="text-wrapper-4">가게 번호 입력</div>
              </div>
            </div>
            <div className="admin-number">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">사업자등록번호</div>
              </div>
              <div className="admin-number-input">
                <div className="text-wrapper-4">사업자등록번호 입력</div>
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
                <div className="text-wrapper-4">가게 설명 입력</div>
              </div>
            </div>
            <div className="caution">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">예약 주의사항</div>
              </div>
              <div className="caution-input">
                <div className="text-wrapper-4">예약 주의사항 입력</div>
              </div>
            </div>
            <div className="keep-method">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">보관 및 이용방법</div>
              </div>
              <div className="keep-method-input">
                <div className="text-wrapper-4">보관 및 이용방법 입력</div>
              </div>
            </div>
            <div className="business-hours">
              <div className="div-wrapper-2">
                <div className="text-wrapper-3">영업 시간</div>
              </div>
              <div className="business-hours-input">
                <div className="open-time">
                  <div className="text-wrapper-4">오픈 시간</div>
                </div>
                <div className="close-time">
                  <div className="text-wrapper-4">마감 시간</div>
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
              <div className="store-profile-2" />
            </div>
          </div>
          <div className="join-button">
            <div className="join-button-text">
              <div className="text-wrapper-9">가입하기</div>
            </div>
          </div>
        </div>
        {/* <DivWrapper className="admin-header" /> */}
      </div>
    </div>
  );
};
