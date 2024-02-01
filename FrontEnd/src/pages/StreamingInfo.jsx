import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomText from '../components/CustomText';
import TextInput from '../components/TextInput';
import Button from '../components/Button'
import styled from "@emotion/styled";


const StreamingInfo = () => {
  const navigate = useNavigate();
  const [buskingTitle, setBuskingTitle] = useState('');
  const [buskingReport, setBuskingReport] = useState('');
  const [buskingHashtag, setBuskingHashtag] = useState('');
  const [buskingInfo, setBuskingInfo] = useState('');
  // const [loginError, setLoginError] = useState(''); // 로그인 오류 메시지를 위한 상태

  // const handleStreaming = async (event) => {
  //   event.preventDefault();
  //
  //   로그인이 되어 있다면 방송을 할 수 있음.
  //   로그인 되어 있다면 현재 방송중인지 확인하고 방송중이라면 방송을 끔.
  //   방송중이 아니라면 방송할 수 있도록 RTC를 연결함.
  //   try {
  //     const response = await fetch('http://localhost:8081/api/login', {
  //       method: 'POST',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: formData
  //     });
  //
  //     if (!response.ok) {
  //       throw new Error('로그인에 실패했습니다.');
  //     }
  //
  //     localStorage.setItem('user', JSON.stringify(username));
  //     alert("회원가입이 정상적으로 이루어졌습니다!!!")
  //     navigate('/'); // 메인 화면으로 이동
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setLoginError(error.message); // 오류 메시지 설정
  //   }
  // };
  //
  // const handleSignUp = () => {
  //   navigate('/streaming/onAir'); // 가정: 회원가입 페이지의 경로가 '/signup'일 경우
  // };

  return (
    <>
        <CustomText typography="h1" bold>
          <br />방송 정보<br />
        </CustomText>

        <TextInput placeholder="방송 제목을 입력하세요" value={buskingTitle}
          onChange={(e) => setBuskingTitle(e.target.value)}></TextInput>
        
        <TextInput placeholder="알림 메시지를 입력하세요" value={buskingReport}
          onChange={(e) => setBuskingReport(e.target.value)}></TextInput>

        <TextInput placeholder="#해시태그를 #입력하세요" value={buskingHashtag}
          onChange={(e) => setBuskingHashtag(e.target.value)}></TextInput>
        
        <TextInput placeholder="방송 설명을 입력하세요" value={buskingInfo}
          onChange={(e) => setBuskingInfo(e.target.value)} ></TextInput>

        {/* {loginError && <CustomText typography="p" style={{ color: 'red' , height: '30px' }}>{loginError}</CustomText>} */}
        <Button type="submit">방송 시작</Button>
    </>
  );
}

export default StreamingInfo;
