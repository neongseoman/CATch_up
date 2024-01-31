// 검색 결과 - 스트리밍
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import VideoTmp from "./VideoTmp";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

const Streaming = styled.div`
    width: 100%;
    margin-bottom: 30px;
`;

const Video = styled.div`
    width: calc(55%);
    height: 300px;
    display: flex;
    float: left;
    border-radius: 10px;
    background-color: #8B8F92;
    margin-bottom: 30px; 
`;

const Info = styled.div`
    width: calc(46%);
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
    margin-left: -10%;
    margin-bottom: 30px;
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

const StreamingTitle = styled.div`
    color: white;
    font-size: 24px;
`;

const StreamingInfo = styled.div`
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
    font-size: 20px;
    color: white;
`;

const OptionField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 20px;
`;

const Option = styled.p`
    font-size: 12px;
    color: white;
    margin-top: 20px;
`;

const SearchStreaming = () => {
    const [data, setData] = useState();
    const url = 'http://i10a105.p.ssafy.io:8080/searchStreaming?query=김경호 비비&page=0&size=10';

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
            <MapWrapper></MapWrapper>
            <Separator />
            <Streaming>
                {/* 데이터가 있고 배열이면 매핑하여 출력 */}
                {data && Array.isArray(data) ? data.map((e, i) => (
                    <div key={i}>
                        <Info>
                            <TagField><Tag>#{e.tag}</Tag></TagField>
                            <StreamingTitle>{e.title}</StreamingTitle>
                            <StreamingInfo>{e.introduction}</StreamingInfo>
                            <ProfileField>
                                <ProfileImg src={e.profileImagePath} alt="User" />
                                <ProfileName>{e.nickName}</ProfileName>
                            </ProfileField>
                            <OptionField>
                                <Option>{getTimeFromStartTime(e.startTime)}부터 {e.maxViewer}명 시청중</Option>
                            </OptionField>
                        </Info>

                        <Video>
                            <VideoTmp />
                        </Video>
                    </div>
                )) : null}
            </Streaming>
        </Wrapper>
      );
    };
  
  export default SearchStreaming;
