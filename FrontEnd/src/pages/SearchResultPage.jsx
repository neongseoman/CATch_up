import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomText from '../components/CustomText';
import SearchStreaming from '../components/SearchStreaming';
import SearchProfile from '../components/SearchProfile';
import SearchShorts from '../components/SearchShorts';

const Wrapper = styled.div`
    width: 100%;
    margin: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 30px;
`;

const ResultButton =styled.button`
    color: white;
    font-size: 24px;
    border: none;
    border-radius: 10px;
    width: calc(33% - 5px);
    height: 50px;
    cursor: pointer;
`;

const SearchResultPage = () => {
    const tmp = {
        viewStreamingResult: true,
        viewProfileResult: false,
        viewShortsResult: false,
    };

    if(localStorage.getItem('viewState') != null) {
        const data = JSON.parse(localStorage.getItem('viewState'))
        tmp.viewStreamingResult = data.viewStreamingResult
        tmp.viewProfileResult = data.viewProfileResult
        tmp.viewShortsResult = data.viewShortsResult
    }

    const [viewStreamingResult, setViewStreamingResult] = useState(tmp.viewStreamingResult);
    const [viewProfileResult, setViewProfileResult] = useState(tmp.viewProfileResult);
    const [viewShortsResult, setViewShortsResult] = useState(tmp.viewShortsResult);
    
    

    const handleStreamingClick = () => {
        setViewStreamingResult(true);
        setViewProfileResult(false);
        setViewShortsResult(false);
    };

    const handleProfileClick = () => {
        setViewStreamingResult(false);
        setViewProfileResult(true);
        setViewShortsResult(false);
    };

    const handleShortsClick = () => {
        setViewStreamingResult(false);
        setViewProfileResult(false);
        setViewShortsResult(true);
    };
    
    useEffect(() => {
            const viewState = {
                viewStreamingResult,
                viewProfileResult,
                viewShortsResult,
            };
            console.log(JSON.stringify(viewState))
            localStorage.setItem('viewState', JSON.stringify(viewState));
        }, [viewStreamingResult, viewProfileResult, viewShortsResult]);

    return (
        <Wrapper>
            <CustomText typography="h1" bold>
                <br />검색 결과<br />
            </CustomText>
            <Buttons>
                <ResultButton onClick={handleStreamingClick} style={{ background: viewStreamingResult ? '#e8543d' : '#5E6468' }}>스트리밍</ResultButton>
                <ResultButton onClick={handleProfileClick} style={{ background: viewProfileResult ? '#e8543d' : '#5E6468' }}>프로필</ResultButton>
                <ResultButton onClick={handleShortsClick} style={{ background: viewShortsResult ? '#e8543d' : '#5E6468' }}>쇼츠</ResultButton>
            </Buttons>
            {viewStreamingResult && <SearchStreaming />}
            {viewProfileResult && <SearchProfile />}
            {viewShortsResult && <SearchShorts />}
        </Wrapper>
    );
};

export default SearchResultPage;
