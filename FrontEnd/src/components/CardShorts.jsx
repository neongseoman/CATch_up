import React from "react";
import styled from "styled-components";

const ShortsWrapper = styled.button`
  width: 100%;
  background: none;
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

const ShortsTitle = styled.div`
  color: white;
  font-size: 20px;
  text-align: left;
  word-break: keep-all;
`;

const ShortsInfo = styled.div`
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
  text-align: left;
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
  font-size: 8px;
  color: white;
`;

const Data = styled.p`
  font-size: 10px;
  color: white;
`;

const Image = styled.img`
  width: calc(49%);
  height: 260px;
  display: flex;  
  float: left;
  border-radius: 10px;
  margin-top: 15px;
  background-color: #8b8f92;
  object-fit: cover;
`

const CardShorts = ({ shortsData, handleShortsClick, formatDate, formatStreamingTime }) => {

  return (
      <ShortsWrapper onClick={() => handleShortsClick(shortsData.streamNo)}>
          <Info>
              <ProfileField>
                  {/* <ProfileImg
                    src={shortsData.profileImagePath}
                    onError={(e) => {
                      e.target.src = "/img/logo_withoutDot.png";
                    }}
                  /> */}
                  <ProfileImg src= "/img/logo_withoutDot.png" />
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
          <Image src={"/img/shortsPreview/" + shortsData.shortsPath}></Image>
      </ShortsWrapper>
  );
};

export default CardShorts;
