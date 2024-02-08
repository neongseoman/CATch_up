import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CustomText from '../components/CustomText';
import TextInput from '../components/TextInput';
import Button from '../components/Button'
import styled from "@emotion/styled";
import {useRecoilState, useRecoilValue} from "recoil";
import {buskerGeolocation, userInfoState} from "../RecoilState/userRecoilState";


const StreamingInfo = () => {
    const navigate = useNavigate();
    const [userInfo, serUserInfo] = useRecoilState(userInfoState)
    const [geolocation, setGeolocation] = useRecoilState(buskerGeolocation)
    const [buskingTitle, setBuskingTitle] = useState('');
    const [buskingReport, setBuskingReport] = useState('');
    const [buskingHashtag, setBuskingHashtag] = useState('');
    const [buskingInfo, setBuskingInfo] = useState('');

    const buskerEmail = userInfo.userId
    // const [loginError, setLoginError] = useState(''); // 로그인 오류 메시지를 위한 상태
    const handleStreaming = async (event) => {
        // event.preventDefault();
        console.log("Busking is on set up")
        const formData = {
            buskerEmail,
            buskingTitle: buskingTitle,
            buskingReport: buskingReport,
            buskingHashtag: buskingHashtag,
            buskingInfo: buskingInfo
        };
        console.log("busker info : " + JSON.stringify(formData))

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/busking/info`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', // Change content type to JSON
                },
                body: JSON.stringify(formData) // Convert formData to JSON
            }).then(r => {
                    console.log(r.status)
                    navigate('/streamingpage')
                }
            );

        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <>
            <CustomText typography="h1" bold>
                <br/>방송 정보<br/>
            </CustomText>

            <TextInput placeholder="방송 제목을 입력하세요" value={buskingTitle}
                       onChange={(e) => setBuskingTitle(e.target.value)}></TextInput>

            <TextInput placeholder="알림 메시지를 입력하세요" value={buskingReport}
                       onChange={(e) => setBuskingReport(e.target.value)}></TextInput>

            <TextInput placeholder="#해시태그를 #입력하세요" value={buskingHashtag}
                       onChange={(e) => setBuskingHashtag(e.target.value)}></TextInput>

            <TextInput placeholder="방송 설명을 입력하세요" value={buskingInfo}
                       onChange={(e) => setBuskingInfo(e.target.value)}></TextInput>

            {/* {loginError && <CustomText typography="p" style={{ color: 'red' , height: '30px' }}>{loginError}</CustomText>} */}
            <Button type="submit" onClick={handleStreaming}>방송 시작</Button>
        </>
    );
}

export default StreamingInfo


