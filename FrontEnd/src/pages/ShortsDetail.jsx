// 쇼츠 상세 페이지
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CustomText from '../components/CustomText';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Video = styled.div`
    width: 100%;
    height: 300px;
    margin-top: 20px;
    margin-bottom: -10px;
    display: flex;
    border-radius: 10px;
    background: #8B8F92;
`;

const Info = styled.div`
    width: 100%;
    height: 180px;
    display: flex;
    color: white;
    border-radius: 10px;
    background: #1E1D1A;
    justify-content: space-between;
    flex-direction: column;
`;

const TopInfo = styled.div`
    width: 95%;
    display: flex;
    margin: 15px;
    justify-content: space-between;
`;

const TextField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ShortsTitle = styled.div`
    color: white;
    font-size: 24px;
    text-align: left;
`;

const ShortsInfo = styled.div`
    color: white;
    font-size: 16px;
    text-align: left;
`;

const TagField = styled.div`
    display: flex;
    gap: 4px;
`;

const Tag = styled.div`
    font-size: 10px;
    background: #56350A;
    color: #F7B84B;
    border-radius: 30px;
    padding: 6px;
`;

const LikeField = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const LikeIcon = styled.p`
    font-size: 20px;
`;

const LikeCount = styled.p`
    font-size: 16px;
`;

const BottomInfo = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const ProfileField = styled.p`
    display: flex;
    margin: 15px;
`;

const ProfileImg = styled.img`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 5px;
    color: white;
    object-fit: cover;
    transform: scale(1.5);
`;

const ProfileName = styled.p`
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    font-size: 16px;
    color: white;
`;

const StreamingInfoField = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;
    width: 30%;
    margin: 15px;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 5px;
`;

const Option = styled.p`
    font-size: 10px;
    color: white;
`;

const Data = styled.p`
    font-size: 12px;
    color: white;
`;

const CommentField = styled.div`
    border-radius: 10px;
    padding: 15px;
    margin-top: 15px;
`;

const ShortsDetail = () => {
    const [tagList, setTagList] = useState(['태그1', '태그2', '태그3']);
    const [data, setData] = useState();
    const url = `${process.env.REACT_APP_API_BASE_URL}/searchShorts?query=두번째 &page=0&size=10`;

    useEffect(() => {
        axios.get(url)
          .then(response => {
            console.log('데이터:', response.data);
            setData(response.data.content); 
          })
          .catch(error => {
            console.error('에러:', error);
          });
      }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const formatStreamingTime = (seconds) => {
        const hours = Math.floor(seconds / 3600); // 초를 시간으로 변환
        const remainingMinutes = Math.floor((seconds % 3600) / 60); // 시간을 제외한 나머지 초를 분으로 변환
        const remainingSeconds = seconds % 60; // 남은 초
        
        let result = '';
    
        if (hours > 0) {
            result += `${hours}시간 `;
        }
    
        if (remainingMinutes > 0) {
            result += `${remainingMinutes}분 `;
        }
        if (remainingSeconds > 0 || result === '') {
            result += `${remainingSeconds}초`;
        }
    
        return result;
    };
    
    return (
        <Wrapper>
            <CustomText typography="h1" bold>
                <br />쇼츠 보기<br />
            </CustomText>
            {/* {data && Array.isArray(data) ? data.map((e, i) => (
                <Shorts key={i}> */}
                <Video>쇼츠 영상</Video>
                <Info>
                    <TopInfo>
                        <TextField>
                            <ShortsTitle>쇼츠 제목</ShortsTitle>
                            <ShortsInfo>쇼츠 설명</ShortsInfo>
                            <TagField>
                            {tagList.map((tag, i) => (
                                <div key={i}>
                                    <Tag>#{tag}</Tag>
                                </div>
                            ))}
                            </TagField>
                        </TextField>
                        <LikeField>
                            <LikeIcon>하트</LikeIcon>
                            <LikeCount>100</LikeCount>
                        </LikeField>
                    </TopInfo>
                    <BottomInfo>
                        <ProfileField>
                            <ProfileImg
                                // src={e.profileImagePath}
                                onError={(e) => {
                                    e.target.src = '/img/logo.png';
                                }}
                            />
                            <ProfileName>업로드한 사용자 닉네임</ProfileName>
                        </ProfileField>
                        <StreamingInfoField>
                            <Options>
                                <Option>최대 시청자 수</Option>
                                <Data>1000명</Data>
                            </Options>
                            <Options>
                                <Option>방송 날짜</Option>
                                <Data>날짜</Data>
                            </Options>
                            <Options>
                                <Option>총 방송 시간</Option>
                                <Data>시간</Data>
                            </Options>
                        </StreamingInfoField>
                    </BottomInfo>
                </Info>
                {/* </Shorts>
            )) : null} */}
            <CommentField>
                <Review></Review>
                <br />
                <ReviewForm></ReviewForm>
            </CommentField>
        </Wrapper>
    );
  };
  
  export default ShortsDetail;

