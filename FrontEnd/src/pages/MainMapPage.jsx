/*global kakao */
import React, { useRef, useEffect, useState } from 'react';
import styled from "@emotion/styled";

const MainMapPage = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null); // 맵 객체를 상태로 관리

  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [keyword, setKeyword] = useState('이태원 맛집');

  useEffect(() => {
    if (map) return; // 맵이 이미 초기화되었으면 초기화하지 않음

    const options = {
      center: new kakao.maps.LatLng(37.55705, 126.9259),
      level: 5
    };

    const newMap = new kakao.maps.Map(mapContainer.current, options);
    setMap(newMap); // 상태 업데이트

  }, [map]); // 의존성 배열에 map 추가

  const searchPlaces = () => {
    if (!keyword.trim()) {
      alert('키워드를 입력해주세요!');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);
        // 여기에 마커 및 목록 표시 로직 추가
        const bounds = new kakao.maps.LatLngBounds();
        markers.forEach(marker => marker.setMap(null)); // 기존 마커 제거

        const newMarkers = places.map((place, i) => {
          const position = new kakao.maps.LatLng(place.y, place.x);
          bounds.extend(position);
          return addMarker(position, i, place.place_name);
        });

        setMarkers(newMarkers);
        map.setBounds(bounds);

      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    });
  };

  // 마커 생성 및 지도에 표시하는 함수
  const addMarker = (position, idx, title) => {
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
    const imageSize = new kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691),
      spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10),
      offset: new kakao.maps.Point(13, 37)
    };
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    const marker = new kakao.maps.Marker({
      position, // 마커의 위치
      image: markerImage
    });

    marker.setMap(map);
    return marker;
  };


  return (
    <>
      <FullPageMap ref={mapContainer}></FullPageMap>

      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <form onSubmit={(e) => { e.preventDefault(); searchPlaces(); }}>
            키워드 : <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} size="15" />
            <button type="submit">검색하기</button>
          </form>
        </div>
        <hr />
        <ul id="placesList">
          {/* 검색 결과 목록 */}
          {places.map((place, index) => (
            <li key={index}>
              {/* 검색 결과 표시 */}
            </li>
          ))}
        </ul>
        <div id="pagination"></div>
      </div>
    </>
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
