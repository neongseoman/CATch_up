import React from "react";
import styled from "styled-components";
import VideoTmp from "./VideoTmp";

const StreamingWrapper = styled.button`
    width: 100%;
    /* height: 300px; */
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

const CardStreaming = ({ streamingData, handleStreamingClick, getTimeFromStartTime }) => {
    return (
        <StreamingWrapper onClick={handleStreamingClick}>
            <Info>
                <TagField>
                    <Tag>#{streamingData.category}</Tag>
                </TagField>
                <StreamingTitle>{streamingData.title}</StreamingTitle>
                <StreamingInfo>{streamingData.introduction}</StreamingInfo>
                <ProfileField>
                    <ProfileImg
                        src={streamingData.profileImagePath}
                        onError={(e) => {
                            e.target.src = "/img/logo.png";
                        }}
                    />
                    <ProfileName>{streamingData.nickname}</ProfileName>
                </ProfileField>
                <OptionField>
                    <Option>
                        {getTimeFromStartTime(streamingData.startTime)}부터 {streamingData.maxViewer}명 시청중
                    </Option>
                </OptionField>
            </Info>
            <Video>
                <VideoTmp />
            </Video>
        </StreamingWrapper>
    );
};

export default CardStreaming;
