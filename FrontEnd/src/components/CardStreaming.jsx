import React from "react";
import styled from "styled-components";
import VideoTmp from "./VideoTmp";

const StreamingWrapper = styled.button`
    width: 100%;
    background: none;
`;

const Video = styled.div`
    width: calc(49%);
    height: 260px;
    display: flex;
    float: left;
    border-radius: 10px;
    background-color: #8b8f92;
    margin-top: 15px;
`;

const Info = styled.div`
    width: calc(52%);
    margin-left: -10%;
    padding: 2% 5%;
    height: 260px;
    display: flex;
    float: right;
    color: white;
    border-radius: 10px;
    background-color: #1e1d1a;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 15px;
`;

const TagField = styled.div`
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
`;

const Tag = styled.div`
    height: 20px;
    font-size: 10px;
    background: #56350a;
    color: #f7b84b;
    border-radius: 30px;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StreamingTitle = styled.div`
    color: white;
    font-size: 20px;
    text-align: left;
    word-break: keep-all;
`;

const StreamingInfo = styled.div`
    color: white;
    font-size: 12px;
    text-align: left;
    word-break: keep-all;
`;

const ProfileField = styled.p`
    display: flex;
    margin: 0px;
`;

const ProfileImg = styled.img`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 5px;
`;

const ProfileName = styled.p`
    margin-top: auto;
    margin-bottom: auto;
    font-size: 16px;
    color: white;
`;

const OptionField = styled.div`
    margin-top: 20px;
    justify-content: flex-end;
`;

const Option = styled.p`
    font-size: 10px;
    color: white;
`;

const CardStreaming = ({ data, handleStreamingClick, getTimeFromStartTime }) => {
    const hashtags = data.buskingHashtag.split(" ");

    return (
        <StreamingWrapper onClick={handleStreamingClick}>
            <Info>
                <TagField>
                {hashtags.map((tag, i) => (
                    <Tag key={i}>#{tag}</Tag>
                ))}
                </TagField>
                <StreamingTitle>{data.buskingTitle}</StreamingTitle>
                <StreamingInfo>{data.buskingInfo}</StreamingInfo>
                <ProfileField>
                    {/* <ProfileImg
                        src={data.profileImagePath}
                        onError={(e) => {
                            e.target.src = "/img/logo_withoutDot.png";
                        }}
                    /> */}
                    <ProfileImg src= "/img/logo_withoutDot.png" />
                    <ProfileName>{data.nickname}</ProfileName>
                </ProfileField>
                <OptionField>
                    <Option>
                        {getTimeFromStartTime(data.startTime)}부터 {data.audienceCount}명 시청중
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
