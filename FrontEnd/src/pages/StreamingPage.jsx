import React, {useState} from "react";
import {styled, createGlobalStyle} from 'styled-components';
import ChatApp from "../components/ChatApp";
import Streaming from "./Streaming";
import axios from "axios";
import {useRecoilState} from "recoil";
import {userInfoState} from "../RecoilState/userRecoilState";
import {useNavigate} from "react-router-dom";

const StreamingPage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useRecoilState(userInfoState)
    const userId = userInfo.userId
    const [isStreaming, setIsStreaming] = useState(true)

    const HandleEndButtonClick = () => {
        alert('방송이 종료됩니다!')

        // Your logic for handling "방송 종료"
        const response = axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/busker/${userId}/stopBusking`, {
            body: JSON.stringify({
                userId
            })
        })
            .then(r => {
                console.log(r)
            })
        console.log('방송 종료 버튼이 눌렸습니다.');
        setIsStreaming(false)
        navigate("/")
        // You can pass this information to the Streaming component if needed
    };

    return (
        <Wrapper>
            <GlobalStyle/>
            <Container>
                <LeftBox>
                    <EndButton onClick={HandleEndButtonClick}>방송 종료</EndButton>
                </LeftBox>
                <MiddleBox>
                    <Streaming isStreaming={isStreaming}/>
                </MiddleBox>
                <RightBox>
                    <ChatApp/>
                </RightBox>
            </Container>
        </Wrapper>
    );
};

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
    justify-content: flex-end;
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
    margin-bottom: 55px;
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

export default StreamingPage;
