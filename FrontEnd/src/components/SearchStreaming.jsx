import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import CardStreaming from "./CardStreaming";
import {getCurrentBuskingInfo} from "../Apis/streamingApi";
import { useRecoilValue } from 'recoil';
import { searchTermState } from '../RecoilState/userRecoilState';
import Kakaomap from "./KakaoMap";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
`;

const MapWrapper = styled.div`
    width: 100%;
    height: 500px;
    border-radius: 5px;
    background: grey;
    background: linear-gradient(
            to bottom,
            rgba(128, 128, 128, 0.5),
            rgba(128, 128, 128, 0)
    );
`;

const SearchStreaming = () => {
    const navigate = useNavigate();
    const searchTerm = useRecoilValue(searchTermState);
    const [data, setData] = useState();
    const [buskerData, setBuskerData] = useState();
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/search/searchStreaming?query=${searchTerm}&page=0&size=10`;

    const handleStreamingClick = (buskerEmail) => {
        navigate('/watchingpage',{ state: { buskerEmail } });
    };

    // useEffect(() => {
    //     axios
    //         .get(url)
    //         .then((response) => {
    //             console.log("데이터:", response.data);
    //             setData(response.data.content);
    //         })
    //         .catch((error) => {
    //             console.error("에러:", error);
    //         });
    // }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const currentBuskingInfo = await getCurrentBuskingInfo();
                console.log('current Busking Info:', currentBuskingInfo);
                setBuskerData(currentBuskingInfo);
            }catch (error) {
                console.error('Error in useEffect:', error);
            }
        };
        fetchData();
    }, []);

    const getTimeFromStartTime = (startTime) => {
        const date = new Date(startTime);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
        }`;
    };

    return (
        <Wrapper>

                        <MapWrapper>

<Kakaomap></Kakaomap>

</MapWrapper>

            {buskerData && Array.isArray(buskerData)
                ? buskerData.map((e, i) => (
                    <CardStreaming
                        key={i}
                        data={e}
                        handleStreamingClick={() => handleStreamingClick(e.buskerEmail)}
                        getTimeFromStartTime={getTimeFromStartTime}
                    />
                ))
                : null}
            {/* {data && Array.isArray(data)
                ? data.map((e, i) => (
                    <CardStreaming
                        key={i}
                        data={e}
                        handleStreamingClick={() => handleStreamingClick()}
                        getTimeFromStartTime={getTimeFromStartTime}
                    />
                ))
                : null} */}
        </Wrapper>
    );
};

export default SearchStreaming;
