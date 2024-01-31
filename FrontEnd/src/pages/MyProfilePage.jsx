// 내 프로필

import React, { useState } from 'react';
import styled from 'styled-components';
import MyProfile1 from '../components/MyProfile1';
import MyProfile2 from '../components/MyProfile2';
import MyProfile3 from '../components/MyProfile3';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column; /* 세로 방향의 Flexbox 레이아웃 */
    align-items: flex-start; /* 왼쪽 정렬 */
`;

const PageTitle = styled.h2`
    font-size: 32px;
    color: #5E6468;
`;

const MyProfilePage = () => {

  return (
    <center>
    <Wrapper>
      <PageTitle>내 프로필</PageTitle>
      <MyProfile1 />
      <MyProfile2 />
      <MyProfile3 />
    </Wrapper>
    </center>
  );
};

export default MyProfilePage;
