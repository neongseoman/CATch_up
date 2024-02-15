import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import CardShorts from "./CardShorts";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MainShorts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/search/shorts`;

  const handleShortsClick = (streamNo) => {
    navigate(`/user/shortsdetail/${streamNo}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const formatStreamingTime = (seconds) => {
    const hours = Math.floor(seconds / 3600); 
    const remainingMinutes = Math.floor((seconds % 3600) / 60); 
    const remainingSeconds = seconds % 60; 

    let result = "";

    if (hours > 0) {
      result += `${hours}시간 `;
    }

    if (remainingMinutes > 0) {
      result += `${remainingMinutes}분 `;
    }

    if (remainingSeconds > 0 || result === "") {
      result += `${remainingSeconds}초`;
    }

    return result;
  };

  useEffect(() => {
      axios
        .get(url)
        .then((response) => {
          console.log("데이터:", response.data);

          const data = response.data;

          setData(data.slice(0, 5));
        })
        .catch((error) => {
          console.error("에러:", error);
        });
    }, []);

  return (
    <Wrapper>
      {data && Array.isArray(data)
        ? data.map((e, i) => (
            <CardShorts
              key={i}
              shortsData={e}
              handleShortsClick={handleShortsClick}
              formatDate={formatDate}
              formatStreamingTime={formatStreamingTime}
            />
          ))
        : null}
       </Wrapper>
  );
};

export default MainShorts;
