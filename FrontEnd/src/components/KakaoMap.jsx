/*global kakao */ 
import { useRef, useEffect, useMemo } from 'react';

function Kakaomap(props) {
    const container = useRef(null);
    
    const options = useMemo(() => ({
      center: new kakao.maps.LatLng(37.55705, 126.9259),
      level: 5,
    }), []); // useMemo를 사용하여 options 객체를 메모이제이션
  
    useEffect(() => {
      new kakao.maps.Map(container.current, options);
    }, [options]); // 의존성 배열에 options 추가
  
    // props에서 width와 height 값을 추출
    const { width, height } = props;
  
    return (
      <div 
        id="map" 
        ref={container} 
        style={{ 
          width: width || '100%', 
          height: height || '100%',
          borderRadius: '15px' // border radius 스타일 적용
        }}
      ></div>
    );
  }
  

export default Kakaomap;
