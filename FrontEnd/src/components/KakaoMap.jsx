/*global kakao */ 
import { useRef, useEffect, useMemo } from 'react';

function Kakaomap(props) {
  const container = useRef(null);

  const options = useMemo(() => ({
    center: new kakao.maps.LatLng(37.55705, 126.9259),
    level: 5,
  }), []);

  useEffect(() => {
    const map = new kakao.maps.Map(container.current, options);

    liveStreamSessions.forEach(session => {
      const markerPosition = new kakao.maps.LatLng(session.lat, session.lng);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // 스타일링된 오버레이 컨텐츠
      const content = `
        <div style="
          padding: 10px;
          background-color: #ffe8d8;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.18);
          text-align: center;
        ">
          <h4 style="
            margin: 0 0 5px;
            color: #333;
            font-size: 18px;
            font-weight: bold;
          ">${session.title}</h4>
          <p style="
            margin: 0;
            color: #666;
            font-size: 15px;

          ">${session.introduction}<br>${session.hashtags}</p>
        </div>
      `;

      const customOverlay = new kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.5,
        yAnchor: 1.4,
        clickable: true
      });

      kakao.maps.event.addListener(marker, 'mouseover', () => customOverlay.setMap(map));
      kakao.maps.event.addListener(marker, 'mouseout', () => customOverlay.setMap(null));
    });
  }, [options]);

  const { width, height } = props;

  return (
    <div 
      id="map" 
      ref={container} 
      style={{ 
        width: width || '100%', 
        height: height || '100%',
        borderRadius: '15px'
      }}
    ></div>
  );
}


export default Kakaomap;

const liveStreamSessions = [
  {
    stream_no: 1,
    start_time: "2023-10-01 12:00",
    end_time: "2023-10-01 14:00",
    title: "서울 중심 버스킹",
    introduction: "서울 한복판에서 열리는 화려한 버스킹 쇼",
    hashtags: "#서울 #버스킹 #라이브",
    max_viewer: 150,
    lat: 37.55705,
    lng: 126.9259
  },
  {
    stream_no: 2,
    start_time: "2023-10-02 15:00",
    end_time: "2023-10-02 17:00",
    title: "홍대 거리의 목소리",
    introduction: "홍대 거리에서 펼쳐지는 감성 가득한 라이브",
    hashtags: "#홍대 #음악 #스트리트",
    max_viewer: 200,
    lat: 37.5565,
    lng: 126.923
  },
  {
    stream_no: 3,
    start_time: "2023-10-03 18:00",
    end_time: "2023-10-03 20:00",
    title: "인디 밴드의 밤",
    introduction: "홍대에서 만나는 신선한 인디 밴드의 사운드",
    hashtags: "#인디 #밴드 #홍대라이브",
    max_viewer: 180,
    lat: 37.5555,
    lng: 126.9245
  },
  {
    stream_no: 4,
    start_time: "2023-10-04 19:00",
    end_time: "2023-10-04 21:00",
    title: "홍대 야외 댄스 배틀",
    introduction: "열정이 넘치는 홍대의 댄스 크루 배틀",
    hashtags: "#댄스 #홍대 #배틀",
    max_viewer: 220,
    lat: 37.5545,
    lng: 126.922
  },
  {
    stream_no: 5,
    start_time: "2023-10-05 20:00",
    end_time: "2023-10-05 22:00",
    title: "홍대에서의 재즈의 밤",
    introduction: "재즈 음악과 함께하는 홍대의 밤",
    hashtags: "#재즈 #홍대 #음악회",
    max_viewer: 250,
    lat: 37.5535,
    lng: 126.921
  }
];
