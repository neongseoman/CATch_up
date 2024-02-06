// 내 프로필
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyProfile1 from '../components/MyProfile/MyProfile1';
import MyProfile2 from '../components/MyProfile/MyProfile2';
import MyProfile3 from '../components/MyProfile/MyProfile3';
import CustomText from '../components/CustomText';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const MyProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버로부터 사용자 정보를 가져오는 HTTP 요청
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/dashboard_test`, {
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
    <CustomText typography="h1" bold>
      <br />내 프로필<br />
    </CustomText>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <MyProfile1 userInfo={userInfo} />
          <MyProfile2 userInfo={userInfo} />
          <MyProfile3 userInfo={userInfo} />
        </>
      )}
    </Wrapper>
    </center>
  );
};

export default MyProfilePage;
