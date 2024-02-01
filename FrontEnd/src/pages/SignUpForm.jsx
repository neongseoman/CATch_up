import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import styled from "@emotion/styled";

function SignUpForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    // 예시: 최소 8자, 하나 이상의 숫자와 특수 문자 포함
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  // 이메일 입력 시 유효성 검사
  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    if (!validateEmail(emailInput)) {
      setEmailError('유효하지 않은 이메일 형식입니다.');
    } else {
      setEmailError('');
    }
  };

  // 비밀번호 입력 시 유효성 검사
  const handlePasswordChange = (e) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
    if (!validatePassword(passwordInput)) {
      setPasswordError('비밀번호는 8자 이상이며, 숫자와 특수문자를 포함해야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const isFormValid = () => {
    // 이메일과 비밀번호가 유효하고, 추가적인 오류 메시지가 없어야 함
    return validateEmail(email) && validatePassword(password) && !emailError && !passwordError;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      alert("모든 조건을 충족시켜주세요.");
      return;
    }

    const userData = {
      email: email,
      nickname: username,
      password: password,
    };

    try {
      const response = await fetch('http://i10a105.p.ssafy.io/api/user/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // JSON 객체를 문자열로 변환
      });

      const result = await response.json();
      if (result.message === "join success") {
        alert("회원가입이 정상적으로 이뤄졌습니다.");
        navigate('/user/login');
      } else if (result.message === "duplicated id") {
        setUsernameError("이미 존재하는 아이디입니다.");

      } else {
        console.error('회원가입 실패');
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
    }

  };

  return (
    <div>
      <TextInput
        placeholder="사용자 이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <ValMsg style={{ color: usernameError ? 'red' : 'transparent', height: '30px' }}>
        {usernameError || '⠀'}
      </ValMsg>

      <TextInput
        type="email"
        placeholder="이메일 주소"
        value={email}
        onChange={handleEmailChange}
      />
      <ValMsg style={{ color: emailError ? 'red' : 'transparent', height: '30px' }}>
        {emailError || '⠀'}
      </ValMsg>

      <TextInput
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={handlePasswordChange}
      />
      <ValMsg style={{ color: passwordError ? 'red' : 'transparent', height: '30px' }}>
        {passwordError || '⠀'}
      </ValMsg>

      <Button onClick={handleSubmit}>회원가입</Button>
    </div>
  );
}


const ValMsg = styled.header`
height: 30px; /* 메시지 영역 높이 */
color: red;
font-size: 0.8rem;
margin-top: 5px; /* 입력 필드와의 간격 */
`;


export default SignUpForm;

