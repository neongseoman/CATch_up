// 검색 결과 - 쇼츠

import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
`;

const Shorts = styled.div`
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    position: relative; /* 상대 위치 설정 */
`;

const Video = styled.div`
    width: calc(55%);
    height: 300px;
    display: flex;
    border-radius: 10px;
    background-color: #8B8F92;
`;

const Info = styled.div`
    width: calc(55%);
    height: 300px;
    display: flex;
    color: white;
    border-radius: 10px;
    background-color: #1E1D1A;
    justify-content: space-evenly;
    // position: relative; /* 상대 위치 설정 */
    flex-direction: column; /* 세로 방향의 Flexbox 레이아웃 */
    align-items: flex-start; /* 왼쪽 정렬 */
`;

const ShortsTitle = styled.div`
    margin: 10px;
    color: white;
    font-size: 24px;
    // position: absolute; /* 절대 위치 설정 */
    top: 0;
    left: 0;
`;

const ProfileField = styled.p`
    display: flex;
    margin: 0px;
    // position: absolute; /* 절대 위치 설정 */
    top: 40px;
    left: 0;
`;

const ProfileImg = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 10px;
    color: white;
`;

const ProfileName = styled.p`
    margin-top: auto;
    margin-bottom: auto;
    font-size: 18px;
    color: white;
`;

const StreamingInfoField = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
    color: white;
    // position: absolute; /* 절대 위치 설정 */
    bottom: 0;
    width: 100%; /* 부모 요소에 꽉 차게 설정 */
`;

const Option = styled.p`
    font-size: 10px;
`;

const Data = styled.p`
    font-size: 12px;
`;

const ShortsResult = () => {
    const [shortsTitle, setShortsTitle] = useState('쇼츠 제목');
    const [shortsInfo, setShortsInfo] = useState('쇼츠 설명');
    const [userImage, setUserImage] = useState('https://via.placeholder.com/150'); // 기본 이미지 URL
    const [userName, setUserName] = useState('스트리머 이름');
    const [count, setCount] = useState('최대 시청자 수');
    const [date, setDate] = useState('방송 날짜');
    const [time, setTime] = useState('총 방송 시간');
    
    return (
        <Wrapper>
            <Shorts>
                <Video>

                </Video>
                <Info>
                    <ShortsTitle>{shortsTitle}</ShortsTitle>
                    <ProfileField>
                        <ProfileImg src={userImage} alt="User" />
                        <ProfileName>{userName}</ProfileName>
                    </ProfileField>
                    <StreamingInfoField>
                        <p>
                            <Option>최대 시청자 수</Option>
                            <Data>{count}명</Data>
                        </p>
                        <p>
                            <Option>방송 날짜</Option>
                            <Data>{date}</Data>
                        </p>
                        <p>
                            <Option>총 방송 시간</Option>
                            <Data>{time}</Data>
                        </p>
                    </StreamingInfoField>
                </Info>
            </Shorts>
        </Wrapper>
    );
  };
  
  export default ShortsResult;

