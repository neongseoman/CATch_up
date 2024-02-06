// 사용자 프로필-3
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const Shorts = styled.div`
    width: 100%;
    margin-bottom: 30px;
`;

const UserProfile3 = ({ userInfo }) => {
  const [shortsInfo, setShortsInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버로부터 쇼츠 정보를 가져오는 HTTP 요청
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/shorts/3`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다');
        }

        const data = await response.json();
        console.log(data)
        setShortsInfo(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e)
      }
      
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      {/* {shortsInfo.map((e, i) => (
          <Shorts key={i}>
            {e.streamShortClips.shortsPath}
          </Shorts>
      ))} */}
    </Wrapper>
  );
};

export default UserProfile3;
