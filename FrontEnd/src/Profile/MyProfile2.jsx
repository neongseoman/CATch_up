// 내 프로필-2

import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    border-radius: 10px;
    background-color: #1E1D1A;
    justify-content: space-evenly;
`;

const StreamsButton = styled.button`
    border: none;
    background: none;
`;

const FollowerButton = styled.button`
    border: none;
    background: none;
`;

const FollowingButton = styled.button`
    border: none;
    background: none;
`;

const Count = styled.p`
    font-size: 48px;
    margin: 5px;
    color: #F7B84B;
`;

const Text = styled.p`
    font-size: 18px;
    margin: 5px;
    color: white;
`;

const MyProfile2 = () => {
  const [streams, setStreams] = useState('382');
  const [follower, setFollower] = useState('302K');
  const [following, setFollowing] = useState('29');

  const handleStreamsClick = () => {
    // 버튼 클릭 시 수행할 작업 추가
    alert('스트리밍 기록 모달 띄우기!');
  };

  const handleFollowerClick = () => {
    // 버튼 클릭 시 수행할 작업 추가
    alert('팔로워 목록 모달 띄우기!');
  };

  const handleFollowingClick = () => {
    // 버튼 클릭 시 수행할 작업 추가
    alert('팔로잉 목록 모달 띄우기!');
  };

  return (
    <Wrapper>
      <StreamsButton onClick={handleStreamsClick}>
        <Count>{streams}</Count>
        <Text>STREAMS</Text>
      </StreamsButton>
      <FollowerButton onClick={handleFollowerClick}>
        <Count>{follower}</Count>
        <Text>FOLLOWER</Text>
      </FollowerButton>
      <FollowingButton onClick={handleFollowingClick}>
        <Count>{following}</Count>
        <Text>FOLLOWING</Text>
      </FollowingButton>
    </Wrapper>
  );
};

export default MyProfile2;
