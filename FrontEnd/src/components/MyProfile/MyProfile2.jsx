// 내 프로필-2
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 150px;
    margin-top: 10px;
    display: flex;
    border-radius: 10px;
    background-color: #2C2A26;
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

const MyProfile2 = ({ userInfo }) => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingsCount, setFollowingsCount] = useState(0);

  const handleStreamsClick = () => {
    alert('스트리밍 기록 모달 띄우기!');
  };

  const handleFollowerClick = () => {
    alert('팔로워 목록 모달 띄우기!');
  };

  const handleFollowingClick = () => {
    alert('팔로잉 목록 모달 띄우기!');
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  };

  // 팔로워 및 팔로잉 수를 가져오는 함수
  useEffect(() => {
    // 팔로잉 수
    fetch(`/api/users/${userInfo.userId}/followings/count`)
      .then((response) => response.json())
      .then((data) => setFollowingsCount(data));

    // 팔로워 수
    fetch(`/api/users/${userInfo.userId}/followers/count`)
      .then((response) => response.json())
      .then((data) => setFollowersCount(data));
  }, [userInfo.userId]);

  return (
    <Wrapper>
      <StreamsButton onClick={handleStreamsClick}>
        <Count>{formatTime(userInfo.additionalInfo.streamingTime)}</Count>
        <Text>STREAMING TIME</Text>
      </StreamsButton>
      <FollowerButton onClick={handleFollowerClick}>
        <Count>{followersCount}</Count>
        <Text>FOLLOWER</Text>
      </FollowerButton>
      <FollowingButton onClick={handleFollowingClick}>
        <Count>{followingsCount}</Count>
        <Text>FOLLOWING</Text>
      </FollowingButton>
    </Wrapper>
  );
};

export default MyProfile2;
