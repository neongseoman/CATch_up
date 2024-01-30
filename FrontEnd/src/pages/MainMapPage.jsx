/*global kakao */ 
import React, { useRef, useEffect, useState } from 'react';
import styled from "@emotion/styled";

const MainMapPage = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null); // 맵 객체를 상태로 관리

  useEffect(() => {
    if (map) return; // 맵이 이미 초기화되었으면 초기화하지 않음

    const options = {
      center: new kakao.maps.LatLng(37.55705, 126.9259),
      level: 5
    };

    const newMap = new kakao.maps.Map(mapContainer.current, options);
    setMap(newMap); // 상태 업데이트

  }, [map]); // 의존성 배열에 map 추가

  return (
    <FullPageMap ref={mapContainer}></FullPageMap>
  );
};

const FullPageMap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

export default MainMapPage;
