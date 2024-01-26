// 내 프로필-4

import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const Viewer = styled.div`
    width: calc(60% - 5px);
    height: 300px;
    display: flex;
    border-radius: 10px;
    background-color: #1E1D1A;
    justify-content: space-evenly;
`;

const Streams = styled.div`
    width: calc(40% - 5px);
    height: 300px;
    display: flex;
    border-radius: 10px;
    background-color: #1E1D1A;
    justify-content: space-evenly;
`;

const TitleText = styled.p`
    color: white;
    font-size: 18px;
`;

const MyProfile4 = () => {
  const [follower, setFollower] = useState('');
  const [streams, setStreams] = useState('');

  return (
    <Wrapper>
      <Viewer>
        <TitleText>Viewer</TitleText>
      </Viewer>
      <Streams>
        <TitleText>Streams</TitleText>
      </Streams>
    </Wrapper>
  );
};

export default MyProfile4;
