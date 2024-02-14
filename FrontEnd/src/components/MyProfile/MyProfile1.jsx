// 내 프로필-1
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MyProfile1 = ({ userInfo }) => {
  const navigate = useNavigate();

  // const handleEditClick = () => {
  //   alert('프로필 수정 모달 띄우기!');
  // };

  const handleStartClick = () => {
    navigate('/streaming/info');
  };

  return (
    <Wrapper>
      <InfoField>
        {/* <ProfileImg
            src={userInfo.profileImagePath}
            onError={(e) => {
                e.target.src = '/img/logo_withoutDot.png';
            }}
        /> */}
        <ProfileImg src= "/img/logo_withoutDot.png" />
        <TextField>
          <TextTop>
            <UserNickname>{userInfo.nickname}</UserNickname>
            <EditButton>✐edit</EditButton>
          </TextTop>
          <UserIntroduce>{userInfo.introduction}</UserIntroduce>
        </TextField>
        
      </InfoField>
      <StartButton onClick={handleStartClick}>방송하기</StartButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    margin-top: 20px;
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
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-left: 25px;
`;

const TextField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 25px;
`;

const TextTop = styled.p`
    display: flex;
`;

const UserNickname = styled.p`
    font-size: 28px;
    color: white;
`;

const UserIntroduce = styled.p`
    margin-top: 5px;
    font-size: 15px;
`;

const EditButton = styled.button`
    font-size: 12px;
    border: 1px solid;
    border-radius: 15px;
    background: none;
    padding: 3px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;;
    width: 50px;
    height: 25px;
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

export default MyProfile1;
