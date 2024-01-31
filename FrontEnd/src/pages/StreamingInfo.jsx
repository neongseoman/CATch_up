import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomText from '../components/CustomText';
import TextInput from '../components/TextInput';
import Button from '../components/Button'
import styled from "@emotion/styled";


function StreamingInfoForm() {
  const navigate = useNavigate();
  const [buskingTitle, setBuskingTitle] = useState('');
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
          <br />  방송 정보 입력하세요.<br />
        </CustomText>


        <TextInput placeholder="방송제목을 입력하세요" value={buskingTitle}
          onChange={(e) => setBuskingTitle(e.target.value)}></TextInput>
        
        <ValMsg></ValMsg>
        <TextInput  placeholder="방송정보를 입력하세요" value={buskingInfo}
          onChange={(e) => setBuskingInfo(e.target.value)} ></TextInput>

        {/* {loginError && <CustomText typography="p" style={{ color: 'red' , height: '30px' }}>{loginError}</CustomText>} */}
        <Button type="submit">방송하기</Button>
    </>
  );
}

const ValMsg = styled.header`
height: 30px; /* 메시지 영역 높이 */
color: red;
font-size: 0.8rem;
margin-top: 5px; /* 입력 필드와의 간격 */
`;


export default StreamingInfoForm;
