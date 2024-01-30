import React from "react";
import { useParams } from "react-router";
import CustomText from "../components/CustomText";

const Page = () => {
  const { pageId } = useParams();

  return (
    <>
      <CustomText typography="h1" bold>
        Page {pageId} 입니다
      </CustomText>
      <CustomText typography="p">{`페이지 주소는 ${pageId} 입니다`}</CustomText>
    </>
  );
};

export default Page;
