import React, { useEffect } from 'react';

const MapContainer = ({ lat, lng }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=c8b4bbe1f37dca6d721970edf12ee025&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        let container = document.getElementById('map');
        let options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3
        };

        const map = new window.kakao.maps.Map(container, options);

        // 마커를 생성하고 지도에 표시합니다
        let markerPosition  = new window.kakao.maps.LatLng(lat, lng); 
        let marker = new window.kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
      });
    };

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      script.remove();
    };
  }, [lat, lng]); // lat, lng가 바뀔 때마다 이펙트를 다시 실행합니다.

  return <div id="map" style={{width: '100%', height: '300px'}}></div>;
};

export default MapContainer;