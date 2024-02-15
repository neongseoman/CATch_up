import React, { useState, useEffect } from "react";
import { styled, createGlobalStyle } from "styled-components";
import ChatApp from "../components/ChatApp";
import VideoTmp from "../components/VideoTmp";
import StreamerList from "../components/StreamerList";
import Navbar from "../components/Navbar";
import Watching from "./Watching";
import { useLocation, useNavigate } from "react-router-dom";

const WatchingPage = () => {
  const { data } = useLocation().state;
  const navigate = useNavigate();

  const handleProfileClick = (id) => {
    navigate(`/user/userprofilepage/${id}`);
  };

  const getTimeFromStartTime = (startTime) => {
    const date = new Date(startTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours < 10 ? "0" + hours : hours}시 ${minutes < 10 ? "0" + minutes : minutes}분`;
  };

  // useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         // 서버로부터 스트리밍 정보를 가져오는 HTTP 요청
  //         const response = await fetch("", {
  //           method: "GET",
  //           credentials: "include",
  //         });

  //         if (!response.ok) {
  //           throw new Error("서버 응답이 실패했습니다");
  //         }

  //         const data = await response.json();
  //         console.log(data);
  //         setStreamingInfo(data);
  //         setLoading(false);
  //       } catch (e) {
  //         setLoading(false);
  //         console.log(e);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  return (
    <Wrapper>
      <GlobalStyle />
      <Container>
        {(
          <>
            <LeftBox>
              <StreamerList />
            </LeftBox>
            <MiddleContainer>
              <MiddleTopBox>
                <Watching buskerEmail={data.buskerEmail} />
              </MiddleTopBox>
              <MiddleBottomBox>
                <StreamingTitle>{data.buskingTitle}</StreamingTitle>
                <StreamingInfo>{data.buskingInfo}</StreamingInfo>
                <Tags>{data.buskingHashtag}</Tags>
                <ProfileField>
                  <ProfileImg src= "/img/logo_withoutDot.png" />
                  <ProfileName>{data.nickname}</ProfileName>
                  <Count>
                    현재 시청자 수 : {data.audienceCount}명 | 방송 시작 시간 : {getTimeFromStartTime(data.startTime)}
                  </Count>
                </ProfileField>
                <UserProfile onClick={() => handleProfileClick(data.userNo)}>
                  프로필 보러 가기
                </UserProfile>
              </MiddleBottomBox>
            </MiddleContainer>
            <RightBox>
              <ChatApp />
            </RightBox>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    overflow-y: auto; // 전체 페이지에 대한 세로 스크롤 활성화  
`;
const Container = styled.div`
  display: flex;
  flex-direction: row; // 기본은 가로 배치
  width: 100%;
  height: 100vh; // 전체 화면 높이

  @media (max-width: 900px) {
    flex-direction: column; // 모바일 화면에서는 세로 배치
    overflow-y: auto; // 세로 스크롤 활성화
    height: auto; // 콘텐츠에 맞게 높이 조정
    height:500px;
  }
`;
const LeftBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 100%;
  min-width: 200px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 600px); // 화면 가로 길이에서 600px 뺀 나머지 사용
  height: 100%;

  @media (max-width: 900px) {
    width: 100%; // 모바일 화면에서는 전체 너비 사용
    overflow-y: auto; // 내부 스크롤 활성화
    min-height:400px;
  }
`;


const MiddleTopBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1000px;
`;

const MiddleBottomBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  background: black;
  padding: 10px;
`;

const StreamingTitle = styled.p`
  color: white;
  font-size: 20px;
`;

const StreamingInfo = styled.p`
  color: gray;
  font-size: 14px;
`;

const Tags = styled.p``;

const ProfileField = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ProfileImg = styled.img`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  object-fit: cover;
  transform: scale(1.3);
  margin-top: auto;
  margin-right: 8px;
  margin-bottom: auto;
`;

const ProfileName = styled.p`
  color: white;
  font-size: 15px;
  margin-top: auto;
  margin-right: 8px;
  margin-bottom: auto;
`;

const Toggle = styled.p`
  margin-top: auto;
  margin-bottom: auto;
`;

const Count = styled.p`
  color: white;
  font-size: 10px;
  margin-top: auto;
  margin-right: 5px;
  margin-bottom: auto;
  margin-left: auto;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width:300px;
  height: 100%;
  background: orange;
  max-width: 300px;

  @media (max-width: 900px) {
    width: 100%; // 모바일 화면에서는 전체 너비 사용
    min-width: 0; // 모바일에서는 최소 너비 제한 없앰
    height:200px;
    max-width: 5000px;
  }
`;

const UserProfile = styled.button`
  width: 100%;
  height: 25px;
  margin-top: 5px;
  border-radius: 5px;
  background: #f24e1e;
  opacity: 0.5;
  color: white;
  font-size: 12px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

export default WatchingPage;
