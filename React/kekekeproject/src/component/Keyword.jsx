import React, { useState } from 'react';
import '../css/Keyword.css';

const Keyword = () => {
  const [activeKeyword, setActiveKeyword] = useState(null);

  const handleKeywordClick = (keyword) => {
    setActiveKeyword(keyword);
  };

  return (
    <div>
      <div className='key-mt'>AI추천</div>
      <div className='key-btn-container'>
        {['귀여운', '럭셔리', '밤하늘', '화려한', '간단한', '특이한', '인물', '유화', '취미생활', '크리스마스'].map((keyword, index) => (
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
