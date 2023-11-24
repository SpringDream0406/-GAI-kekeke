import React, { useState, useEffect } from 'react'
import AdMenubar from '../component/AdMenubar';
import AdMT from '../ad_component/AdMT';
import AdBG from '../ad_component/AdBG';
import "../ad_css/AdminStoreInfo.css";
import { AiOutlineCamera } from 'react-icons/ai';





const AdminStoreInfo = () => {

  const [sellerinfo, setSellerInfo] = useState({});

      // 세션 스토리지에서 데이터 불러오기 및 초기 데이터 작성
      useEffect(() => {
        const adminStorageData = sessionStorage.getItem('adminData');
        if (adminStorageData) {
          const adminData = JSON.parse(adminStorageData);
          setSellerInfo(adminData);
          setStore_name(adminData.store_name)
          setStore_detail(adminData.store_detail)
          setShop_tel(adminData.shop_tel)
          setAdd_detail(adminData.add_detail)
          setStrg_use(adminData.strg_use)
          setBusiness_num(adminData.business_num)
          setAddress_detail(adminData.shop_addr2)
          setStart_time(adminData.start_time)
          setEnd_time(adminData.end_time)
          setAddress(adminData.shop_addr1)
          setImg(adminData.seller_profile1)
        }
      }, []);

    const [store_name, setStore_name] = useState();
    const [store_detail, setStore_detail] = useState();
    const [shop_tel, setShop_tel] = useState();
    const [add_detail, setAdd_detail] = useState();
    const [strg_use, setStrg_use] = useState();
    const [business_num, setBusiness_num] = useState();
    const [address_detail, setAddress_detail] = useState();
    const [start_time, setStart_time] = useState();
    const [end_time, setEnd_time] = useState();
    const [address, setAddress] = useState();
    const [img, setImg] = useState()


    
  console.log('셀러정보' ,sellerinfo.store_name);



    const handleSaveChanges = () => {
      // 모든 입력란이 채워져 있는지 확인
      if (!storeName.trim() || !store_detail.trim() || !add_detail.trim() || !strg_use.trim() || !address_detail.trim() || !shop_tel.trim() || !business_num.trim()) {
        // 하나라도 비어있다면 경고 메시지를 띄움
        alert('모든 필드를 채워주세요.');
        return; // 함수를 여기서 종료하여 API 호출이나 다른 로직이 실행되지 않도록 함
      }
    }


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
  };


  const [storeName] = useState('');
  // 다른 수정 필드들에 대한 상태들도 추가해주세요

  // 페이지 로딩 시 기존 정보 불러오기 (예시)
  useEffect(() => {
    // API 호출 등을 통해 기존 정보를 가져오고 상태를 업데이트할 수 있어요
    // 예를 들어, 가게 이름 정보를 가져오는 API가 있다고 가정하면:
    // fetchStoreName().then(data => setStoreName(data));
  }, []);

  
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 주소 상태를 업데이트합니다.
        setAddress(data.address);
        // 필요하다면 다른 상태도 업데이트할 수 있습니다. 예: 지번, 도로명 주소 등
      }
    }).open();
  };




  return (
    <div>
      <AdMT>가게정보</AdMT>
      <AdMenubar />
      <AdBG height={1750}>
        <div className='admin-store-container'>
          <div className='store-text1'>가게 프로필</div>
              <div className="modify-picture">
              {img ? (
          <img src={`/img/seller/${img}`} alt="가게 프로필" className="modify_picture_uploaded" />
        ) : (
          <label htmlFor="image-upload" className="upload-label2">
            <AiOutlineCamera className="camera-icon2" />
            <span className='ll'>이미지 수정</span>
          </label>
        )}
        <input
          type="file"
          id="image-upload"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
              </div>
          <div className='store-text2'>가게 이름</div>
          <input
          className='text2-content' 
          type='text'
          placeholder='가게 이름 입력'
          value={store_name}
          onChange={(e)=>setStore_name(e.target.value)}/>
          <div className='store-text3'>가게 설명</div>
          <div className='ll'>100자 이내로 작성</div>
          <textarea
          className='text3-content' 
          type='textarea'
          placeholder='가게 설명 입력'
          value={store_detail}
          onChange={(e)=>setStore_detail(e.target.value)}
          />
          <div className='store-text4'>예약 주의사항</div>
          <textarea
          className='text4-content' 
          type='textarea'
          placeholder='예약 주의사항 입력'
          value={add_detail}
          onChange={(e)=>setAdd_detail(e.target.value)}/>
          <div className='store-text5'>보관 및 이용방법</div>
          <textarea
          className='text5-content' 
          type='textarea'
          placeholder='보관 및 이용방법 입력'
          value={strg_use}
          onChange={(e)=>setStrg_use(e.target.value)}/>
          <div className='store-text6'>영업 시간</div>
          <div className='config-time'>~</div>

          <input
          className='text6-content1' 
          type='time'
          placeholder='오픈 시간'
          value={start_time}
          onChange={(e)=>setStart_time(e.target.value)}/>
          <input
          className='text6-content2' 
          type='time'
          placeholder='마감 시간'
          value={end_time}
          onChange={(e)=>setEnd_time(e.target.value)}/>
          <div className='store-text7'>가게 주소</div>
          <button className="text7_btn" onClick={handleAddressSearch}>주소 찾기</button>
          <input
                    className="text7-content2"
                    type="text"
                    placeholder="가게 주소"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} // 사용자가 직접 주소를 수정할 수 있도록 합니다.
                    readOnly // 혹은 주소 입력을 API를 통해서만 하게 하려면 readOnly 속성을 사용합니다.
                  />
          <input
          className='text7-content' 
          type='text'
          placeholder='상세 주소 입력'
          value={address_detail}
          onChange={(e)=>setAddress_detail(e.target.value)}/>
          <div className='store-text8'>가게 번호</div>
          <input
          className='text8-content' 
          type='text'
          placeholder='가게 번호 입력'
          value={shop_tel}
          onChange={(e)=>setShop_tel(e.target.value)}/>
          <div className='store-text9'>사업자등록번호</div>
          <input
          className='text9-content' 
          type='text'
          placeholder='사업자등록번호 입력'
          value={business_num}
          onChange={(e)=>setBusiness_num(e.target.value)}/>
          <button className='modify-button' onClick={handleSaveChanges}>수정</button>
        </div>   
      </AdBG>
    </div>
  
          
  )
}

export default AdminStoreInfo;