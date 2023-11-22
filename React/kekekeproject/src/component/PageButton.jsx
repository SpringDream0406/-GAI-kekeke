import React from 'react';
import '../ad_css/AdPagebutton.css';

const MAX_PAGE_NUMBERS = 5;

const PageButton = ({ pages, currentPage, onPageChange,  marginTop }) => {
  // 인라인 스타일 객체를 만듭니다.
  const containerStyle = {
    marginTop :  marginTop, // 전달받은 height 값을 사용합니다.
   
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / MAX_PAGE_NUMBERS) * MAX_PAGE_NUMBERS;
    return new Array(MAX_PAGE_NUMBERS).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div className="pagination-container" style={containerStyle}>
   
       <button
       onClick={() => {
         if (currentPage > 1) onPageChange(currentPage - 1);
       }}
       className={`page-item control ${currentPage === 1 ? 'disabled' : ''}`}
       disabled={currentPage === 1}
     >
       &#9664; {/* 이전 페이지 삼각형 */}
     </button>

     

      {getPaginationGroup().map((page, index) => (
        page <= pages && (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        )
      ))}

    
        <button onClick={() => onPageChange(currentPage + 1)} className="page-item control">
        &#9654; {/* 다음 페이지 삼각형 */}
      </button>
      
    </div>
  );
};

export default PageButton;
