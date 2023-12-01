import React, { useState, useEffect } from 'react';
import AdBG from '../ad_component/AdBG';
import AdMenubar from '../component/AdMenubar';
import AdMT from '../ad_component/AdMT';
import '../ad_css/AdCustomCake.css';
import { Link, useNavigate } from 'react-router-dom';
import PageButton from '../component/PageButton';
import AdHeader from '../component/AdHeader';
import axios from 'axios';
import API_URL from '../api_url';


const AdCustomCake = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageContent, setPageContent] = useState([]);
  const totalItems = 40; // 가정: 총 40개의 항목이 있다.
  const itemsPerPage = 6; // 한 페이지에 6개의 항목을 표시
  
  const [customData, setCustomData] = useState(null);
  const [pendingOffers, setPendingOffers] = useState([]);
  const [completedOffers, setCompletedOffers] = useState([]);
  const [totalPages, setTotalPages] = useState(Math.ceil(pendingOffers.length / itemsPerPage));

  useEffect(() => {
    setTotalPages(Math.ceil(pendingOffers.length / itemsPerPage));
  }, [pendingOffers]);
  
  useEffect(() => {
    setTotalPages(Math.ceil(completedOffers.length / itemsPerPage));
  }, [completedOffers]);
  


  const fetchPageContent = (pageNumber) => {
    if (pendingOffers && pendingOffers.length > 0) {
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const newContent = pendingOffers.slice(startIndex, startIndex + itemsPerPage);
      setPageContent(newContent);
    }
  };
// 상세페이지로 데이터 이동을위한 navigate
const navigate = useNavigate();
const handleItemClick = (item) => {
  navigate('/admin/customcake/detail', { state: { selectedData: item } });
};

useEffect(() => {
  fetchCustomCake(); // 이 함수가 페이지 로드 시 제안대기 데이터를 가져옵니다.
  fetchPageContent(currentPage); // 초기 페이지 콘텐츠 로드
}, []);

useEffect(() => {
  fetchPageContent(currentPage);
}, [currentPage, pendingOffers]); // currentPage 또는 pendingOffers가 변경될 때 fetchPageContent를 호출


// 필터링을 위한 데이터 api 콜
const fetchCustomCake = async () => {
  try{
    // TB_CUSTOM_PRODUCT에서 데이터 가져오기
    const responseCustom = await axios.post(`${API_URL}/order/prdcustom`)
    const customProducts  = responseCustom.data;

    // TB_SELLER에서 데이터 가져오기
    const responseSeller = await axios.post(`${API_URL}/order/sellerapply`)
    const sellerApplies  = responseSeller.data;
  

    //제안대기와 제안완료 데이터를 필터링
    const pendingOffers = customProducts.filter(product =>
      !sellerApplies.some(apply => apply.CUSTOM_ID === product.CUSTOM_ID));
  
      const completedOffers = sellerApplies;
      

       // 콘솔에 데이터 출력
    console.log("제안대기 데이터:", pendingOffers);
    console.log("제안완료 데이터:", sellerApplies);

    // 상태 업데이트
    setPendingOffers(pendingOffers);
    setCompletedOffers(completedOffers );
   

  } catch(error){
    console.log("데이터오류", error);
  }
}
useEffect(() => {
  fetchCustomCake(); // 이 함수가 페이지 로드 시 제안대기 데이터를 가져옵니다.
}, []);






  //맨처음 렌더링시 불러오는데이터api
  useEffect(() => {
    const fetchCustomCake = async () => {
      try {
        // POST 요청을 보냅니다. 필요한 경우, 여기에 요청 본문을 추가하세요.
        const response = await axios.post(`${API_URL}/order/prdcustom`);
        // 예: const response = await axios.post(`${API_URL}/order/prdcustom`, { key: 'value' });

        setCustomData(response.data); // 상태 업데이트
        console.log("판매자커스텀",response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // 오류 처리 로직
      }
    };

    fetchCustomCake();
  }, []);




  // 이미지 경로를 웹 URL로 변환하는 함수
const convertImagePathToUrl = (imagePath) => {
  const pathWithoutPublic = imagePath.split('public\\').pop(); // 'public\' 부분을 제거합니다.
  return `${API_URL}/${pathWithoutPublic.replace(/\\/g, '/')}`; // 경로 구분자를 웹 표준에 맞게 변경합니다.

};

 // 날짜를 "YYYY-MM-DD" 형식으로 변환하는 함수
 const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};



// 시간을 "HH:mm" 형식으로 변환하는 함수
const formatTime = (timeString) => {
  const parts = timeString.split(' ');
  const timeParts = parts[0].split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};



useEffect(() => {
  setTotalPages(Math.ceil(pendingOffers.length / itemsPerPage));
}, [pendingOffers]);

useEffect(() => {
  setTotalPages(Math.ceil(completedOffers.length / itemsPerPage));
}, [completedOffers]);


  useEffect(() => {
    fetchPageContent(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  // 제안대기버튼 핸들러
  const handlePendingClick = () => {
    setCustomData(pendingOffers);
    setPageContent(pendingOffers.slice(0, itemsPerPage)); // 첫 페이지의 내용을 설정합니다.
  };
  
  // 제안완료버튼 핸들러
  const handleCompletedClick = () => {
    setCustomData(completedOffers);
    setPageContent(completedOffers.slice(0, itemsPerPage)); // 첫 페이지의 내용을 설정합니다.
  };

  return (
    <div>
      
       <PageButton pages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} marginTop={'1500px'}/>
      <AdHeader></AdHeader>
      <AdMenubar/>
      <AdMT>커스텀케이크</AdMT>
      <AdBG height={1350}>
        
        <div className='adcc-btn-all'>
          <button className='adcc-btn-1' onClick={handlePendingClick}>제안대기</button>
          <button className='adcc-btn-2' onClick={handleCompletedClick}>제안완료</button>
        </div>
        
        <div className='adcc-list-container'>
    
        {pageContent.map((item, index) => (
        <div className='adcc-link' key={index} onClick={() => handleItemClick(item)}>
          <div className='adcc-c-list'>
            <img className='adcc-cimg' src={convertImagePathToUrl(item.CUST_DRAW)} alt={`케이크 ${index}`} />
            <div className='adcc-cday'>{formatDate(item.PICKUP_DATE)}</div>
            <div className='adcc-ctime'>{formatTime(item.PICKUP_TIME)}</div>
          </div>
        </div>
      ))}
        </div>
      </AdBG>
    </div>
  );
}

export default AdCustomCake;
