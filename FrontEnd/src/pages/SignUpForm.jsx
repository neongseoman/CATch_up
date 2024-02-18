import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/common/TextInput';
import Button from '../components/common/Button';
import styled from "@emotion/styled";
import CustomText from '../components/common/CustomText';

function SignUpForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태 추가
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(''); // 비밀번호 불일치 에러 메시지 상태 추가
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

  // 비밀번호 확인 입력 시 에러 메시지 업데이트
  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordInput = e.target.value;
    setConfirmPassword(confirmPasswordInput);
    if (password !== confirmPasswordInput) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const isFormValid = () => {
    // 비밀번호와 비밀번호 확인이 일치하는지도 검사하도록 수정
    return validateEmail(email) && validatePassword(password) && password === confirmPassword && !emailError && !passwordError && !confirmPasswordError;
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
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/join`, {
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
        setEmailError("이미 존재하는 아이디입니다.");

      } else {
        console.error('회원가입 실패');
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
    }

  };

  return (
    <div>
      <CustomText typography="h1" bold>
          회원 가입
      </CustomText>
      <ValMsg style={{ height: '20px' }}>
      </ValMsg>

      <TextInput
        type="email"
        placeholder="이메일 주소(아이디)"
        value={email}
        onChange={handleEmailChange}
      />
      <ValMsg style={{ color: emailError ? 'red' : 'transparent', height: '30px' }}>
        {emailError || '⠀'}
      </ValMsg>

      <TextInput
        placeholder="사용자 이름(닉네임)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <ValMsg style={{ color: usernameError ? 'red' : 'transparent', height: '30px' }}>
        {usernameError || '⠀'}
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

      <TextInput
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <ValMsg style={{ color: confirmPasswordError ? 'red' : 'transparent', height: '30px' }}>
        {confirmPasswordError || '⠀'}
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
