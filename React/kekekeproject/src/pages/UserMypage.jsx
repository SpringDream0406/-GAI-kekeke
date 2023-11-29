import React, { useState ,useEffect} from 'react';
import '../css/UserMypage.css';
import GlobalStyle from '../component/GlobalStyle'
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios';
import API_URL from '../api_url';

const UserMypage = () => {


  // ***** 사용자 정보 데이터 (임시)

  const [nick_name, setNickname] = useState(''); // 임의의 초기 닉네임
  const [password, setPassword] = useState(''); // 임의의 초기 비밀번호
  const [phone, setPhone] = useState(''); // 임의의 초기 전화번호
  const [imageSrc, setImageSrc] = useState(null); //초기 프로필사진
  const [userInfo, setUserInfo] = useState({});
  const [passwordcheck, setPasswordcheck] = useState('');
  const [cust_Id, setCust_Id] = useState('');

  useEffect(() => {
    const userStorageData = sessionStorage.getItem('userData');
    if (userStorageData) {
      const userData = JSON.parse(userStorageData);
      console.log('Message from Session Storage:', userData);
      setUserInfo(userData);
      setNickname(userData.nick_name);
      setPhone(userData.phone);
      setImageSrc(userData.profile_img);
      setCust_Id(userData.cust_id)
    }
  }, []);


  // 비밀번호 변경 핸들러
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  // 비밀번호 확인 변경 핸들러
  const handleConfirmPasswordChange = (event) => {
    setPasswordcheck(event.target.value);
  };

  // 전화번호 변경 핸들러
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  // 수정 사항 저장 핸들러
  const handleSaveChanges = () => {
    // 모든 입력란이 채워져 있는지 확인
    if (!nick_name.trim() || !password.trim() || !phone.trim()) {
      // 하나라도 비어있다면 경고 메시지를 띄움
      alert('모든 필드를 채워주세요.');
      return; // 함수를 여기서 종료하여 API 호출이나 다른 로직이 실행되지 않도록 함
    }
    // 닉네임 중복 확인
    if (!isNicknameAvailable) {
      alert('이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해 주세요.');
      return;
    }
    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password !== passwordcheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 여기에서 수정 사항을 처리합니다. 예를 들어, API 호출을 통해 백엔드에 업데이트를 요청할 수 있습니다.
    console.log('닉네임:', nick_name);
    console.log('비밀번호:', password);
    console.log('전화번호:', phone);
    console.log('회원아이디',cust_Id);
    console.log('사진' , imageSrc);
    alert('수정이 완료되었습니다.');
    // API 호출이나 다른 로직을 추가하세요.
        
    const url = `${API_URL}/cust/update`;
    const updateformData = new FormData();

    updateformData.append('nick_name', nick_name);
    updateformData.append('cust_pw', password);
    updateformData.append('phone', phone);
    updateformData.append('cust_id', cust_Id);
    const fileInput = document.getElementById('image-upload');
    if (fileInput && fileInput.files[0]) {
      updateformData.append('profile_img', fileInput.files[0]);
      console.log(fileInput.files[0].name);
    }

    axios.post(url, updateformData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(response.data);
      alert('값이 잘 받아와 졌습니다')
    })
    sessionStorage.removeItem('userData');
    // 로그아웃 후 리디렉션, 필요에 따라 변경 가능
    window.location.href = '/';
  };

  // -------------------------------------------------------------


  // ****** 중복 확인

  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);

  // 중복 확인이 완료되었는지 여부를 저장하는 상태
  const [isDuplicateCheckDone, setIsDuplicateCheckDone] = useState(false);

  // 닉네임 변경 핸들러
  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };


  // -------------------------------------------------------------

  // ****** 이미지 등록 기능

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

  }    
  //닉네임 중복체크
  const handlechecknick = () => {
    const url = `${API_URL}/cust/check`;
    const data = {nick_name : nick_name}

    axios.post(url,data)
      .then(response=>{
        console.log(response.data);
        setIsDuplicateCheckDone(true)
        setIsNicknameAvailable(true)
        alert(response.data.message)
      })
      .catch(error => {
        console.log(error);
        setIsDuplicateCheckDone(true)
        if (userInfo.nick_name === nick_name){
          console.log(`${nick_name}은 현재 사용하고 있는 닉네입입니다.`);
          setIsNicknameAvailable(true)
          alert('현재 사용하는 닉네임입니다.')
        } else{
        alert(error.response.data.message)
        setIsNicknameAvailable(false)
      }
      })
  }

  // ----------------------------------------------------


  return (
    <div className="frame">
      <GlobalStyle />
      <img className='message-title' alt="Menu name bar" src='../assets/images/menu-name-bar.png' />
      <div className='message-text'>내 정보 수정</div>
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="input-area">
            {/* 이미지 업로드 섹션 */}
<div className="UserMypagePhoto">
  {image ? (
    <label htmlFor="image-upload" className="uploaded-image12-label">
      <img src={image} alt="사용자 정보 수정" className="uploaded-image12" />
    </label>
  ) : imageSrc ? (
    <label htmlFor="image-upload" className="uploaded-image12-label">
      <img src={`/img/cust/${imageSrc}`} alt="사용자 정보 수정" className="uploaded-image12" />
    </label>
  ) : (
    <label htmlFor="image-upload" className="upload-label">
      <AiOutlineCamera className="camera-icon" />
    </label>
  )}
  <input
    type="file"
    id="image-upload"
    onChange={handleImageChange}
    style={{ display: 'none' }}
  />
</div>

            <div className="overlap-group">
            </div>

            {/* 닉네임 변경 */}

            <div className="nick-input">
              <div className="nick-input-box">

                <input
                  className="nick_input_text"
                  type='text'
                  placeholder='닉네임을 입력하세요'
                  value={nick_name}
                  onChange={handleNicknameChange}
                />

              </div>
              <div className="nicktxt">
                <div className="divinput">닉네임 변경</div>
              </div>
              <div className="duplicate-btn">
                <button className="duplicatetxt" onClick={handlechecknick}>
                  <div className="text-wrapper-3">중복확인</div>
                </button>
              </div>
              {isDuplicateCheckDone && !isNicknameAvailable && (
          <div className="nickname-unavailable">이미 사용 중인 닉네임입니다.</div>
        )}
        {isDuplicateCheckDone && isNicknameAvailable && (
          <div className="nickname-available">사용 가능한 닉네임입니다.</div>
        )}
            </div>

            {/* 비밀번호 변경 */}

            <div className="pw-input">
              <div className="pwtxt">
                <div className="text-wrapper-2">비밀번호 변경</div>
              </div>
              <div className="pw-input-box">

                <input
                  className="pw-input-text"
                  type="password"
                  placeholder="새로운 비밀번호 입력"
                  value={password}
                  onChange={handlePasswordChange}
                />

              </div>
            </div>
            <div className="pw-cheak-input">
              <div className="pwcheaktxt">
                <div className="divinput">비밀번호 확인</div>
              </div>
              <div className="pw-cheak-box">
                <input
                  className="pw-cheak-text"
                  type="password"
                  placeholder="비밀번호 확인"
                  value={passwordcheck} // 상태를 value에 연결
                  onChange={handleConfirmPasswordChange} // 이벤트 핸들러를 onChange에 연결
                />
              </div>
            </div>

            {/* 전화번호 변경 */}

            <div className="phone-input">
              <div className="phonetxt">
                <div className="divinput">전화번호</div>
              </div>
              <div className="phone-input-box">
                <input
                  className="phone-input-text"
                  type="tel"
                  placeholder="전화번호 입력"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>
          </div>

          {/* 수정하기 버튼 */}
          <div className="modify-btn">
            <button className="modifytxt" onClick={handleSaveChanges}>
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMypage;
