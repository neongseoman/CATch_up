// 내 프로필

import React, { useState } from 'react';
import styled from 'styled-components';
import MyProfile1 from './MyProfile1';
import MyProfile2 from './MyProfile2';
import MyProfile3 from './MyProfile3';
import MyProfile4 from './MyProfile4';

const Wrapper = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column; /* 세로 방향의 Flexbox 레이아웃 */
    align-items: flex-start; /* 왼쪽 정렬 */
`;

const PageTitle = styled.h2`
    color: #5E6468;
`;

const MyProfile = () => {
  const [userName, setUserName] = useState('John Doe');
  const [userImage, setUserImage] = useState('https://via.placeholder.com/150'); // 기본 이미지 URL

  return (
    <center>
    <Wrapper>
      <PageTitle>내 프로필</PageTitle>
      <MyProfile1 />
      <MyProfile2 />
      <MyProfile3 />
      <MyProfile4 />
    </Wrapper>
    </center>
  );
};

export default MyProfile;
