/*global kakao */ 
import { useRef, useEffect, useMemo } from 'react';

function Kakaomap() {
  const container = useRef(null);
  
  const options = useMemo(() => ({
    center: new kakao.maps.LatLng(37.55705, 126.9259),
    level: 5,
  }), []); // useMemo를 사용하여 options 객체를 메모이제이션

  useEffect(() => {
    new kakao.maps.Map(container.current, options);
  }, [options]); // 의존성 배열에 options 추가

  return (
    <div id="map" ref={container} style={{ width: '50vw', height: '50vh' }}></div>
  );
}

export default Kakaomap;
