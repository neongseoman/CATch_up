// 사용자 프로필-1
import React from 'react';
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
    alert('내 팔로우 목록에 해당 사용자 추가하기')
  };

  const handleUnfollowClick = () => {
    alert('내 팔로우 목록에서 해당 사용자 삭제하기')
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

            {/* 해당 사용자가 로그인한 사용자의 팔로잉 목록에 없으면 */}
            <FollowButton onClick={handleFollowClick}>
              + 팔로우
            </FollowButton>
            {/* 해당 사용자가 로그인한 사용자의 팔로잉 목록에 있으면 */}
            <UnfollowButton onClick={handleUnfollowClick}>
              ♡ 팔로잉
            </UnfollowButton>

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
              <Count>{userInfo.follower}</Count>
            </FollowerButton>
            <Bar>&nbsp;|&nbsp;</Bar>
            <FollowingButton onClick={handleFollowingClick}>
              <Text>FOLLOWING</Text>
              <Count>{userInfo.following}</Count>
            </FollowingButton>
            <Bar>&nbsp;|&nbsp;</Bar>
          </CountField>
        </TextField>
      </InfoField>
    </Wrapper>
  );
};

export default UserProfile1;
