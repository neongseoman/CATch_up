// 내 프로필-3
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const MyProfile3 = ({ userInfo }) => {

  return (
    <Wrapper>
      로그인한 사용자가 업로드한 쇼츠 목록 출력
    </Wrapper>
  );
};

export default MyProfile3;
