import React from "react";
import { useParams } from "react-router";
import CustomText from "../components/CustomText";
import axios from "axios";

const Page = () => {
  const { pageId } = useParams();
  axios
  .get(pageId)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
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
