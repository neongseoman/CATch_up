// 내 프로필
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyProfile1 from '../components/MyProfile1';
import MyProfile2 from '../components/MyProfile2';
import MyProfile3 from '../components/MyProfile3';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const PageTitle = styled.h2`
    font-size: 32px;
    color: #5E6468;
`;

const MyProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버로부터 사용자 정보를 가져오는 HTTP 요청
        const response = await fetch('http://localhost:8081/api/dashboard', {
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
      <PageTitle>내 프로필</PageTitle>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
        <MyProfile1 userData={userInfo} />
        <MyProfile2 userData={userInfo} />
        <MyProfile3 userData={userInfo} />
        </div>
      )}
    </Wrapper>
    </center>
  );
};

export default MyProfilePage;
