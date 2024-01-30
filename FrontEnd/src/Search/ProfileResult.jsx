// 검색 결과 - 사용자

import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const Profile = styled.div`
    width: 100%;
    background: black;
    display: flex;
    margin-bottom: 30px;
`;

const ProfileImg = styled.img`
    width: 140px;
    height: 140px;
    border-radius: 50%;
`;

const ProfileText = styled.div`
    margin-left: 30px;
    margin-top: auto;
    margin-bottom: auto;
`;

const UserName = styled.p`
    font-size: 28px;
    font-weight: bold;
    color: white;
    margin-bottom: 10px;
    margin-top: 0px;
`;

const UserInfo = styled.p`
    font-size: 14px;
    color: white;
    margin: 0px;
`;

const ProfileResult = () => {
    const [userImage, setUserImage] = useState('https://via.placeholder.com/150'); // 기본 이미지 URL
    const [userName, setUserName] = useState('DAEHO JANG');
    const [userInfo, setUserInfo] = useState('사용자가 작성한 소개 한 마디');
    
    return (
        <Wrapper>
            <Profile>
                <ProfileImg src={userImage} alt="User" />
                <ProfileText>
                    <UserName>{userName}</UserName>
                    <UserInfo>{userInfo}</UserInfo>
                </ProfileText>
            </Profile>
        </Wrapper>
    );
  };
  
  export default ProfileResult;