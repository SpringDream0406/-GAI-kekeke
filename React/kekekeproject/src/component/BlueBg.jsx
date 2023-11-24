// BlueBg 컴포넌트
import React from 'react';
import '../css/blueBox.css';

const BlueBg = ({ height, top }) => { // height와 top을 props로 받습니다.

  // 이미지 컨테이너에 적용할 인라인 스타일입니다.
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center', // 수평 중앙 정렬
    alignItems: 'center', // 수직 중앙 정렬
    zIndex: -999,
    marginTop: `${top}px`, // props로 받은 top 값을 사용합니다.
    // marginTop 대신 top을 사용하여 상단 여백을 설정합니다.
  };

  // 이미지에 적용할 인라인 스타일입니다.
  const imageStyle = {
    height: `${height}px`, // props로 받은 height 값을 사용합니다.
    // height 대신에 다른 이름의 스타일 속성을 사용할 수도 있습니다.
  };

  return (
    <div className="container" style={containerStyle}>
      <img src="/assets/images/blueBox.png" alt="bluebg" className='bluebg' style={imageStyle}/>
    </div>
  );
};

export default BlueBg;
