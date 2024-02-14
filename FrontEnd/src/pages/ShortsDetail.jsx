import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomText from '../components/CustomText';
import ReviewList from '../components/ReviewList';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../RecoilState/userRecoilState';
import { useParams } from 'react-router-dom';

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
    display: flex;
    color: white;
    border-radius: 10px;
    background: #1E1D1A;
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

const LikeField = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const LikeButton = styled.button`
    font-size: 24px;
    height: 24px;
    background: none;
    cursor: pointer;
`;

const LikeCount = styled.p`
    font-size: 16px;
    height: 16px;
`;

const BottomInfo = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const ProfileField = styled.p`
    display: flex;
    margin-left: 15px;
`;

const ProfileImg = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 5px;
`;

const ProfileName = styled.p`
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 5px;
    font-size: 16px;
    color: white;
`;

const StreamingInfoField = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;
    width: 35%;
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
    const [shortsInfo, setShortsInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recoil] = useRecoilState(userInfoState);
    const { streamNo } = useParams();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const [count, setCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        const updatedCount = isLiked ? count - 1 : count + 1;
        setCount(updatedCount);
        setIsLiked(!isLiked);
      };  

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/shorts/${streamNo}`, {
              method: 'GET',
              credentials: 'include'
            });
    
            if (!response.ok) {
              throw new Error('서버 응답이 실패했습니다');
            }
    
            const data = await response.json();
            
            console.log(data)
            setShortsInfo(data);
            setCount(data.streamShortClips.likes)
            } catch (e) {
                console.log(e)
            }
            setLoading(false)
        };
    
        fetchData();
      }, []);

    return (
        <Wrapper>
            <CustomText typography="h1" bold>
                <br />쇼츠 보기<br />
            </CustomText>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                <Video>{shortsInfo.streamShortClips.shortsPath}</Video>
                <Info>
                    <TopInfo>
                        <TextField>
                        <ShortsTitle>{shortsInfo.streamShortClips.title}</ShortsTitle>
                        <ShortsInfo>{shortsInfo.streamShortClips.introduction}</ShortsInfo>
                        </TextField>
                        <LikeField>
                            <LikeButton onClick={handleLikeClick}>
                                {isLiked ? '♥' : '♡'}
                            </LikeButton>
                            <LikeCount>{count}</LikeCount>
                        </LikeField>
                    </TopInfo>
                    <BottomInfo>
                        <ProfileField>
                            <ProfileImg
                                src={shortsInfo.member.profileImagePath}
                                onError={(e) => {
                                    e.target.src = '/img/logo_withoutDot.png';
                                }}
                            />
                            <ProfileName>{shortsInfo.member.nickname}</ProfileName>
                        </ProfileField>
                        <StreamingInfoField>
                            <Options>
                                <Option>최대 시청자 수</Option>
                                <Data>{shortsInfo.streamShortClips.maxViews}</Data>
                            </Options>
                            <Options>
                                <Option>방송 날짜</Option>
                                <Data>{formatDate(shortsInfo.streamShortClips.streamedTime)}</Data>
                            </Options>
                            <Options>
                                <Option>쇼츠 업로드 날짜</Option>
                                <Data>{formatDate(shortsInfo.streamShortClips.createdTime)}</Data>
                            </Options>
                        </StreamingInfoField>
                    </BottomInfo>
                    </Info>
                    <CommentField>
                        <ReviewList streamNo={1} currentUserNo={recoil.idNo} />
                    </CommentField>
                </>
            )}
                
        </Wrapper>
    );
};

export default ShortsDetail;
