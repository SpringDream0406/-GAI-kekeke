import React, { useState } from 'react';
import '../css/Keyword.css';

const Keyword = ({ onSelectKeyword }) => {
  const [activeKeyword, setActiveKeyword] = useState(null);

  const handleKeywordClick = (keyword) => {
    setActiveKeyword(keyword); // 현재 컴포넌트 상태 업데이트
    onSelectKeyword(keyword);   // 부모 컴포넌트에 선택된 키워드 전달
  };

  return (
    <div>
      <div className='key-mt'>AI추천</div>
      <div className='key-btn-container'>
        {['귀여운', '럭셔리', '밤하늘', '화려한', '심플한', '특이한', '인물', '유화', '취미생활', '크리스마스'].map((keyword, index) => (
          <button
            key={index}
            className={`key-btn ${activeKeyword === keyword ? 'active' : ''}`}
            onClick={() => handleKeywordClick(keyword)}
          >
            #{keyword}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Keyword;
