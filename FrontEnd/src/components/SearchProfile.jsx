// 검색 결과 - 사용자
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const ProfileList = styled.div`
    width: 100%;
    margin-bottom: 30px;
`;

const Profile = styled.button`
    width: 100%;
    height: 150px;
    display: flex;
    color: white;
    border-radius: 10px;
    background-color: #1E1D1A;
    align-items: flex-start;
    margin-bottom: 30px;
`;

const ProfileImg = styled.img`
    width: 140px;
    height: 140px;
    margin-top: 15px;
    margin-left: 10px;
    border-radius: 50%;
    object-fit: cover;
    transform: scale(1.3);
`;

const ProfileText = styled.div`
    margin-top: auto;
    margin-bottom: auto;
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
    background: #8B8F92;
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
    const [data, setData] = useState();
    const url = 'http://i10a105.p.ssafy.io:8080/searchUser?query=Tom&page=0&size=10';

    const handleProfileClick = () => {
        alert('해당 사용자 프로필 화면으로 이동!');
    };

    useEffect(() => {
        axios.get(url)
          .then(response => {
            console.log('데이터:', response.data);
            setData(response.data.content); 
          })
          .catch(error => {
            console.error('에러:', error);
          });
      }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행
    
    return (
        <Wrapper>
            {/* <ProfileList> */}
            {data && Array.isArray(data) ? data.map((e, i) => (
                <ProfileList key={i} onClick={handleProfileClick}>
                    <Profile>
                        <ProfileImg
                            src={e.profileImagePath}
                            onError={(e) => {
                                e.target.src = "/img/logo.png";
                            }}
                        />
                        <ProfileText>
                            <TextTop>
                                <UserName>{e.nickName}</UserName>
                                <StreamingCount>
                                    <LiveIcon src="/img/live.11.png" />
                                    {e.streamingCount}
                                </StreamingCount>
                            </TextTop>
                            <UserInfo>{e.introduction}</UserInfo>
                        </ProfileText>
                    </Profile>
                </ProfileList>
            )) : null}
            {/* </ProfileList> */}
        </Wrapper>
    );
  };
  
  export default SearchProfile;
