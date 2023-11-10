import React from 'react'
import { useState } from 'react'
import '../css/Join.css'
import GlobalStyle from '../component/GlobalStyle'


const Join = () => {

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
    <div className='join-container'>
     <GlobalStyle/>
       <div className="join_index">
        
              <div className="join_bg">
                <div className="join_overlap">
                  <div className="view">
                    <div className="join-div-1">
                      <div className="join_nick-wrapper">
                        <div className="join_title">닉네임</div>
                      </div>
                      <div className="div-9">
                    
                          
                          <input className="join_nick_input"
                                    type='text'
                                    placeholder='닉네임을 입력하세요'
                                    />
                      
                          <div className="join_btn_wrapper">
                            
                              <div className="join_btn1">중복 확인</div>
                            </div>
                          
                      </div>
                    </div>
                    <div className="div-10">
                      <div className="join_nick-wrapper">
                        <div className="join_title">아이디</div>
                      </div>
                      <div className="div-9">
                        <div className="overlap-group-3">
                          <div className="div-wrapper-31">
                             
                          <input className="join_id_input"
                                    type='text'
                                    placeholder='아이디를 입력하세요'
                                    />
                          </div>
                     
                            <div className="join_btn_wrapper2">
                              <div className="join_btn2">중복 확인</div>
                            
                          </div>
                        </div>
                        <div className="element-wrapper">
                          <div className="join_element">아이디 길이 제한&nbsp;&nbsp;: 6~20자</div>
                        </div>
                      </div>
                    </div>
                    <div className="div-11">
                      <div className="join-pw">
                        <div className="div-12">
                          <div className="join_title_2">비밀번호</div>
                          <div className="join_pw_hint">문자, 특수문자 포함 8~20자</div>
                        </div>
                      </div>
                      <div className="div-9">
                        <div className="div-wrapper-61">
                        <input className="join_pw_input"
                                    type='text'
                                    placeholder='비밀번호를 입력하세요'
                                    />
                        </div>
                      </div>
                    </div>
                    <div className="div-10">
                      <div className="join_title_2">비밀번호 확인</div>
                      <div className="div-9">
                        <div className="div-wrapper-61">
                        <input className="join_pw_input"
                                    type='text'
                                    placeholder='비밀번호를 다시 입력하세요'
                                    />
                        </div>
                      </div>
                    </div>
                    <div className="div-10">
                      <div className="join_title_2">전화번호</div>
                      <div className="div-9">
                        <div className="div-wrapper-71">
                        <input className="join_pw_input"
                                    type='text'
                                    placeholder='전화번호를 입력하세요'
                                    />
                        </div>
                      </div>
                    </div>
                  </div>
                 {/* Image upload section */}
                      <div className="join-img">
                        {/* Hidden file input */}
                        <input type="file" onChange={(e) => {
                          encodeFileToBase64(e.target.files[0]);
                        }} 
                        className='join-imgbtn' id="fileInput" style={{ display: 'none' }} />

                        {/* Custom upload button */}
                        <label htmlFor="fileInput" className="custom-file-upload">
                          <img src={'/assets/images/camera.png'} className='upload-img'/>
                        </label>

                        {/* Image preview */}
                        <div className="preview">
                          {imageSrc && <img src={imageSrc} alt="preview-img" />}
                        </div>
                      </div>
                <div className="join_maintitle">회원가입</div>
              </div>
            </div>
            <div className="join-button">
              <div className="view-2">
                <div className="join_joinbtn" onClick={()=>{'/'}}>회원가입</div>
              </div>
            </div>
          </div>
       
      
     </div>

   
  )
}

export default Join