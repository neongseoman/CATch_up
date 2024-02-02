// 내 프로필-3
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const Viewer = styled.div`
    width: calc(60% - 5px);
    height: 250px;
    display: flex;
    border-radius: 10px;
    background-color: #1E1D1A;
    justify-content: space-between;
    flex-direction: column;
`;

const Streams = styled.div`
    width: calc(40% - 5px);
    height: 250px;
    display: flex;
    border-radius: 10px;
    background-color: #1E1D1A;
    justify-content: space-between;
    flex-direction: column;
`;

const TitleText = styled.p`
    color: white;
    font-size: 16px;
    margin: 10px;
`;

const MyProfile3 = ({ userInfo }) => {

  return (
    <Wrapper>
      <Viewer>
        <TitleText>Viewer</TitleText>
        <p>시청자 수 그래프</p>
      </Viewer>
      <Streams>
        <TitleText>Streams</TitleText>
        <p>스트리밍 표시 달력</p>
      </Streams>
    </Wrapper>
  );
};

export default MyProfile3;
