// 내 프로필
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserProfile1 from '../components/UserProfile/UserProfile1';
import UserProfile2 from '../components/UserProfile/UserProfile2';
import UserProfile3 from '../components/UserProfile/UserProfile3';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버로부터 사용자 정보를 가져오는 HTTP 요청
        const response = await fetch('https://i10a105.p.ssafy.io/api/profile?id=2', {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다');
        }

        const data = await response.json();
        console.log(data)
        setUserInfo(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e)
      }
      
    };

    fetchData();
  }, []);

  return (
    <center>
    <Wrapper>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <UserProfile1 userInfo={userInfo} />
          <UserProfile2 userInfo={userInfo} />
          <UserProfile3 userInfo={userInfo} />
        </>
      )}
    </Wrapper>
    </center>
  );
};

export default UserProfilePage;
