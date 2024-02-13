import React from "react";
import styled from "styled-components";

const ShortsWrapper = styled.button`
  width: 100%;
  margin-bottom: 30px;
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

const ShortsTitle = styled.div`
  color: white;
  font-size: 24px;
  text-align: left;
`;

const ShortsInfo = styled.div`
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

const CardShorts = ({ shortsData, handleShortsClick, formatDate, formatStreamingTime }) => {
  return (
      <ShortsWrapper onClick={() => handleShortsClick(shortsData.streamNo)}>
          <Info>
              <TagField>
                  <Tag>#{shortsData.category}</Tag>
              </TagField>
              <ProfileField>
                  <ProfileImg
                    src={shortsData.profileImagePath}
                    onError={(e) => {
                      e.target.src = "/img/logo.png";
                    }}
                  />
                  <ProfileName>{shortsData.nickname}</ProfileName>
              </ProfileField>
              <ShortsTitle>{shortsData.title}</ShortsTitle>
              <ShortsInfo>{shortsData.introduction}</ShortsInfo>
              <StreamingInfoField>
                  <Options>
                      <Option>최대 시청자 수</Option>
                      <Data>{shortsData.maxViews}명</Data>
                  </Options>
                  <Options>
                      <Option>방송 날짜</Option>
                      <Data>{formatDate(shortsData.streamedTime)}</Data>
                  </Options>
                  <Options>
                      <Option>총 방송 시간</Option>
                      <Data>{formatStreamingTime(shortsData.streamingTime)}</Data>
                  </Options>
              </StreamingInfoField>
          </Info>
          <Video>{shortsData.shortsPath}</Video>
      </ShortsWrapper>
  );
};

export default CardShorts;