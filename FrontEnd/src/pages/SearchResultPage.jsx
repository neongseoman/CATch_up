import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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

const PageTitle = styled.p`
    color: #5E6468;
    font-size: 20px;
    margin-bottom: 10px;
`;

const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
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
    var tmp = {
        viewStreamingResult: true,
        viewProfileResult: false,
        viewShortsResult: false,
    };

    if(localStorage.getItem('viewState') != null) {
        tmp = JSON.parse(localStorage.getItem('viewState'))
    }

    const [viewStreamingResult, setViewStreamingResult] = useState(tmp.viewStreamingResult);
    const [viewProfileResult, setViewProfileResult] = useState(tmp.viewProfileResult);
    const [viewShortsResult, setViewShortsResult] = useState(tmp.viewShortsResult);
    
    useEffect(() => {
        const viewState = {
            viewStreamingResult,
            viewProfileResult,
            viewShortsResult,
        };
        console.log(JSON.stringify(viewState))
        localStorage.setItem('viewState', JSON.stringify(viewState));
    }, [viewStreamingResult, viewProfileResult, viewShortsResult]);

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

    return (
        <Wrapper>
            <PageTitle>검색 결과</PageTitle>
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
