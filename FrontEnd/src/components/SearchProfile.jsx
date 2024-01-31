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

const Profile = styled.div`
    width: 100%;
    background: black;
    display: flex;
    margin-bottom: 30px;
`;

const ProfileImg = styled.img`
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: none;
`;

const ProfileText = styled.div`
    margin-left: 30px;
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const UserName = styled.p`
    font-size: 28px;
    font-weight: bold;
    color: white;
    margin-bottom: 10px;
    margin-top: 0px;
`;

const UserInfo = styled.p`
    font-size: 14px;
    color: white;
    margin: 0px;
`;

const SearchProfile = () => {
    const [data, setData] = useState();
    const url = 'http://i10a105.p.ssafy.io:8080/searchUser?query=Tom&page=0&size=10';

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
            <ProfileList>
            {/* 데이터가 있고 배열이면 매핑하여 출력 */}
            {data && Array.isArray(data) ? data.map((e, i) => (
                <div key={i}>
                    <Profile>
                        <ProfileImg src={e.profileImagePath} onerror="this.src='../../public/img/logo.png'" />
                        <ProfileText>
                            <UserName>{e.nickName}</UserName>
                            <UserInfo>{e.introduction}</UserInfo>
                        </ProfileText>
                    </Profile>
                </div>
            )) : null}
            </ProfileList>
        </Wrapper>
    );
  };
  
  export default SearchProfile;
