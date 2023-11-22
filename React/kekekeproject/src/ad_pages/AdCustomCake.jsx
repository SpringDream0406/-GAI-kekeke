import React, { useState, useEffect } from 'react';
import AdBG from '../ad_component/AdBG';
import AdMenubar from '../component/AdMenubar';
import AdMT from '../ad_component/AdMT';
import '../ad_css/AdCustomCake.css';
import { Link } from 'react-router-dom';
import PageButton from '../component/PageButton';
import AdHeader from '../component/AdHeader';



const createDummyData = (numItems) => {
  return Array.from({ length: numItems }, (_, i) => ({
    id: i + 1,
    imgSrc: `/assets/images/cake2.png`, // 예시로 2개의 이미지를 번갈아 사용
    date: `2023.04.${String(i % 30).padStart(2, '0')}`, // 날짜는 1~30일을 반복
    time: `${String((i % 12) + 1).padStart(2, '0')}:00 픽업` // 시간은 1시~12시를 반복
  }));
};



const AdCustomCake = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageContent, setPageContent] = useState([]);
  const totalItems = 40; // 가정: 총 40개의 항목이 있다.
  const itemsPerPage = 6; // 한 페이지에 6개의 항목을 표시
  const [totalPages] = useState(Math.ceil(totalItems / itemsPerPage));

  // 페이지에 맞는 콘텐츠를 가져오는 함수
  const fetchPageContent = async (pageNumber) => {
    const allData = createDummyData(totalItems); // 총 40개의 데이터 항목을 생성합니다.
    // 페이지 번호에 맞는 콘텐츠를 계산합니다.
    const newContent = allData.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
    setPageContent(newContent);
  };

  useEffect(() => {
    fetchPageContent(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
       <PageButton pages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} marginTop={'1500px'}/>
      <AdHeader></AdHeader>
      <AdMenubar/>
      <AdMT>커스텀케이크</AdMT>
      <AdBG height={1350}>
        
        <div className='adcc-btn-all'>
          <button className='adcc-btn-1'>제안대기</button>
          <button className='adcc-btn-2'>제안완료</button>
        </div>
        
        <div className='adcc-list-container'>
          {pageContent.map((item, index) => (
            <Link to='/admin/customcake/detail' className='adcc-link' key={index}>
              <div className='adcc-c-list'>
                <img className='adcc-cimg' src={item.imgSrc} alt={`케이크 ${index}`}/>
                <div className='adcc-cday'>{item.date}</div>
                <div className='adcc-ctime'>{item.time}</div>
              </div>
              
            </Link>
            
          ))}
 
        </div>
      </AdBG>
    </div>
  );
}

export default AdCustomCake;
