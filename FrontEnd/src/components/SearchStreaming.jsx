// 검색 결과 - 스트리밍
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import VideoTmp from "./VideoTmp";
import {getCurrentBuskingInfo} from "../Apis/streamingApi";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
`;

const MapWrapper = styled.div`
    width: 100%;
    height: 500px;
    border-radius: 5px;
    background: grey;
    background: linear-gradient(
            to bottom,
            rgba(128, 128, 128, 0.5),
            rgba(128, 128, 128, 0)
    ); /* 그라데이션 추가 */
`;

const Streaming = styled.button`
    width: 100%;
    height: 300px;
    background: none;
`;

const Video = styled.div`
    width: calc(55%);
    height: 300px;
    display: flex;
    float: left;
    border-radius: 10px;
    background-color: #8b8f92;
`;

const Info = styled.div`
    width: calc(46%);
    margin-left: -10%;
    padding: 2% 5%;
    height: 300px;
    display: flex;
    float: right;
    color: white;
    border-radius: 10px;
    background-color: #1e1d1a;
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
    background: #56350a;
    color: #f7b84b;
    border-radius: 30px;
    padding: 6px;
`;

const StreamingTitle = styled.div`
    color: white;
    font-size: 24px;
    text-align: left;
`;

const StreamingInfo = styled.div`
    color: white;
    font-size: 12px;
    text-align: left;
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
    object-fit: cover;
    transform: scale(1.5);
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
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [buskerData, setBuskerData] = useState();
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/search/searchStreaming?query=김경호 비비&page=0&size=10`;
    const buskingListUrl = `${process.env.REACT_APP_API_BASE_URL}/api/busking/buskerList`
    const handleStreamingClick = (buskerEmail) => {
        navigate('/watchingpage',{ state: { buskerEmail } })
    };

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                console.log("데이터:", response.data);
                setData(response.data.content);
            })
            .catch((error) => {
                console.error("에러:", error);
            });
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행
    useEffect(() => {
        const currentBuskingInfo = getCurrentBuskingInfo()
        console.log(currentBuskingInfo)
        setBuskerData(currentBuskingInfo.data)
        // axios
        //     .get(buskingListUrl)
        //     .then((response) => {
        //         console.log("데이터:", response.data);
        //         setBuskerData(response.data);
        //     })
        //     .catch((error) => {
        //         console.error("에러:", error);
        //     });
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

    // 스트리밍 시작 시간 추출
    const getTimeFromStartTime = (startTime) => {
        // startTime을 Date 객체로 변환
        const date = new Date(startTime);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
        }`;
    };

    return (
        <Wrapper>
            <MapWrapper></MapWrapper>
            {buskerData && Array.isArray(buskerData)
                ? buskerData.map((e, i) => (
                    <Streaming key={i} onClick={() => handleStreamingClick(e.buskerEmail)}>
                        <Info>
                            <TagField>
                                <Tag>#{e.tag}</Tag>
                            </TagField>
                            <StreamingTitle>{e.buskingTitle}</StreamingTitle>
                            <StreamingInfo>{e.buskingInfo}</StreamingInfo>
                            <ProfileField>
                                <ProfileImg
                                    src={e.profileImagePath}
                                    onError={(e) => {
                                        e.target.src = "/img/logo.png";
                                    }}
                                />
                                <ProfileName>{e.nickname}</ProfileName>
                            </ProfileField>
                            <OptionField>
                                <Option>
                                    {getTimeFromStartTime(e.startTime)}부터 {e.maxViewer}명
                                    시청중
                                </Option>
                            </OptionField>
                        </Info>

                        <Video>
                            <VideoTmp/>
                        </Video>
                    </Streaming>
                ))
                : null}
            {data && Array.isArray(data)
                ? data.map((e, i) => (
                    <Streaming key={i} onClick={handleStreamingClick}>
                        <Info>
                            <TagField>
                                <Tag>#{e.tag}</Tag>
                            </TagField>
                            <StreamingTitle>{e.title}</StreamingTitle>
                            <StreamingInfo>{e.introduction}</StreamingInfo>
                            <ProfileField>
                                <ProfileImg
                                    src={e.profileImagePath}
                                    onError={(e) => {
                                        e.target.src = "/img/logo.png";
                                    }}
                                />
                                <ProfileName>{e.nickname}</ProfileName>
                            </ProfileField>
                            <OptionField>
                                <Option>
                                    {getTimeFromStartTime(e.startTime)}부터 {e.maxViewer}명
                                    시청중
                                </Option>
                            </OptionField>
                        </Info>

                        <Video>
                            <VideoTmp/>
                        </Video>
                    </Streaming>
                ))
                : null}
        </Wrapper>
    );
};

export default SearchStreaming;
