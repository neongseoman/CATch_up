// 내 프로필-3

import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 10px;
    width: 100%;
    height: 50px;
    display: flex;
    border-radius: 10px;
    background-color: #1E1D1A;
    justify-content: space-evenly;
`;

const Title = styled.p`
    font-size: 16px;
    margin: 5px;
    color: white;
    text-align: center;
    line-height: 45px;
`;

const Likes = styled.p`
    font-size: 16px;
    margin: 5px;
    color: #F7B84B;
    text-align: center;
    line-height: 45px;
`;

const MyProfile3 = () => {
  const [likes, setLikes] = useState('채팅');

  return (
    <Wrapper>
      <Title>내 관심사</Title>
      <Likes>{likes}</Likes>
    </Wrapper>
  );
};

export default MyProfile3;
