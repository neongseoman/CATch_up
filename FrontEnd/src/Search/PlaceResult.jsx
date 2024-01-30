// 검색 결과 - 장소

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';


// const url = 'http://i10a105.p.ssafy.io:8080/searchStreaming?query=김경호비비&page=0&size=10';
//   axios.get(url)
    //     .then(response => {
    //       console.log('데이터:', response.data);
    //       const data = response.data;
    //     })
    //     .catch(error => {
    //       console.error('에러:', error);
    //     });


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

const Separator = styled.div`
    width: 100%;
    height: 1px;
    background-color: #DBDBDB;
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
    margin: 0px;
`;

const ListText = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    border-radius: 10px;
    background: #1E1D1A;
    margin-bottom: 20px;
    position: relative; /* 상대 위치 설정 */
`;

const StreamingTitle = styled.div`
    margin: 10px;
    color: white;
    font-size: 24px;
    position: absolute; /* 절대 위치 설정 */
    top: 0;
    left: 0;
`;

const StreamingInfo = styled.div`
    margin: 10px;
    color: white;
    position: absolute; /* 절대 위치 설정 */
    top: 40px;
    left: 0;
`;

const ProfileField = styled.p`
    display: flex;
    margin: 0px;
    position: absolute; /* 절대 위치 설정 */
    bottom: 0;
    left: 0;
`;

const ProfileImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 10px;
    color: white;
`;

const ProfileName = styled.p`
    margin-top: auto;
    margin-bottom: auto;
    font-size: 20px;
    color: white;
`;

const StartTime = styled.div`
    margin: 10px;
    color: white;
    position: absolute; /* 절대 위치 설정 */
    top: 0;
    right: 0;
`;

const ViewerCount = styled.div`
    margin: 10px;
    color: white;
    position: absolute; /* 절대 위치 설정 */
    bottom: 0;
    right: 0;
`;

const PlaceResult = () => {
    const [data, setData] = useState();
    const url = 'http://i10a105.p.ssafy.io:8080/searchStreaming?query=김경호비비&page=0&size=10';

    useEffect(() => {
        // Axios를 사용하여 서버로부터 데이터를 가져옵니다.
        axios.get(url)
          .then(response => {
            // 성공적으로 데이터를 받아왔을 때의 처리
            console.log('데이터:', response.data);
            setData(response.data.content); 
          })
          .catch(error => {
            // 에러가 발생했을 때의 처리
            console.error('에러:', error);
          });
      }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

    // 스트리밍 시작 시간 추출
    const getTimeFromStartTime = (startTime) => {
        // startTime을 Date 객체로 변환
        const date = new Date(startTime);

        // 시간 정보 추출
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        // 시간을 문자열로 변환하여 반환
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    };
    
      return (
        <Wrapper>
            <MapWrapper>지도</MapWrapper>
            <Separator />
            <ListWrapper>
                {/* 데이터가 있고 배열이면 매핑하여 출력 */}
                {data && Array.isArray(data) ? data.map((e, i) => (
                    <div key={i}>
                        <ListImage></ListImage>
                        <ListText>
                            <StreamingTitle>{e.title}</StreamingTitle>
                            <StreamingInfo>{e.introduction}</StreamingInfo>
                            <ProfileField>
                                <ProfileImg src={e.userImage} alt="User" />
                                <ProfileName>{e.userName}</ProfileName>
                            </ProfileField>
                            <StartTime>{getTimeFromStartTime(e.startTime)}부터</StartTime>
                            <ViewerCount>{e.maxViewer}명 시청중</ViewerCount>
                        </ListText>
                    </div>
                )) : null}
            </ListWrapper>
        </Wrapper>
      );
    };
  
  export default PlaceResult;