/*global kakao */ 
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../RecoilState/userRecoilState';
import MapWithMarker from '../KakaoMap/MapWithMarker';

const StyledH4 = styled.h4`
  font-size: 1.4em; /* 원하는 스타일 */
  color: #b3b3b3; /* 원하는 스타일 */
  font-weight: bold; /* 원하는 스타일 */
`;
const StyledP = styled.p`
  font-size: 1em; /* 원하는 스타일 */
  color: #7a7a7a; /* 원하는 스타일 */
`;
const StyledButton = styled.a`
  display: inline-block;
  background-color: #e2ab33; /* Bootstrap의 primary 색상 */
  color: white;
  padding: 13px 15px 13px 20px;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e8c16e;
    cursor:pointer;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 150px;
  margin-top: 10px;
  display: flex;
  flex-direction: column; // 자식 요소들을 수직으로 정렬
  border-radius: 10px;
  background-color: #2C2A26;
  justify-content: center;
  align-items: center;
`;

// 내용과 버튼을 수평으로 정렬하기 위한 컨테이너 스타일 추가
const ContentAndButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; // 내용은 왼쪽, 버튼은 오른쪽에 정렬
  align-items: center;
  width: 100%; // Wrapper의 너비와 동일하게 설정
  padding: 0 20px; // 좌우 패딩을 추가하여 내용과 버튼에 여백 제공
`;

const MapContainer = styled.div`
  width: 100%;
  height: 350px; // 원하는 지도의 높이
`;

async function fetchActiveSessions(userInfo) {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/${userInfo.id}/active`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch active live stream sessions');
  }

  const sessions = await response.json();

  return sessions;
}

const UserProfile2 = ({ userInfo }) => {
  const recoil = useRecoilValue(userInfoState);
  const [session, setSession] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapLink, setMapLink] = useState('');

  useEffect(() => {
    fetchActiveSessions(userInfo)
      .then(data => {
        const activeSession = data[0] || null;
        setSession(activeSession); // sessions 배열의 첫 번째 요소를 설정하거나 null 설정

        // activeSession이 존재하는 경우에만 mapLink를 설정
        if (activeSession) {
          const link = `http://map.naver.com/index.nhn?slng=${recoil.lng}&slat=${recoil.lat}&stext='${encodeURIComponent(recoil.nickname)}'님의 위치&elng=${activeSession.longitude}&elat=${activeSession.latitude}&etext=${encodeURIComponent(activeSession.title)}&menu=route&pathType=1`;
          setMapLink(link);
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [userInfo, recoil.lat, recoil.lng, recoil.nickname]); // userInfo 및 recoil 상태가 변경될 때마다 요청을 다시 보냄
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <Wrapper>
  {session ? (
    <ContentAndButtonContainer>
      <div>
        <StyledH4>🎬️ {session.title}</StyledH4>
        <StyledP>📝 {session.introduction}</StyledP>
      </div>
      <StyledButton href={mapLink} target="_blank" rel="noopener noreferrer">
      {/* <StyledButton href={"https://map.naver.com/p/directions/14141991.9426749,4509208.0793999,%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%ED%85%8C%ED%97%A4%EB%9E%80%EB%A1%9C%20212,,ADDRESS_POI/14142459.96321,4509225.0578328,%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EC%97%AD%EC%82%BC%EB%8F%99%20711-5,,ADDRESS_POI/-/transit?c=16.28,0,0,0,dh"} target="_blank" rel="noopener noreferrer"> */}
      길찾기 🚩
      </StyledButton>
      {session && (
        <MapWithMarker
          latitude={session.latitude}
          longitude={session.longitude}
          markerImageSrc="/img/green.png"
        />
      )}
    </ContentAndButtonContainer>
  ) : (
    <h3>{userInfo.nickname}님은 현재 방송 중이 아닙니다!!</h3>
  )}
</Wrapper>

      {session && (
        <Wrapper>
        <MapWithMarker
          latitude={session.latitude}
          longitude={session.longitude}
          markerImageSrc="/img/green.png"
        />
        </Wrapper>
      )}
    </>

  );
};

export default UserProfile2;
