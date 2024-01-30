import React from "react";
import CustomText from "../components/CustomText";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <>
      <CustomText typography="h1" bold>
        메인페이지 입니다
      </CustomText>
      <CustomText typography="p">메인페이지는 좋죠</CustomText>
      <Link to={'/map'}>지도</Link>
      
      <TwoColumnLayout>
        <ColumnContainer>제1항의 해임건의는 국회재적의원 3분의 1 이상의 발의에 의하여 국회재적의원 과반수의 찬성이 있어야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다.<br/><br/>

          모든 국민은 자기의 행위가 아닌 친족의 행위로 인하여 불이익한 처우를 받지 아니한다. 국가는 지역간의 균형있는 발전을 위하여 지역경제를 육성할 의무를 진다.<br/><br/>

          대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다. 국회의원이 회기전에 체포 또는 구금된 때에는 현행범인이 아닌 한 국회의 요구가 있으면 회기중 석방된다.<br/><br/>

          국토와 자원은 국가의 보호를 받으며, 국가는 그 균형있는 개발과 이용을 위하여 필요한 계획을 수립한다. 정당의 설립은 자유이며, 복수정당제는 보장된다.</ColumnContainer>
        <ColumnContainer>
          국민의 자유와 권리는 헌법에 열거되지 아니한 이유로 경시되지 아니한다. 국가의 세입·세출의 결산, 국가 및 법률이 정한 단체의 회계검사와 행정기관 및 공무원의 직무에 관한 감찰을 하기 위하여 대통령 소속하에 감사원을 둔다.<br/><br/>

          국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 국정의 중요한 사항에 관한 대통령의 자문에 응하기 위하여 국가원로로 구성되는 국가원로자문회의를 둘 수 있다.<br/><br/>

          국가는 주택개발정책등을 통하여 모든 국민이 쾌적한 주거생활을 할 수 있도록 노력하여야 한다. 국가는 모성의 보호를 위하여 노력하여야 한다. 체포·구속·압수 또는 수색을 할 때에는 적법한 절차에 따라 검사의 신청에 의하여 법관이 발부한 영장을 제시하여야 한다. 다만, 현행범인인 경우와 장기 3년 이상의 형에 해당하는 죄를 범하고 도피 또는 증거인멸의 염려가 있을 때에는 사후에 영장을 청구할 수 있다.
        </ColumnContainer>
      </TwoColumnLayout>
    </>
  );
};

const TwoColumnLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ColumnContainer = styled.div`
  flex: 1; // 각 컨테이너가 동일한 너비를 가지도록 설정
  margin: 5px; // 컨테이너 간 간격
  padding: 20px; // 내부 여백
  background-color: #f0f0f0; // 배경색
  // height: 200px; // 높이 설정
`;


export default Main;
