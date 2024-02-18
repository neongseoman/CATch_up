/*global kakao */ 
import React, { useEffect, useRef, useState } from 'react';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import styled from "@emotion/styled";

const KakaoMapSearch = ({ onLocationSelect }) => {
    const mapRef = useRef(null);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        // 컴포넌트 마운트 시 지도 초기화
        if (window.kakao && window.kakao.maps) {
            const mapContainer = mapRef.current; // 지도를 표시할 div
            const options = {
                center: new window.kakao.maps.LatLng(37.50127, 127.03967), // 초기 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

            // 지도를 생성합니다
            new window.kakao.maps.Map(mapContainer, options);
            executeSearch();
        }
    }, []);

    // 검색 실행 함수
    const executeSearch = () => {
        if (!window.kakao || !window.kakao.maps) return;
    
        const mapContainer = mapRef.current;
        const options = {
            center: new window.kakao.maps.LatLng(37.50127, 127.03967), // 초기 지도의 중심좌표
            level: 3
        };
        const map = new window.kakao.maps.Map(mapContainer, options);
    
        // 기본 위치
        const defaultPosition = new window.kakao.maps.LatLng(37.50127, 127.03967);
    
        // 마커 이미지 설정
        const imageSrc = '/img/green.png'; // 마커 이미지 URL
        const imageSize = new kakao.maps.Size(50, 50); // 마커 이미지 크기
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    
        // 기본 마커 생성
        const marker = new kakao.maps.Marker({
            position: defaultPosition,
            image: markerImage,
            draggable: true
        });
        marker.setMap(map);
        map.setCenter(defaultPosition);
    
        // 드래그 종료 이벤트 리스너
        kakao.maps.event.addListener(marker, 'dragend', function() {
            const newPosition = marker.getPosition();
            onLocationSelect({ latitude: newPosition.getLat(), longitude: newPosition.getLng() });
        });
    
        // 검색 실행
        if (searchKeyword) {
            const ps = new window.kakao.maps.services.Places();
    
            ps.keywordSearch(searchKeyword, (data, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const firstPlace = data[0];
    
                    // 검색 결과로 마커 위치 업데이트
                    const newPosition = new window.kakao.maps.LatLng(firstPlace.y, firstPlace.x);
                    marker.setPosition(newPosition);
                    map.setCenter(newPosition);
                    onLocationSelect({ latitude: firstPlace.y, longitude: firstPlace.x });
                }
            });
        }
    };
    
    // 입력 필드에서 엔터키 이벤트 처리
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            executeSearch();
        }
    };

    return (
        <>
            <SearchContainer>
                <StyledTextInput
                    placeholder="검색할 장소를 입력하세요"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <StyledButton onClick={executeSearch}>장소 검색</StyledButton>
            </SearchContainer>

            <div ref={mapRef} style={{ width: '100%', height: '350px', borderRadius: '15px' }}></div>
        </>
    );
};

const StyledTextInput = styled(TextInput)`
  width: 100%;

  @media (min-width: 901px) {
    min-width: 485px;
  }
`;

const StyledButton = styled(Button)`

  max-width: 150px;
  padding-top: 17px;
  padding-bottom: 16px;
  

`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

export default KakaoMapSearch;
