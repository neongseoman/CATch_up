// 검색 결과

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlaceResult from './PlaceResult';
import StreamerResult from './StreamerResult';
import ShortsResult from './ShortsResult';

const Wrapper = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column; /* 세로 방향의 Flexbox 레이아웃 */
    align-items: flex-start; /* 왼쪽 정렬 */
`;

const PageTitle = styled.h2`
    color: #5E6468;
`;

const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const ResultButton =styled.button`
    color: white;
    font-size: 24px;
    border: none;
    border-radius: 20px;
    width: calc(33% - 5px);
    height: 50px;
    background: #525252;
    &:hover {
        background: #777777;
    }
    &:active {
        background: #F7B84B;
    }
`;

const SearchResult = () => {
    var tmp = {
        viewPlaceResult: true,
        viewStreamerResult: false,
        viewShortsResult: false,
    };

    if(localStorage.getItem('viewState') != null) {
        tmp = JSON.parse(localStorage.getItem('viewState'))
    }

    const [viewPlaceResult, setViewPlaceResult] = useState(tmp.viewPlaceResult);
    const [viewStreamerResult, setViewStreamerResult] = useState(tmp.viewStreamerResult);
    const [viewShortsResult, setViewShortsResult] = useState(tmp.viewShortsResult);
    const [message, setMessage] = useState()
    
    // 상태가 변경될 때마다 로컬 스토리지에 저장
    useEffect(() => {
        const viewState = {
            viewPlaceResult,
            viewStreamerResult,
            viewShortsResult,
        };
        console.log(JSON.stringify(viewState))
        localStorage.setItem('viewState', JSON.stringify(viewState));
    }, [viewPlaceResult, viewStreamerResult, viewShortsResult]);

    const handlePlaceClick = () => {
        setViewPlaceResult(true);
        setViewStreamerResult(false);
        setViewShortsResult(false);
    };

    const handleStreamerClick = () => {
        setViewPlaceResult(false);
        setViewStreamerResult(true);
        setViewShortsResult(false);
    };

    const handleShortsClick = () => {
        setViewPlaceResult(false);
        setViewStreamerResult(false);
        setViewShortsResult(true);
    };

    return (
        <center>
            <Wrapper>
                <PageTitle>{message}</PageTitle>
                <Buttons>
                    <ResultButton onClick={handlePlaceClick}>장소</ResultButton>
                    <ResultButton onClick={handleStreamerClick}>스트리머</ResultButton>
                    <ResultButton onClick={handleShortsClick}>쇼츠</ResultButton>
                </Buttons>
                {viewPlaceResult && <PlaceResult />}
                {viewStreamerResult && <StreamerResult />}
                {viewShortsResult && <ShortsResult />}
            </Wrapper>
        </center>
    );
};

export default SearchResult;
