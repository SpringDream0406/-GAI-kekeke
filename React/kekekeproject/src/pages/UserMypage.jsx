import React, {useState} from 'react';
import '../css/UserMypage.css';
import GlobalStyle from '../component/GlobalStyle'

const UserMypage = () => {
  
// 이미지 등록 기능
    const [imageSrc, setImageSrc] = useState('');
        
        
          
    const encodeFileToBase64 = (fileBlob) => {
  
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onload = () => {
     setImageSrc(reader.result);
          resolve();
        };
      });
  
    };

  return (
    <div className="frame">
     <GlobalStyle/>
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="input-area">
            {/* 이미지 업로드 섹션 */}
            <div className="upload-preview-container">
              {/* 숨겨진 파일 입력 */}
              <input
                type="file"
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                }}
                id="fileInput"
                style={{ display: 'none' }}
              />

              {/* 커스텀 업로드 버튼 */}
              <label htmlFor="fileInput" className="custom-file-upload">
                <img src={'/assets/images/camera.png'} className='upload-img' alt="카메라 아이콘" />
              </label>

              {/* 이미지 미리보기 */}
              <div className="preview">
                {imageSrc && <img src={imageSrc} alt="미리보기 이미지" />}
              </div>
            </div>

            <div className="overlap-group">
            </div>
            <div className="nick-input">
              <div className="nick-input-box">
                <input
                  className="nick_input_text"
                  type='text'
                  placeholder='닉네임을 입력하세요'
                />
              </div>
              <div className="nicktxt">
                <div className="div">닉네임 변경</div>
              </div>
              <div className="duplicate-btn">
                <button className="duplicatetxt">
                  <div className="text-wrapper-3">중복확인</div>
                </button>
              </div>
            </div>
            <div className="pw-input">
              <div className="pwtxt">
                <div className="text-wrapper-2">비밀번호 변경</div>
              </div>
              <div className="pw-input-box">
                <input
                  className="pw-input-text"
                  type="password"
                  placeholder="새로운 비밀번호 입력"
                />
              </div>
            </div>
            <div className="pw-cheak-input">
              <div className="pwcheaktxt">
                <div className="div">비밀번호 확인</div>
              </div>
              <div className="pw-cheak-box">
                <input
                  className="pw-cheak-text"
                  type="password"
                  placeholder="비밀번호 확인"
                />
              </div>
            </div>
            <div className="phone-input">
              <div className="phonetxt">
                <div className="div">전화번호</div>
              </div>
              <div className="phone-input-box">
                <input
                  className="phone-input-text"
                  type="tel"
                  placeholder="전화번호 입력"
                />
              </div>
            </div>
          </div>
          <div className="modify-btn">
            <button className="modifytxt">
              <div className="text-wrapper">수정하기</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMypage;
