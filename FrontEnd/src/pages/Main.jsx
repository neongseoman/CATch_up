import React from "react";
import CustomText from "../components/CustomText";
import styled from "@emotion/styled";
import MainStreaming from "../components/MainStreaming";
import MainShorts from "../components/MainShorts";

const Main = () => {

  return (
    <>
      <TwoColumnLayout>
        <ColumnContainer>
          <CustomText typography="h1" bold>
            스트리밍 보러 가기
          </CustomText>
          <br />
          <MainStreaming />
        </ColumnContainer>
        <ColumnContainer>
          <CustomText typography="h1" bold>
            인기 쇼츠 보러 가기
          </CustomText>
          <br />
          <MainShorts />
        </ColumnContainer>
      </TwoColumnLayout>
    </>
  );
};

const TwoColumnLayout = styled.div`
  display: flex;
  flex-direction: row; // 기본적으로 가로로 배치

  @media (max-width: 900px) {
    flex-direction: column; // 브라우저 가로 크기가 900px 이하인 경우 세로로 배치
  }
`;

const ColumnContainer = styled.div`
  width: 100%;
  flex: 1; // 각 컨테이너가 동일한 너비를 가지도록 설정
  margin: 10px; // 컨테이너 간 간격
  padding: 20px; // 내부 여백
  background-color: #555555;
  border-radius: 10px;
`;

export default Main;
