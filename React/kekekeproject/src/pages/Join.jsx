import React from 'react'
import { useState } from 'react';
import GlobalStyle from '../component/GlobalStyle';
import axios from 'axios';
import API_URL from '../api_url';
import { useNavigate } from 'react-router-dom';
import '../css/Join.css'
import Swal from 'sweetalert2'



const Join = () => {

  const [imageSrc, setImageSrc] = useState('');
  const [cust_id, setcust_id] = useState('');
  const [password, setPassword] = useState('');
  const [passwordcheck, setPasswordcheck] = useState('');
  const [nick_name, setUsernickname] = useState('');
  const [phone, setphone] = useState('');
  const navigate = useNavigate(); 
        
  
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


  const handleJoin = () => {
    
    const url = `${API_URL}/cust/join`;
    const formData = new FormData();

    const fileInput = document.getElementById('fileInput');
    formData.append('nick_name', nick_name);
    formData.append('cust_id', cust_id);
    formData.append('cust_pw', password);
    formData.append('phone', phone);
    formData.append('cust_pwcheck', passwordcheck);
    if (fileInput && fileInput.files[0]) {
      formData.append('profile_img', fileInput.files[0]);
    }
    
    console.log("들어와라",fileInput.files[0]);
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => { // status(200) 인 경우
          console.log(response.data);
          Swal.fire({
            title: '회원가입 성공!',
            text: '케케케에 오신걸 환영합니다~',
            imageUrl:
              'https://cdn.class101.net/images/02279595-b8f5-4753-8d57-0000d8ac64ae',
            imageWidth: 250,
            imageHeight: 300,
            imageAlt: 'Custom image',
            showConfirmButton: true, // 확인 버튼 표시
            timer: 2000, // 모달이 자동으로 닫히는 시간 (예: 2초)
            customClass: {
              confirmButton: 'custom-swal-button', // 사용자 지정 CSS 클래스 적용
            },
          }).then(() => {
            // 일정 시간(2초)이 지난 후에 페이지를 리다이렉트
            window.location.href = '/login';
          });
          // 성공적으로 로그인되었을 때 처리
          // setAuthData(response.data); // 인증 데이터를 컨텍스트에 저장
          // 추가적으로 로그인 후 페이지 이동을 처리할 수 있습니다.
      })
      .catch(error => { // status(200)이 아닌 경우 ex status(500)
        // console.error('에러', error, error.response.data);
        Swal.fire({
        
          icon: "warning",
          title: "빈칸이 존재합니다!",
          showConfirmButton: false,
          timer: 1500
        });
      });
          
  
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
    }
    


    const handlechecknick = () => {
      const url = `${API_URL}/cust/check`;
      const data = {nick_name : nick_name}

      axios.post(url,data)
        .then(response=>{
          console.log(response.data);
          Swal.fire({
            icon: "success",
            title: "사용 가능한 닉네임입니다.",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(error => {
          console.log(error);
          Swal.fire({
        
            icon: "error",
            title: "이미 존재하는 닉네임입니다.",
            showConfirmButton: false,
            timer: 1500
          });
        })
    }
    const handlecheckid = () => {
      const url = `${API_URL}/cust/check`;
      const data = {cust_id : cust_id , user_type : 0}

      axios.post(url,data)
        .then(response=>{
          console.log(response.data);
          Swal.fire({
            icon: "success",
            title: "사용 가능한 아이디입니다.",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(error => {
          console.log(error);
          Swal.fire({
        
            icon: "error",
            title: "이미 존재하는 아이디입니다.",
            showConfirmButton: false,
            timer: 1500
          });
        })
    }









  return (
    <div className='join-container'>
    <GlobalStyle />
      <div className="join_index">
        
              <div className="join_bg">
                <div className="join_overlap">
                  <div className="view">
                    <div className="join-div-1">
                      <div className="join_nick-wrapper">
                        <div className="join_title-nick">닉네임</div>
                      </div>
                      <div className="div-99">
                    
                          
                          <input className="join_nick_input"
                                    type='text'
                                    placeholder='닉네임을 입력하세요'
                                    value={nick_name}
                                    onChange={(e)=>setUsernickname (e.target.value)}
                                    />
                      
                          <div className="join_btn_wrapper">
                            
                              <div className="join_btn1" onClick={handlechecknick}>중복 확인</div>
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
                                    value={cust_id}
                                    onChange={(e)=>setcust_id(e.target.value)}
                                    />
                          </div>
                    
                            <div className="join_btn_wrapper2">
                              <div className="join_btn2" onClick={handlecheckid}>중복 확인</div>
                            
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
                                    type='password'
                                    placeholder='비밀번호를 입력하세요'
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    />
                        </div>
                      </div>
                    </div>
                    <div className="div-10">
                      <div className="join_title_2">비밀번호 확인</div>
                      <div className="div-9">
                        <div className="div-wrapper-61">
                        <input className="join_pw_input"
                                    type='password'
                                    placeholder='비밀번호를 다시 입력하세요'
                                    value={passwordcheck}
                                    onChange={(e)=>setPasswordcheck(e.target.value)}
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
                                    value={phone}
                                    onChange={(e)=>setphone(e.target.value)}
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
                          <img src={'/assets/images/camera.png'} className='upload-img' alt='uploadimg'/>
                        </label>

                        {/* Image preview */}
                        <div className="preview">
                          
                          {imageSrc && <img src={imageSrc} alt="preview-img" />}
                        </div>
                      </div>
                <div className="join_maintitle">회원가입</div>
              </div>
            </div>
            <div className="web-join-button">
              <div className="view-2">
                <div className="join_joinbtn" onClick={handleJoin}>회원가입</div>
              </div>
            </div>
          </div>
      
      
    </div>


  )
}

export default Join;