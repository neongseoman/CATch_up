import React, { useState, useEffect } from "react";
import { styled, createGlobalStyle } from "styled-components";
import ChatApp from "../components/ChatApp";
import VideoTmp from "../components/VideoTmp";
import StreamerList from "../components/StreamerList";
import Navbar from "../components/Navbar";
import Watching from "./Watching";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
  overflow-y: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh; // Use full screen height
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%; // 1/3 of the container width
  height: 100%; // Full height
  background: red;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  height: 100%;
`;

const MiddleTopBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1000px; // Half height
  background: green;
`;

const MiddleBottomBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px; // Half height
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
  width: 25%;
  height: 100%;
  background: orange;
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

const WatchingPage = () => {
  const { buskerEmail } = useLocation().state;
  const [streamingInfo, setStreamingInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버로부터 스트리밍 정보를 가져오는 HTTP 요청
        const response = await fetch("", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("서버 응답이 실패했습니다");
        }

        const data = await response.json();
        console.log(data);
        setStreamingInfo(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const handleProfileClick = () => {
    alert("해당 방송 주인 프로필 화면으로 이동!");
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <Container>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <LeftBox>
              <StreamerList />
            </LeftBox>
            <MiddleContainer>
              <MiddleTopBox>
                <Watching buskerEmail={buskerEmail} />
                {/*<VideoTmp />*/}
              </MiddleTopBox>
              <MiddleBottomBox>
                <StreamingTitle>방송 제목</StreamingTitle>
                <StreamingInfo>방송 설명</StreamingInfo>
                <Tags>해시태그</Tags>
                <ProfileField>
                  <ProfileImg
                  // src={e.profileImagePath}
                  // onError={(e) => {
                  //     e.target.src = "/img/logo.png";
                  // }}
                  />
                  <ProfileName>방송중인 사용자 닉네임</ProfileName>
                  <Toggle>팔로우 토글</Toggle>
                  <Count>
                    현재 시청자 수 : 30000명 | 방송 시작 시간 : 13시 28분
                  </Count>
                </ProfileField>
                <UserProfile onClick={handleProfileClick}>
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

export default WatchingPage;
