import React from "react";
import CustomText from "../components/CustomText";
import styled from "@emotion/styled";

const Main = () => {

  return (
    <>
      <TwoColumnLayout>
        <ColumnContainer>
          <CustomText typography="h1" bold>
            스트리밍 보러 가기
          </CustomText>
          <br />

        </ColumnContainer>
        <ColumnContainer>
          <CustomText typography="h1" bold>
            인기 쇼츠 보러 가기
          </CustomText>
          <br />

        </ColumnContainer>
      </TwoColumnLayout>
    </>
  );
};

const TwoColumnLayout = styled.div`
  display: flex;
  /* justify-content: space-between; */
`;

const ColumnContainer = styled.div`
  width: 100%;
  flex: 1; // 각 컨테이너가 동일한 너비를 가지도록 설정
  margin: 10px; // 컨테이너 간 간격
  padding: 20px; // 내부 여백
  background-color: #777777;
  border-radius: 10px;
  // height: 200px; // 높이 설정
`;

export default Main;
