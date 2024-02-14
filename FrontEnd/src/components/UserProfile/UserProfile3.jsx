// 사용자 프로필-3
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 10px;
    width: 100%;
    float:left;
`;

const Shorts = styled.div`
    width: 50%;
    float: left;
`;

const Video = styled.div`
  width: 98%;
  height: 200px;
  margin-bottom: 10px;
  display: flex;
  border-radius: 10px;
  background-color: #8b8f92;
  cursor: pointer;
`;
const Image = styled.img`
  width: 98%;
  height: 200px;
  margin-bottom: 10px;
  display: flex;
  border-radius: 10px;
  background-color: #8b8f92;
  cursor: pointer;
  object-fit: cover; 
`;

const UserProfile3 = ({ userInfo }) => {
  const navigate = useNavigate();
  const [shortsInfo, setShortsInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/shorts/user/${userInfo.id}`, {
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
  
  const handleShortsClick = (streamNo) => {
    navigate(`/user/shortsdetail/${streamNo}`);
  };

  return (
    <Wrapper>
      {shortsInfo && Array.isArray(shortsInfo)
        ? shortsInfo.map((e, i) => (
            <Shorts key={i}>              
              <Image onClick={() => handleShortsClick(e.streamNo)} src={"/img/shortsPreview/" + e.shortsPath}></Image>
            </Shorts>
          ))
        : null}
    </Wrapper>
  );
};

export default UserProfile3;



