// 검색 결과 - 사용자
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import { searchTermState } from '../RecoilState/userRecoilState';

const Wrapper = styled.div`
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ProfileList = styled.div`
  width: 100%;
`;

const Profile = styled.button`
  width: 100%;
  height: 150px;
  display: flex;
  color: white;
  border-radius: 10px;
  background-color: #1e1d1a;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const ProfileImg = styled.img`
  width: 90px;
  height: 90px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 20px;
  border-radius: 50%;
`;

const ProfileText = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TextTop = styled.p`
  display: flex;
`;

const UserName = styled.p`
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin-bottom: 8px;
  margin-right: 10px;
  height: 40px;
`;

const StreamingCount = styled.p`
  margin-top: auto;
  margin-bottom: auto;
  padding: 5px;
  display: flex;
  align-items: center;
  background: #8b8f92;
  color: white;
  font-size: 16px;
  border-radius: 5px;
`;

const LiveIcon = styled.img`
  width: 30px;
  margin-right: 5px;
`;

const UserInfo = styled.p`
  font-size: 14px;
  color: white;
  margin: 0px;
`;

const SearchProfile = () => {
  const navigate = useNavigate();
  const searchTerm = useRecoilValue(searchTermState);
  const [data, setData] = useState();
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/search/searchUser?query=${searchTerm}&page=0&size=10`;

  const handleProfileClick = (id) => {
    navigate(`/user/userprofilepage/${id}`);
  };

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log("데이터:", response.data);
        setData(response.data.content);
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  }, [searchTerm]);

  return (
    <Wrapper>
      {data && Array.isArray(data)
        ? data.map((e, i) => (
            <ProfileList key={i}>
              <Profile onClick={() => handleProfileClick(e.userNo)}>
                <ProfileImg
                  src={e.profileImagePath}
                  onError={(e) => {
                    e.target.src = "/img/logo_withoutDot.png";
                  }}
                />
                <ProfileText>
                  <TextTop>
                    <UserName>{e.nickname}</UserName>
                    <StreamingCount>
                      <LiveIcon src="/img/live.1.png" />
                      {e.streamingCount}
                    </StreamingCount>
                  </TextTop>
                  <UserInfo>{e.introduction}</UserInfo>
                </ProfileText>
              </Profile>
            </ProfileList>
          ))
        : null}
    </Wrapper>
  );
};

export default SearchProfile;
