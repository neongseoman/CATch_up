// 쇼츠 업로드 페이지
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomText from '../components/common/CustomText';
import TextInput from '../components/common/TextInput';
import Button from '../components/common/Button'
import styled from "@emotion/styled";


const ShortsUpload = () => {
  const navigate = useNavigate();
  const [shortsTitle, setShortsTitle] = useState('');
  const [Hashtag, setHashtag] = useState(['#태그', '#이렇게', "#보여줘요"]);
  const [shortsInfo, setShortsInfo] = useState('');
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
          <br />쇼츠 업로드<br />
        </CustomText>

        <p>shorts 영상</p>

        <TextInput placeholder="쇼츠 제목을 입력하세요" value={shortsTitle}
          onChange={(e) => setShortsTitle(e.target.value)}></TextInput>
        
        <TextInput placeholder="쇼츠 설명을 입력하세요" value={shortsInfo}
          onChange={(e) => setShortsInfo(e.target.value)} ></TextInput>

        {/* {loginError && <CustomText typography="p" style={{ color: 'red' , height: '30px' }}>{loginError}</CustomText>} */}
        <Button type="submit">등록하기</Button>
    </>
  );
}

export default ShortsUpload;
