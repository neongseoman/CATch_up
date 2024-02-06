// 사용자 프로필-1
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const BackButton = styled.button`
    align-self: flex-start;
    margin-bottom: 10px;
    background: none;
    color: #F7B84B;
    font-weight: bold;
    font-size: 24px;
`;

const InfoField = styled.div`
    width: 100%;
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

const TextTop = styled.p`
    display: flex;
`;

const UserNickname = styled.p`
    font-size: 28px;
    color: white;
`;

const FollowButton = styled.button`
    border-radius: 30px;
    font-size: 12px;
    color: white;
    background: #8B8F92;
    height: 24px;
    width: 60px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
`;

const UserIntroduce = styled.p`
    font-size: 15px;
`;

const CountField = styled.div`
    width: 100%;
    margin-top: 10px;
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

const Count = styled.span`
    font-size: 12px;
    margin: 5px;
    color: #F7B84B;
`;

const Text = styled.span`
    font-size: 12px;
    margin-left: 5px;
    color: white;
`;

const Bar = styled.span`
    font-size: 12px;
`;

const UserProfile1 = ({ userInfo }) => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingsCount, setFollowingsCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  console.log(userInfo)
  const handleStreamsClick = () => {
    alert('스트리밍 기록 모달 띄우기!');
  };

  const handleFollowerClick = () => {
    alert('팔로워 목록 모달 띄우기!');
  };

  const handleFollowingClick = () => {
    alert('팔로잉 목록 모달 띄우기!');
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

    // 현재 사용자가 팔로우하고 있는지 확인
    const currentUserId = "현재 사용자 ID"; // 현재 사용자 ID는 인증 정보로부터 가져와야 합니다.
    fetch(`/api/users/${currentUserId}/is-following/${userInfo.userId}`)
      .then((response) => response.json())
      .then((isFollowing) => setIsFollowing(isFollowing));
  }, [userInfo.userId]);

  // 팔로우/언팔로우 처리 함수
  const handleFollow = () => {
    const url = isFollowing ? `/api/users/unfollow/${userInfo.userId}` : `/api/users/follow/${userInfo.userId}`;
    const method = isFollowing ? 'DELETE' : 'POST';
  
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // 쿠키/인증 정보를 요청과 함께 보내도록 설정
    })
    .then(() => {
      setIsFollowing(!isFollowing);
      // 팔로우 상태에 따라 팔로워 수 조정
      setFollowersCount((prev) => isFollowing ? prev - 1 : prev + 1);
    })
    .catch((error) => console.error('Error:', error));
  };

  return (
    <Wrapper>
      <BackButton>↩</BackButton>
      <InfoField>
        <ProfileImg
            src={userInfo.profileImagePath}
            onError={(e) => {
                e.target.src = '/img/logo.png';
            }}
        />
        <TextField>
          <TextTop>
            <UserNickname>{userInfo.nickname}</UserNickname>
            <FollowButton onClick={handleFollow} style={{ background: isFollowing ? '#F7B84B' : '#8B8F92' }}>
              {isFollowing ? '♡ 팔로잉' : '+ 팔로우'}
            </FollowButton>

          </TextTop>
          <UserIntroduce>{userInfo.introduction}</UserIntroduce>
          <CountField>
            <Bar>&nbsp;|&nbsp;</Bar>
            <StreamsButton onClick={handleStreamsClick}>
              <Text>STREAMS</Text>
              <Count>{userInfo.streamingCount}</Count>
            </StreamsButton>
            <Bar>&nbsp;|&nbsp;</Bar>
            <FollowerButton onClick={handleFollowerClick}>
              <Text>FOLLOWER</Text>
              <Count>{followersCount}</Count>
            </FollowerButton>
            <Bar>&nbsp;|&nbsp;</Bar>
            <FollowingButton onClick={handleFollowingClick}>
              <Text>FOLLOWING</Text>
              <Count>{followingsCount}</Count>
            </FollowingButton>
            <Bar>&nbsp;|&nbsp;</Bar>
          </CountField>
        </TextField>
      </InfoField>
    </Wrapper>
  );
};

export default UserProfile1;
