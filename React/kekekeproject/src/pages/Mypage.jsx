import React from 'react'
import '../css/Mypage.css'

const Mypage = () => {
  return (
    <div className="index">
      <div className="div">
        <img
          className="group"
          alt="Group"
          src="https://cdn.animaapp.com/projects/65487711df11ee569541a3c7/releases/654995c33aa7774e2d96771e/img/group-58.svg"
        />
        <footer className="footer">
          <div className="overlap-group">
            <div className="rectangle" />
            <div className="text-wrapper">Copyright 2023.kekeke.All rights reserved</div>
            <img
              className="kekeke"
              alt="Kekeke"
              src="https://cdn.animaapp.com/projects/65487711df11ee569541a3c7/releases/654877b599d82c8d5b729daa/img/kekeke--2--2.png"
            />
          </div>
        </footer>
        <div className="overlap">
          <div className="mypage">
            <div className="overlap-2">
              <div className="mypage-duplication">
                <div className="overlap-group-2">
                  <div className="div-2" />
                  <div className="div-wrapper">
                    <div className="text-wrapper-2">중복확인</div>
                  </div>
                </div>
              </div>
              <div className="mypage-nickname">
                <div className="div-wrapper-2">
                  <div className="text-wrapper-3">닉네임 변경</div>
                </div>
                <div className="rectangle-wrapper">
                  <div className="rectangle-2" />
                </div>
              </div>
              <div className="mypage-password">
                <div className="div-wrapper-2">
                  <div className="text-wrapper-3">비밀번호 변경</div>
                </div>
                <div className="rectangle-wrapper">
                  <div className="rectangle-3" />
                </div>
              </div>
              <div className="mypage-password-2">
                <div className="div-wrapper-2">
                  <div className="text-wrapper-3">비밀번호 확인</div>
                </div>
                <div className="rectangle-wrapper">
                  <div className="rectangle-3" />
                </div>
              </div>
              <div className="mypage-phone-number">
                <div className="div-wrapper-2">
                  <div className="text-wrapper-3">전화번호</div>
                </div>
                <div className="rectangle-wrapper">
                  <div className="rectangle-3" />
                </div>
              </div>
            </div>
            <div className="mypage-modify-button">
              <div className="overlap-3">
                <div className="div-3" />
                <div className="div-wrapper-3">
                  <div className="text-wrapper-4">수정하기</div>
                </div>
              </div>
            </div>
            <div className="mypage-picture">
              <div className="overlap-4">
                <img
                  className="mask-group"
                  alt="Mask group"
                  src="https://cdn.animaapp.com/projects/65487711df11ee569541a3c7/releases/654995c33aa7774e2d96771e/img/mask-group-4@2x.png"
                />
                <img
                  className="img"
                  alt="Mask group"
                  src="https://cdn.animaapp.com/projects/65487711df11ee569541a3c7/releases/654995c33aa7774e2d96771e/img/mask-group-5@2x.png"
                />
                <img
                  className="mask-group-2"
                  alt="Mask group"
                  src="https://cdn.animaapp.com/projects/65487711df11ee569541a3c7/releases/654995c33aa7774e2d96771e/img/mask-group-6@2x.png"
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Mypage