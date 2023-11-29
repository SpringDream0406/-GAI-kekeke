// 임시입니다

import React, { useState } from 'react';

function Flasktest() {
  const [response, setResponse] = useState('');

  const handleSubmit = async (imageData) => {
    try {
      const res = await fetch('http://localhost:5555/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });
      const data = await res.json();
      setResponse(data.prediction);
    } catch (error) {
      console.error("Error during API call", error);
    }
  };

  // ... 이미지를 업로드하고 처리하는 로직 등이 포함될 수 있습니다.

  return (
    <div>
      {/* ... UI 요소와 이벤트 핸들러 */}
      <p>Response from Flask: {response}</p>
    </div>
  );
}

export default Flasktest;
