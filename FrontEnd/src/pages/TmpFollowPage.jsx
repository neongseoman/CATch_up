import React, { useState, useEffect } from 'react';

function TmpFollowPage({ userId }) {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingsCount, setFollowingsCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  // 팔로워 및 팔로잉 수를 가져오는 함수
  useEffect(() => {
    // 팔로잉 수
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/followings/count`)
      .then((response) => response.json())
      .then((data) => setFollowingsCount(data));

    // 팔로워 수
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/followers/count`)
      .then((response) => response.json())
      .then((data) => setFollowersCount(data));

    // 현재 사용자가 팔로우하고 있는지 확인
    const currentUserId = "현재 사용자 ID"; // 현재 사용자 ID는 인증 정보로부터 가져와야 합니다.
    fetch(`/api/users/${currentUserId}/is-following/${userId}`)
      .then((response) => response.json())
      .then((isFollowing) => setIsFollowing(isFollowing));
  }, [userId]);

  // 팔로우/언팔로우 처리 함수
  const handleFollow = () => {
    const url = isFollowing ? `${process.env.REACT_APP_API_BASE_URL}/api/users/unfollow/${userId}` : `${process.env.REACT_APP_API_BASE_URL}/api/users/follow/${userId}`;
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
    <div>
      <h1>사용자 정보</h1>
      <p>팔로워: {followersCount}</p>
      <p>팔로잉: {followingsCount}</p>
      <button onClick={handleFollow}>{isFollowing ? '팔로우됨' : '팔로우'}</button>
    </div>
  );
}

export default TmpFollowPage;
