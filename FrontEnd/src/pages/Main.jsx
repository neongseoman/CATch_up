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
      <ListWrapper>
        {pageNum.map((e, i) => {
          return (
            <>
              <Link to={`/page/${e}`} key={i}>
                <Button>페이지 {e}로 바로가기</Button>
              </Link>
            </>
          );
        })}
      </ListWrapper>

        <Link to="/streaming">
            <Button>방송하기</Button>
        </Link>

        <Link to="/watching">
            <Button>시청하기</Button>
        </Link>
      <Kakaomap></Kakaomap>
    </>
  );
};


export default Main;
