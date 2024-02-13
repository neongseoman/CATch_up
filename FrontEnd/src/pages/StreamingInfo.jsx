import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomText from '../components/CustomText';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { buskerGeolocation, userInfoState } from "../RecoilState/userRecoilState";
import LocationUsageToggle from "../components/LocationUsageToggle"
import HashTagInput from '../components/HashTagInput';

const StreamingInfo = () => {
    const navigate = useNavigate();
    const [userInfo] = useRecoilState(userInfoState);
    const [geolocation, setGeolocation] = useRecoilState(buskerGeolocation);
    const [buskingTitle, setBuskingTitle] = useState('');
    const [buskingHashtag, setBuskingHashtag] = useState('');
    const [buskingInfo, setBuskingInfo] = useState('');
    const [useLocation, setUseLocation] = useState(false);
    const [locationError, setLocationError] = useState('');

    // 위치 정보 토글 이벤트 핸들러
    const handleLocationToggle = () => {
        setUseLocation(!useLocation);
        if (!useLocation) {
            if (!navigator.geolocation) {
                setLocationError('Geolocation is not supported by your browser');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setGeolocation({ latitude, longitude });
                    setLocationError('');
                },
                () => {
                    setLocationError('Unable to retrieve your location');
                }
            );
        } else {
            setGeolocation({ latitude: null, longitude: null });
            setLocationError('');
        }
    };

    const handleStreaming = async () => {
        const formData = {
            buskerEmail: userInfo.userId,
            buskingTitle,
            buskingHashtag,
            buskingInfo,
            geoLocation: useLocation ? geolocation : null,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/create-busking`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create busking info');
            }

            console.log('Busking info created successfully', await response.json());
            navigate('/streamingpage');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleTagsChange = (newTags) => {
        //배열로 받아옴
        const tagsString = newTags.join(', ');
        setBuskingHashtag(tagsString);
      };
      
    return (
        <>
            <CustomText typography="h1" bold>
                방송 정보
            </CustomText>

            <TextInput placeholder="방송 제목을 입력하세요" value={buskingTitle}
                       onChange={(e) => setBuskingTitle(e.target.value)} />

            <HashTagInput onTagsChange={handleTagsChange} />

            <TextInput placeholder="방송 설명을 입력하세요" value={buskingInfo}
                       onChange={(e) => setBuskingInfo(e.target.value)} />

            <LocationUsageToggle
            useLocation={useLocation}
            handleLocationToggle={handleLocationToggle}
            />
            {locationError && <p>Error: {locationError}</p>}

            <Button type="submit" onClick={handleStreaming}>방송 시작</Button>
        </>
    );
};

export default StreamingInfo;
