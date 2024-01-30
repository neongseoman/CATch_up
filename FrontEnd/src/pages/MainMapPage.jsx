/*global kakao */ 
import React, { useRef, useEffect } from 'react';
import styled from "@emotion/styled";

const MainMapPage = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    // 카카오맵 API 초기화
    const options = {
      center: new kakao.maps.LatLng(37.55705, 126.9259),
      level: 5
    };

    const map = new kakao.maps.Map(mapContainer.current, options);

    // 추가적인 맵 설정을 여기에 작성합니다.
  }, []);

  return (
    <FullPageMap ref={mapContainer}></FullPageMap>
  );
};

const FullPageMap = styled.div`
  width: 100vw;  // 전체 뷰포트 너비
  height: 100vh; // 전체 뷰포트 높이
  position: fixed; // 페이지에 고정
  top: 0;
  left: 0;
  z-index: -1; // 네비게이션 바 뒤에 위치
`;

export default MainMapPage;
