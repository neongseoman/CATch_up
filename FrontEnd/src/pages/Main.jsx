import React from "react";
import CustomText from "../components/CustomText";
import Kakaomap from "../components/KakaoMap";


const Main = () => {

  return (
    <>
      <CustomText typography="h1" bold>
        메인페이지 입니다
      </CustomText>
      <CustomText typography="p">메인페이지는 좋죠</CustomText>
      <Kakaomap></Kakaomap>
    </>
  );
};


export default Main;
