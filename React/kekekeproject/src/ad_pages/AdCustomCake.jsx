import React,{useState} from 'react'
import Ad_BG from '../ad_component/Ad_BG'
import Ad_Menubar from '../component/Ad_Menubar'
import AdMT from '../ad_component/AdMT'
import '../ad_css/AdCustomCake.css'
import { Link } from 'react-router-dom'
import PageButton from '../component/PageButton'

const AdCustomCake = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // 페이지 변경에 대한 추가 로직
  };

  return (
    <div>
        <Ad_Menubar/>
        <AdMT>커스텀케이크</AdMT>
        <Ad_BG height={1280}>

        <PageButton 
  pages={totalPages} 
  currentPage={currentPage} 
  onPageChange={handlePageChange} // 이 부분을 자체 닫는 태그 안에 포함시켜야 합니다.
/>
          <div className='adcc-btn-all'>
              <button className='adcc-btn-1'>제안대기</button>
              <button  className='adcc-btn-2'>제안완료</button>
          </div>
          



          <div className='adcc-list-container'>
          <Link to='/admin/customcake/detail' className='adcc-link'>
            <div className='adcc-c-list'>
         
                <img className='adcc-cimg' src={'/assets/images/cake2.png'} alt='케이크1'/>
                <div className='adcc-cday'>2023.04.05</div>
                <div className='adcc-ctime'>14:00 픽업</div>
                
            </div>
            </Link>
            <div className='adcc-c-list'>
              <Link to='/admin/customcake/detail' className='adcc-link'>
                <img className='adcc-cimg' src={'/assets/images/cake2.png'} alt='케이크1'/>
                <div className='adcc-cday'>2023.04.05</div>
                <div className='adcc-ctime'>14:00 픽업</div>
                </Link>
            </div>
            <div className='adcc-c-list'>
              <Link to='/admin/customcake/detail' className='adcc-link'>
                <img className='adcc-cimg' src={'/assets/images/cake2.png'} alt='케이크1'/>
                <div className='adcc-cday'>2023.04.05</div>
                <div className='adcc-ctime'>14:00 픽업</div>
                </Link>
            </div>
            <div className='adcc-c-list'>
              <Link to='/admin/customcake/detail' className='adcc-link'> 
                <img className='adcc-cimg' src={'/assets/images/cake2.png'} alt='케이크1'/>
                <div className='adcc-cday'>2023.04.05</div>
                <div className='adcc-ctime'>14:00 픽업</div>
                </Link>
            </div>
            <div className='adcc-c-list'>
              <Link to='/admin/customcake/detail' className='adcc-link'>
                <img className='adcc-cimg' src={'/assets/images/cake2.png'} alt='케이크1'/>
                <div className='adcc-cday'>2023.04.05</div>
                <div className='adcc-ctime'>14:00 픽업</div>
                </Link>
            </div>
            <div className='adcc-c-list'>
              <Link to='/admin/customcake/detail' className='adcc-link'>
                <img className='adcc-cimg' src={'/assets/images/cake2.png'} alt='케이크1'/>
                <div className='adcc-cday'>2023.04.05</div>
                <div className='adcc-ctime'>14:00 픽업</div>
                </Link>
            </div>
            
            </div>
           
        </Ad_BG>
    </div>
  )
}

export default AdCustomCake