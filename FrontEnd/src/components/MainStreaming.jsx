import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { getCurrentBuskingInfo } from "../Apis/streamingApi";
import CardStreaming from "./CardStreaming";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
`;

const MainStreaming = () => {
    const navigate = useNavigate();
    const [buskerData, setBuskerData] = useState();

    const handleStreamingClick = (data) => {
        console.log(data)
        navigate('/watchingpage', { state: { data } });
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
                    currentBuskingInfo[i].userNo = user.id;
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

        return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    };

    return (
        <Wrapper>
            {buskerData && Array.isArray(buskerData)
                ? buskerData.map((e, i) => (
                    <CardStreaming
                        key={i}
                        data={e}
                        handleStreamingClick={() => handleStreamingClick(e)}
                        getTimeFromStartTime={getTimeFromStartTime}
                    />
                ))
                : null}
        </Wrapper>
    );
};

export default MainStreaming;
