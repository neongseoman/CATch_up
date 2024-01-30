import React from 'react';
import styled from "@emotion/styled";

// 스타일드 컴포넌트를 사용하여 에러 페이지를 스타일링합니다.
const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const ErrorMessage = styled.h1`
  color: #d32f2f;
  margin-bottom: 20px;
`;

const ErrorDescription = styled.p`
  margin-bottom: 30px;
`;

const GoBackButton = styled.button`
  padding: 10px 20px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1565c0;
  }
`;

// 에러 페이지 컴포넌트 정의
const ErrorPage = ({ error }) => {
  const handleGoBack = () => {
    // 이전 페이지로 이동
    window.history.back();
  };

  return (
    <ErrorPageContainer>
      <ErrorMessage>오류 발생!</ErrorMessage>
      <ErrorDescription>
        {error.message || '알 수 없는 오류가 발생했습니다.'}
      </ErrorDescription>
      <GoBackButton onClick={handleGoBack}>이전 페이지로 돌아가기</GoBackButton>
    </ErrorPageContainer>
  );
};

export default ErrorPage;
