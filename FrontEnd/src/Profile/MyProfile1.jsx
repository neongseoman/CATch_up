// 내 프로필-1

import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

const ProfileImg = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
`;

const UserNickname = styled.p`
    margin-left: 20px;
    font-size: 32px;
    font-weight: bold;
`;

const EditButton = styled.button`
    font-size: 15px;
    margin-left: 20px;
    border: 1px solid;
    border-radius: 15px;
    background: none;
`;

const StartButton = styled.button`
    color: white;    
    font-size: 16px;
    margin-left: auto;
    background: #F7B84B;
    border: none;
    border-radius: 10px;
    width: 90px;
    height: 35px;
`;

const MyProfile1 = () => {
  const [userName, setUserName] = useState('DAEHO JANG');
  const [userImage, setUserImage] = useState('https://via.placeholder.com/150'); // 기본 이미지 URL

  const handleEditClick = () => {
    // 버튼 클릭 시 수행할 작업 추가
    alert('프로필 수정 모달 띄우기!');
  };

  const handleStartClick = () => {
    // 버튼 클릭 시 수행할 작업 추가
    alert('방송 준비 화면으로 이동합니다!');
  };

  return (
    <Wrapper>
      <ProfileImg src={userImage} alt="User" />
      <UserNickname>{userName}</UserNickname>
      <EditButton onClick={handleEditClick}>✐edit</EditButton>
      <StartButton onClick={handleStartClick}>방송하기</StartButton>
    </Wrapper>
  );
};

export default MyProfile1;
