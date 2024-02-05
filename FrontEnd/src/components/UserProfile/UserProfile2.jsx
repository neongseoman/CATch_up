// 사용자 프로필-2
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 150px;
    margin-top: 10px;
    display: flex;
    border-radius: 10px;
    background-color: #2C2A26;
    justify-content: space-evenly;
`;

const UserProfile2 = ({ userInfo }) => {

  return (
    <Wrapper>
      방송을 하고 있다면 길찾기 지도 출력
    </Wrapper>
  );
};

export default UserProfile2;
