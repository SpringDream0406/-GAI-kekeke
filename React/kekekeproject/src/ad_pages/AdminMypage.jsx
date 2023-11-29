import React, { useState ,useEffect } from 'react';
import '../ad_css/AdminMypage.css';
import { AiOutlineCamera } from 'react-icons/ai';
import AdMenubar from '../component/AdMenubar';
import AdHeader from '../component/AdHeader'



const AdminMypage = () => {

  // ***** 사용자 정보 데이터 (임시)

  const [nickname, setNickname] = useState(''); // 임의의 초기 닉네임
  const [password, setPassword] = useState(''); // 임의의 초기 비밀번호
  const [phone, setPhone] = useState(''); // 임의의 초기 전화번호
  const [sellerImg , setSellerImg] = useState(null)

  const [sellerinfo, setSellerInfo] = useState();

    // 세션 스토리지에서 데이터 불러오기
useEffect(() => {
  const adminStorageData = sessionStorage.getItem('adminData');
  if (adminStorageData) {
    const adminData = JSON.parse(adminStorageData);
    setSellerInfo(adminData);
    setNickname(adminData.user_name)
    setPhone(adminData.phone)
    setSellerImg(adminData.seller_profile1)
  }
}, []);

  // 비밀번호 확인 상태 추가
  const [confirmPassword, setConfirmPassword] = useState('');

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  // 비밀번호 확인 변경 핸들러
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // 전화번호 변경 핸들러
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  

  // 수정 사항 저장 핸들러
  const handleSaveChanges = () => {
    // 모든 입력란이 채워져 있는지 확인
    if (!nickname.trim() || !password.trim() || !phone.trim()) {
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
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }


    // 여기에서 수정 사항을 처리합니다. 예를 들어, API 호출을 통해 백엔드에 업데이트를 요청할 수 있습니다.
    console.log('닉네임:', nickname);
    console.log('비밀번호:', password);
    console.log('전화번호:', phone);
    alert('수정이 완료되었습니다.');
    // API 호출이나 다른 로직을 추가하세요.





    window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동



  };

  // -------------------------------------------------------------


  // ****** 중복 확인

  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);

  // 임시 중복 확인 데이터
  const existingNicknames = ['케로로빵', 'kekeke', '케케케',
    '송민아줌마', '미나곤듀언니티비', '김은호나마에와', '기므노', '김용민달팽이',
    '정건식사료', '정건식사하셨나요', '서유정말예쁘다', '용용이보고싶어요'];

      // 중복 확인이 완료되었는지 여부를 저장하는 상태
  const [isDuplicateCheckDone, setIsDuplicateCheckDone] = useState(false);

  // 닉네임 변경 핸들러
  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  // 중복 확인 버튼을 눌렀을 때 호출되는 함수
  const handleDuplicateCheckClick = () => {
    const isAvailable = !existingNicknames.includes(nickname);
    setIsNicknameAvailable(isAvailable);
    setIsDuplicateCheckDone(true); // 중복 확인이 시도되었다는 것을 표시합니다.
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






  return (

    <div>
      <AdHeader />
    <AdMenubar/>
    
    <div className='adminmp-Container'>
      
    <div className="adminmp_frame">
     
        <div className="adminmp-overlap">
          <div className="adminmp-input-area">
            {/* 이미지 업로드 섹션 */}
            <div className="adminmp-photo">
              {image ? (
                <img src={image} alt="사용자 정보 수정" className="adminmp-uploaded-image" />
              ) : (
                <label htmlFor="image-upload" className="adminmp-upload-label">
                  <AiOutlineCamera className="adminmp-camera-icon" />
                  <span>이미지 업로드</span>
                </label>
              )}
              <input
                type="file"
                id="image-upload"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
            <div className="adminmp-overlap-group"></div>
            {/* 닉네임 변경 */}
            <div className="adminmp-nick-input">
              <div className="adminmp-nick-input-box">
                <input
                  className="adminmp-nick-input-text"
                  type='text'
                  placeholder='닉네임을 입력하세요'
                  value={nickname}
                  onChange={handleNicknameChange}
                />
              </div>
              <div className="adminmp-nicktxt">
                <div className="adminmp-div">닉네임 변경</div>
              </div>
              <div className="adminmp-duplicate-btn">
                <button className="adminmp-duplicatetxt" onClick={handleDuplicateCheckClick}>
                  <div className="adminmp-text-wrapper-3">중복확인</div>
                </button>
              </div>
              {isDuplicateCheckDone && !isNicknameAvailable && (
          <div className="adminmp-nickname-unavailable">이미 사용 중인 닉네임입니다.</div>
        )}
        {isDuplicateCheckDone && isNicknameAvailable && (
          <div className="adminmp-nickname-available">사용 가능한 아이디입니다.</div>
        )}
            </div>
            {/* 비밀번호 변경 */}
            <div className="adminmp-pw-input">
              <div className="adminmp-pwtxt">
                <div className="adminmp-text-wrapper-2">비밀번호 변경</div>
              </div>
              <div className="adminmp-pw-input-box">
                <input
                  className="adminmp-pw-input-text"
                  type="password"
                  placeholder="새로운 비밀번호 입력"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="adminmp-pw-check-input">
              <div className="adminmp-pwchecktxt">
                <div className="adminmp-div">비밀번호 확인</div>
              </div>
              <div className="adminmp-pw-check-box">
                <input
                  className="adminmp-pw-check-text"
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            </div>
            {/* 전화번호 변경 */}
            <div className="adminmp-phone-input">
              <div className="adminmp-phonetxt">
                <div className="adminmp-div">전화번호</div>
              </div>
              <div className="adminmp-phone-input-box">
                <input
                  className="adminmp-phone-input-text"
                  type="tel"
                  placeholder="전화번호 입력"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>
          </div>
          {/* 수정하기 버튼 */}
          <div className="adminmp-modify-btn">
            <button className="adminmp-modifytxt" onClick={handleSaveChanges}>
              수정하기
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminMypage;
