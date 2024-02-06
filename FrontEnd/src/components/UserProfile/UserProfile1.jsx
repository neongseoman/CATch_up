// 사용자 프로필-1
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../RecoilState/userRecoilState';

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

const UnfollowButton = styled.button`
    border-radius: 30px;
    font-size: 12px;
    color: white;
    background: #F7B84B;
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
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(userInfo.follower);
  const [followingsCount, setFollowingsCount] = useState(userInfo.following);
  const [recoil, setUserInfo] = useRecoilState(userInfoState);


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

  const handleStreamsClick = () => {
    alert('스트리밍 기록 모달 띄우기!');
  };

  const handleFollowerClick = () => {
    alert('팔로워 목록 모달 띄우기!');
  };

  const handleFollowingClick = () => {
    alert('팔로잉 목록 모달 띄우기!');
  };

  const handleFollowClick = () => {
    if (!recoil.isLoggedIn) {
      alert("로그인 후 이용가능합니다.");
      return; // 로그인하지 않은 경우 함수 실행을 여기서 중단합니다.
    }

    const url = isFollowing ? `${process.env.REACT_APP_API_BASE_URL}/api/users/unfollow/${userInfo.email}` : `${process.env.REACT_APP_API_BASE_URL}/api/users/follow/${userInfo.email}`;

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

            {isFollowing ? (
              <UnfollowButton onClick={handleFollowClick}>
                ♡ 팔로잉
              </UnfollowButton>
            ) : (
              <FollowButton onClick={handleFollowClick}>
                + 팔로우
              </FollowButton>
            )}

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
