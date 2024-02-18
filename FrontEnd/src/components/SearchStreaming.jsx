import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import { searchTermState } from '../RecoilState/userRecoilState';
import { getCurrentBuskingInfo } from "../Apis/streamingApi";
import CardStreaming from "./CardStreaming";
import Kakaomap from './KakaoMap/KakaoMap';

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
`;

const SearchStreaming = () => {
    const navigate = useNavigate();
    const searchTerm = useRecoilValue(searchTermState);
    const [data, setData] = useState();
    const [buskerData, setBuskerData] = useState();
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/search/searchStreaming?query=${searchTerm}&page=0&size=10`;

    const handleStreamingClick = (buskerEmail, data) => {
        
        // console.log(buskerEmail, data)
        navigate('/watchingpage', { state: { buskerEmail, data } });
    };
    
    async function getUserData(email) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/profile/email?email=${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const userData = await response.json();
            return userData;
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentBuskingInfo = await getCurrentBuskingInfo();
                console.log('current Busking Info:', currentBuskingInfo);

                for (let i = 0; i < currentBuskingInfo.length; i++) {
                    console.log(currentBuskingInfo[i].buskerEmail)
                    const user = await getUserData(currentBuskingInfo[i].buskerEmail)
                    currentBuskingInfo[i].nickname = user.nickname;
                    currentBuskingInfo[i].startTime = user.createdDate;
                }
                setBuskerData(currentBuskingInfo);

            } catch (error) {
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
        <>        
        <Wrapper>
            <MapWrapper>
                <Kakaomap></Kakaomap>
            </MapWrapper>
            {buskerData && Array.isArray(buskerData)
                ? buskerData.map((e, i) => (
                    <CardStreaming
                        key={i}
                        data={e}
                        handleStreamingClick={() => handleStreamingClick(e.buskerEmail, buskerData[i])}
                        getTimeFromStartTime={getTimeFromStartTime}
                    />
                ))
                : null}
        </Wrapper>
        </>

    );
};


export default SearchStreaming;
