import React, { useEffect, useState } from "react";
import axios from "axios"; // axios 라이브러리를 사용하여 HTTP 요청을 보내기 위해 import 합니다.
import { useRecoilState } from "recoil";
import { userInfoState } from "../RecoilState/userRecoilState";

const StreamerList = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const userId = userInfo.userId;
  const [streamers, setStreamers] = useState([]); // streamers 상태를 관리하기 위한 useState 훅

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 호출을 실행
    const fetchStreamers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/followed/list`
        );
        setStreamers(response.data); // 받아온 데이터로 streamers 상태를 업데이트
      } catch (error) {
        console.error("Failed to fetch streamers", error);
      }
    };

    fetchStreamers();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

  return (
    <div
      style={{
        borderRight: "2px solid #33333C",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        color: "white",
        overflowY: "scroll",
      }}
    >
      <style>
        {`
          /* 숨겨진 스크롤바 스타일 */
          ::-webkit-scrollbar {
            width: 0.5em;
            height: 0.5em;
          }

          ::-webkit-scrollbar-thumb {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          ::-webkit-scrollbar-track {
            background-color: transparent;
          }
        `}
      </style>
      <h2
        style={{
          width: "100%",
          textAlign: "center",
          color: "#fff",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        팔로우중인 스트리머
      </h2>
      <ul>
        {streamers.map((streamer, index) => (
          <li key={index} style={{ width: "100%" }}>
            <div
              style={{
                paddingBottom: "5px",
                paddingTop: "5px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  marginLeft: "10px",
                  marginRight: "20px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                  background: `url(${streamer.profileImagePath})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  clipPath: "circle(50%)",
                }}
              ></div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: "20px",
                  }}
                >
                  <h3 style={{ color: "#fff", marginRight: "20px" }}>
                    {streamer.nickname}
                  </h3>
                </div>
                <p>{streamer.introduction}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamerList;
