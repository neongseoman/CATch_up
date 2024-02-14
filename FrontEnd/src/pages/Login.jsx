import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomText from '../components/CustomText';
import TextInput from '../components/TextInput';
import Button from '../components/Button'
import styled from "@emotion/styled";
import { useRecoilState } from 'recoil';
import { userInfoState } from '../RecoilState/userRecoilState';
import axios from 'axios';

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(''); // 로그인 오류 메시지를 위한 상태
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(''); // 오류 메시지 초기화

    const formData = new URLSearchParams();
    formData.append('email', username);
    formData.append('password', password);

    try {
      console.log(process.env.REACT_APP_API_BASE_URL)
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      });


      if (!response.ok) {
        throw new Error('로그인에 실패했습니다.');
      }

      // withCredentials: true를 설정하여 요청에 인증 정보 (예: 쿠키)를 포함시킵니다.
      const response2 = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/dashboard`, {
        withCredentials: true
      });
      const addInfo = response2.data.additionalInfo;


      const fetchedUserInfo = {
        isLoggedIn: true, userId: username, idNo: addInfo.id, nickname: addInfo.nickname, lat: 37.5012, lng: 127.0396
      };

      setUserInfo(fetchedUserInfo); // 로그인 후 사용자 정보를 atom에 저장
      localStorage.setItem('user', addInfo.nickname);

      navigate('/'); // 메인 화면으로 이동
    } catch (error) {
      console.error('Error:', error);
      setLoginError(error.message); // 오류 메시지 설정
    }
  };

  const handleSignUp = () => {
    navigate('/user/signup'); // 가정: 회원가입 페이지의 경로가 '/signup'일 경우
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CustomText typography="h1" bold>
          <br />  환영합니다 <br /> 로그인하시고 사용해보세요<br />
        </CustomText>

        <CustomText typography="p"><br />오늘 로그인하기 참 좋은날이죠?<br /></CustomText>

        <br />
        <TextInput placeholder="이메일을 입력하세요" value={username}
          onChange={(e) => setUsername(e.target.value)}></TextInput>

        <ValMsg></ValMsg>

        <TextInput type="password" placeholder="비밀번호를 입력하세요" value={password}
          onChange={(e) => setPassword(e.target.value)} ></TextInput>

        <ValMsg style={{ color: loginError ? 'red' : 'transparent', height: '30px' }}>
          {loginError || '⠀'}
        </ValMsg>
        {/* {loginError && <CustomText typography="p" style={{ color: 'red' , height: '30px' }}>{loginError}</CustomText>} */}
        <Button type="submit">로그인</Button>
      </form>
      <Button onClick={handleSignUp}>회원가입</Button>
    </>
  );
}

const ValMsg = styled.header`
height: 30px; /* 메시지 영역 높이 */
color: red;
font-size: 0.8rem;
margin-top: 5px; /* 입력 필드와의 간격 */
`;


export default LoginForm;
