// 내 프로필-2
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../RecoilState/userRecoilState';

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
    cursor: var(--sub-color);
`;

const FollowerButton = styled.button`
    border: none;
    background: none;
    cursor: var(--sub-color);
`;

const FollowingButton = styled.button`
    border: none;
    background: none;
    cursor: var(--sub-color);
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
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(userInfo.follower);
  const [followingsCount, setFollowingsCount] = useState(userInfo.following);
  const [recoil, setUserInfo] = useRecoilState(userInfoState);

  // const handleStreamsClick = () => {
  //   alert('스트리밍 기록 페이지로 이동!');
  // };

  // const handleFollowerClick = () => {
  //   alert('팔로워 목록 모달 띄우기!');
  // };

  // const handleFollowingClick = () => {
  //   alert('팔로잉 목록 모달 띄우기!');
  // };

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

  // // 팔로워 및 팔로잉 수를 가져오는 함수
  // useEffect(() => {
  //   // 팔로잉 수
  //   fetch(`/api/users/${userInfo.userId}/followings/count`)
  //     .then((response) => response.json())
  //     .then((data) => setFollowingsCount(data));

  //   // 팔로워 수
  //   fetch(`/api/users/${userInfo.userId}/followers/count`)
  //     .then((response) => response.json())
  //     .then((data) => setFollowersCount(data));
  // }, [userInfo.userId]);

  // 팔로워 및 팔로잉 수를 가져오는 함수
  useEffect(() => {
    if(recoil.isLoggedIn){
      fetch(`/api/users/${recoil.userId}/is-following/${userInfo.id}`)
      .then((isFollowing) =>{
        console.log("API 응답:", isFollowing); // API 응답 확인
        setIsFollowing(isFollowing);
      });
    }
  }, [recoil.userId, userInfo.id]);

  return (
    <Wrapper>
      <StreamsButton>
        <Count>{formatTime(userInfo.streamingTime)}</Count>
        <Text>STREAMING TIME</Text>
      </StreamsButton>
      <FollowerButton>
        <Count>{followersCount}</Count>
        <Text>FOLLOWER</Text>
      </FollowerButton>
      <FollowingButton>
        <Count>{followingsCount}</Count>
        <Text>FOLLOWING</Text>
      </FollowingButton>
    </Wrapper>
  );
};

export default MyProfile2;
