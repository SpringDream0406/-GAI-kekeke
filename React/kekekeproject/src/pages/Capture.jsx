import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import "../css/capture.css";

const ScreenCapture = () => {
  const captureRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null); // 이미지 데이터 URL을 저장할 상태

  const handleCaptureClick = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then(canvas => {
        const base64image = canvas.toDataURL("image/png");
        setCapturedImage(base64image); // 캡처된 이미지의 데이터 URL을 상태에 저장
      });
    }
  };

  return (
    <div className='capture'>
    
      <div ref={captureRef} style={{ margin: 'auto', width: '80%', border: '1px solid black', padding: '10px' }}>
        {/* 캡처할 내용 */}
        <h1>Hello, 민아쓰</h1>
        <h2>민아야 바로 보여줍니다잉</h2>
        <textarea></textarea>
        <p>이 부분이 이미지로 캡처됩니다.</p>
      </div>

      <button onClick={handleCaptureClick}>여기 누르세요~</button>

      {/* 캡처된 이미지를 표시 */}
      {capturedImage && (
        <div>
          <p>그대가 그린 그림이오</p>
          <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ScreenCapture;
