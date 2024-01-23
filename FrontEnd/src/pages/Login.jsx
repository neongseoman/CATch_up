import React from "react";
import CustomText from "../components/CustomText";
import TextInput from "../components/TextInput";
import { Button } from "../components/Button";


const Login = () => {
  return (
    <>

      <CustomText typography="h1" bold>
        환영합니다 로그인하시고 사용해보세요
      </CustomText>
      <CustomText typography="p">오늘 로그인하기 참 좋은날이죠?</CustomText>

      <TextInput placeHolder="아이디를 입력하세요"></TextInput>
      <TextInput placeHolder="비밀번호를 입력하세요"></TextInput>
      <Button>제출</Button>
    </>
  );
};

export default Login;
