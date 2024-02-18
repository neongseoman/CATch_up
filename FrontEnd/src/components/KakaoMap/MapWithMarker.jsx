/*global kakao */ 
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
`;

const MapWithMarker = ({ latitude, longitude, markerImageSrc = '/img/green.png' }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const mapContainer = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
        draggable: false,
      };

      const map = new window.kakao.maps.Map(mapContainer, options);

      const imageSize = new kakao.maps.Size(50, 50);
      const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize);
      const markerPosition = new kakao.maps.LatLng(latitude, longitude);

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(map);
    }
  }, [latitude, longitude, markerImageSrc]);

  return <MapContainer ref={mapRef} />;
};

export default MapWithMarker;
