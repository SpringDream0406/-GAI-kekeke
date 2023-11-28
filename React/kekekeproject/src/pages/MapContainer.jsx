import React, { useEffect, useState } from 'react';

const MapContainer = ({ address }) => {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    // API 키를 여기에 입력
    setApiKey('AIzaSyAKfc1xqDgMQ6e2u494fKUv905QDNWoKO8');

    // 주소를 이용하여 위도와 경도를 가져오는 함수
    const getLatLongFromAddress = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.results.length > 0) {
          const lat = data.results[0].geometry.location.lat; // 위도
          const lng = data.results[0].geometry.location.lng; // 경도
          setCoords({ lat, lng });
        } else {
          console.error('주소를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('오류:', error);
      }
    };

    getLatLongFromAddress();
  }, [address]);

  useEffect(() => {
    if (coords.lat !== 0 && coords.lng !== 0) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=ko`;
      document.head.appendChild(script);

      script.onload = () => {
        const mapOptions = {
          center: { lat: coords.lat, lng: coords.lng },
          zoom: 15 // 지도 확대 레벨
        };

        const map = new window.google.maps.Map(
          document.getElementById('map'),
          mapOptions
        );

        // 마커를 생성하고 지도에 표시합니다
        const marker = new window.google.maps.Marker({
          position: { lat: coords.lat, lng: coords.lng },
          map: map,
          title: address // 마커에 표시할 제목
        });
      };

      // 컴포넌트 언마운트 시 스크립트 제거
      return () => {
        script.remove();
      };
    }
  }, [coords]);

  return <div id="map" style={{ width: '100%', height: '300px' }}></div>;
};

export default MapContainer;
