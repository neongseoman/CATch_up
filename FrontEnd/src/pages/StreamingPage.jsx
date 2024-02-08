import React, {useState} from "react";
import { styled, createGlobalStyle } from 'styled-components';
import ChatApp from "../components/ChatApp";
import VideoTmp from "../components/VideoTmp";
import StreamerList from "../components/StreamerList"
import Streaming from "./Streaming";
import Navbar from "../components/Navbar";

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
    flex-direction: column;
    align-items: center;
    width: 20%;
    height: 100%;
    background: black;

`;

const EndButton = styled.button`
    width: 230px;
    height: 80px;
    border-radius: 10px;
    background: #F7B84B;
    color: white;
    font-size: 28px;
`;

const MiddleBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 100%;
`;

const RightBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 100%; // Full height
    background: orange;
`;

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const StreamingPage = () => {
  const [isStreaming,setIsStreaming] = useState(true)
  const HandleEndButtonClick = () => {
    // Your logic for handling "방송 종료"
    console.log('방송 종료 버튼이 눌렸습니다.');
    setIsStreaming(false)

    // You can pass this information to the Streaming component if needed
  };


  return (
    <Wrapper>
      <GlobalStyle />
      <Container>
        <LeftBox>
          <p>카메라, 마이크 ON/OFF</p>
          <EndButton onClick={HandleEndButtonClick}>방송 종료</EndButton>
        </LeftBox>
        <MiddleBox>
          <Streaming isStreaming={isStreaming}  />
        </MiddleBox>
        <RightBox>
          <ChatApp />
        </RightBox>
      </Container>
    </Wrapper>   
  );
};

export default StreamingPage;
