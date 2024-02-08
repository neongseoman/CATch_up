// 사용자 프로필-3
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Video = styled.div`
  width: calc(55%);
  height: 300px;
  margin-bottom: 30px;
  display: flex;
  float: left;
  border-radius: 10px;
  background-color: #8b8f92;
`;

const Info = styled.div`
  width: calc(46%);
  margin-left: -10%;
  margin-bottom: 30px;
  padding: 2% 5%;
  height: 300px;
  display: flex;
  float: right;
  color: white;
  border-radius: 10px;
  background-color: #1e1d1a;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: flex-start;
`;

const ShortsTitle = styled.div`
  color: white;
  font-size: 24px;
  text-align: left;
`;

const ShortsInfo = styled.div`
  color: white;
  font-size: 12px;
  text-align: left;
`;

const ProfileField = styled.p`
  display: flex;
  margin: 0px;
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
  color: white;
  object-fit: cover;
  transform: scale(1.5);
`;

const ProfileName = styled.p`
  margin-top: auto;
  margin-bottom: auto;
  font-size: 18px;
  color: white;
`;

const StreamingInfoField = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  width: 100%;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;

const Option = styled.p`
  font-size: 10px;
  color: white;
`;

const Data = styled.p`
  font-size: 12px;
  color: white;
`;

const UserProfile3 = ({ userInfo }) => {
  const navigate = useNavigate();
  const [shortsInfo, setShortsInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const formatStreamingTime = (seconds) => {
    const hours = Math.floor(seconds / 3600); // 초를 시간으로 변환
    const remainingMinutes = Math.floor((seconds % 3600) / 60); // 시간을 제외한 나머지 초를 분으로 변환
    const remainingSeconds = seconds % 60; // 남은 초

    let result = "";

    if (hours > 0) {
      result += `${hours}시간 `;
    }

    if (remainingMinutes > 0) {
      result += `${remainingMinutes}분 `;
    }
    if (remainingSeconds > 0 || result === "") {
      result += `${remainingSeconds}초`;
    }

    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/shorts/user/${userInfo.userNo}`, {
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
              <Video onClick={() => handleShortsClick(e.streamShortClips.streamNo)}>{e.streamShortClips.shortsPath}</Video>
            </Shorts>
          ))
        : null}
    </Wrapper>
  );
};

export default UserProfile3;
