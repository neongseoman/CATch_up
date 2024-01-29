// 검색 결과 - 장소

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column; /* 세로 방향의 Flexbox 레이아웃 */
    align-items: flex-start; /* 왼쪽 정렬 */
`;

const MapWrapper = styled.div`
    width: 100%;
    height: 500px;
    border-radius: 5px;
    background: grey;
    background: linear-gradient(to bottom, rgba(128, 128, 128, 0.5), rgba(128, 128, 128, 0)); /* 그라데이션 추가 */
    margin-bottom: 20px;
`;

const ListWrapper = styled.div`
    width: 100%;
    margin-bottom: 30px;
`;

const ListImage = styled.div`
    width: 100%;
    height: 400px;
    border-radius: 10px;
    background: #8B8F92;
`;

const ListText = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    border-radius: 10px;
    background: #1E1D1A;
    margin: 10px 0px;
    position: relative; /* 상대 위치 설정 */
`;

const StreamingTitle = styled.div`
    border-radius: 50%;
    margin: 10px;
    color: white;
    position: absolute; /* 절대 위치 설정 */
    top: 0;
    left: 0;
`;

const ProfileField = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 10px;
    color: white;
    position: absolute; /* 절대 위치 설정 */
    bottom: 0;
    left: 0;
`;

const ViewerCount = styled.div`
    margin: 10px;
    color: white;
    position: absolute; /* 절대 위치 설정 */
    top: 0;
    right: 0;
`;

const StartTime = styled.div`
    margin: 10px;
    color: white;
    position: absolute; /* 절대 위치 설정 */
    bottom: 0;
    right: 0;
`;


const PlaceResult = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Axios를 사용하여 서버로부터 데이터를 가져옵니다.
        axios.get('서버')
          .then(response => {
            // 성공적으로 데이터를 받아왔을 때의 처리
            setData(response.data); 
          })
          .catch(error => {
            // 에러가 발생했을 때의 처리
            console.error('Error fetching data:', error);
          });
      }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행
    
      return (
        <Wrapper>
            <MapWrapper>지도</MapWrapper>
                {data ? (
                    // 데이터가 있다면 보여줄 내용
                    <ListWrapper>
                        
                    </ListWrapper>
                ) : (
                    // 데이터를 아직 받아오지 않았다면 로딩 메시지
                    <p>Loading...</p>
                )}
            <ListWrapper>
                <ListImage />
                <ListText>
                    <StreamingTitle>스트리밍 제목</StreamingTitle>
                    <ProfileField>스트리머 정보</ProfileField>
                    <ViewerCount>시청자 수</ViewerCount>
                    <StartTime>시작 시간</StartTime>
                </ListText>
            </ListWrapper>
        </Wrapper>
      );
    };
  
  export default PlaceResult;
