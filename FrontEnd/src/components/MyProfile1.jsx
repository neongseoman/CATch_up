// 내 프로필-1

import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 10px;
    width: 100%;
    height: 130px;
    display: flex;
`;

const InfoField = styled.div`
    width: calc(100% - 140px);
    height: 130px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background-color: #3C3A34;
`;

const ProfileImg = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-left: 20px;
    object-fit: cover;
    transform: scale(1.5);
`;

const TextField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 15px;
`;

const UserNickname = styled.p`
    font-size: 28px;
    color: white;
`;

const UserIntroduce = styled.p`
    margin-top: 5px;
    font-size: 18px;
`;

const EditButton = styled.button`
    font-size: 12px;
    border: 1px solid;
    border-radius: 15px;
    background: none;
    padding: 3px;
    width: 50px;
    height: 25px;
    margin-left: auto;
    margin-right: 10px;
    margin-bottom: 10px;
    align-self: end;
    color: white;
`;

const StartButton = styled.button`
    color: white;    
    font-size: 24px;
    margin-left: auto;
    background: #e8543d;
    border: none;
    border-radius: 10px;
    width: 130px;
    height: 130px;
`;

const MyProfile1 = ({ userInfo }) => {
  const [userName, setUserName] = useState('사용자 닉네임');
  const [userIntro, setUserIntro] = useState('사용자 한 줄 소개');
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
      <InfoField>
        <ProfileImg
            src={userInfo.profileImagePath}
            onError={(e) => {
                e.target.src = '/img/logo.png';
            }}
        />
        <TextField>
          <UserNickname>{userInfo.additionalInfo.username}</UserNickname>
          <UserIntroduce>{userInfo.userIntro}</UserIntroduce>
        </TextField>
        <EditButton onClick={handleEditClick}>✐edit</EditButton>
      </InfoField>
      <StartButton onClick={handleStartClick}>방송하기</StartButton>
    </Wrapper>
  );
};

export default MyProfile1;
