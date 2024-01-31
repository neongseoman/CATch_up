// 검색 결과 - 쇼츠
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
`;

const Shorts = styled.div`
    width: 100%;
    margin-bottom: 30px;
`;

const Video = styled.div`
    width: calc(55%);
    height: 300px;
    margin-bottom: 30px;
    display: flex;
    float: left;
    border-radius: 10px;
    background-color: #8B8F92;
`;

const Info = styled.div`
    width: calc(46%);
    margin-left: -10%;
    margin-bottom: 30px;
    padding: 2% 5%;
    height: 300px;
    display: flex;
    float: right;
    color: white;
    border-radius: 10px;
    background-color: #1E1D1A;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: flex-start;
`;

const TagField = styled.div`
    display: flex;
    gap: 4px;
`;

const Tag = styled.div`
    font-size: 10px;
    background: #56350A;
    color: #F7B84B;
    border-radius: 30px;
    padding: 6px;
`;

const ShortsTitle = styled.div`
    color: white;
    font-size: 24px;
`;

const ShortsInfo = styled.div`
    color: white;
    font-size: 12px;
`;

const ProfileField = styled.p`
    display: flex;
    margin: 0px;
`;

const ProfileImg = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
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
    justify-content: space-between;
    color: white;
    width: 100%;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
`;

const Option = styled.p`
    font-size: 10px;
    color: white;
`;

const Data = styled.p`
    font-size: 12px;
    color: white;
`;

const SearchShorts = () => {
    const [tagList, setTagList] = useState(['태그1', '태그2', '태그3']);
    const [data, setData] = useState();
    const url = 'http://i10a105.p.ssafy.io:8080/searchShorts?query=두번째 &page=0&size=10';

    useEffect(() => {
        axios.get(url)
          .then(response => {
            console.log('데이터:', response.data);
            setData(response.data.content); 
          })
          .catch(error => {
            console.error('에러:', error);
          });
      }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // 두 자리로 표시되도록
        const day = ('0' + date.getDate()).slice(-2); // 두 자리로 표시되도록
        return `${year}-${month}-${day}`;
    };

    const formatStreamingTime = (seconds) => {
        const hours = Math.floor(seconds / 3600); // 초를 시간으로 변환
        const remainingMinutes = Math.floor((seconds % 3600) / 60); // 시간을 제외한 나머지 초를 분으로 변환
        const remainingSeconds = seconds % 60; // 남은 초
        
        let result = '';
    
        if (hours > 0) {
            result += `${hours}시간 `;
        }
    
        // 분과 초를 표기
        if (remainingMinutes > 0) {
            result += `${remainingMinutes}분 `;
        }
        if (remainingSeconds > 0 || result === '') {
            result += `${remainingSeconds}초`;
        }
    
        return result;
    };
    
    return (
        <Wrapper>
            <Shorts>
            {/* 데이터가 있고 배열이면 매핑하여 출력 */}
            {data && Array.isArray(data) ? data.map((e, i) => (
                <div key={i}>

                <Info>
                    <TagField>
                    {tagList.map((tag, i) => (
                        <div key={i}>
                            <Tag>#{tag}</Tag>
                        </div>
                    ))}
                    </TagField>
                    <ProfileField>
                        <ProfileImg src={e.profileImagePath} alt="User" />
                        <ProfileName>{e.nickname}</ProfileName>
                    </ProfileField>
                    <ShortsTitle>{e.title}</ShortsTitle>
                    <ShortsInfo>{e.introduction}</ShortsInfo>
                    <StreamingInfoField>
                        <Options>
                            <Option>최대 시청자 수</Option>
                            <Data>{e.maxViews}명</Data>
                        </Options>
                        <Options>
                            <Option>방송 날짜</Option>
                            <Data>{formatDate(e.streamedTime)}</Data>
                        </Options>
                        <Options>
                            <Option>총 방송 시간</Option>
                            <Data>{formatStreamingTime(e.streamingTime)}</Data>
                        </Options>
                    </StreamingInfoField>
                </Info>
                <Video>{e.shortsPath}</Video>
                </div>
            )) : null}
            </Shorts>
        </Wrapper>
    );
  };
  
  export default SearchShorts;

