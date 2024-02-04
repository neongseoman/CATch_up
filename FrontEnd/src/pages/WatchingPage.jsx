import React, { useState, useEffect } from 'react';
import { styled, createGlobalStyle } from 'styled-components';
import ChatApp from "../components/ChatApp";
import VideoTmp from "../components/VideoTmp";
import StreamerList from "../components/StreamerList"
import Navbar from "../components/Navbar";

const Wrapper = styled.div`
    overflow-y: hidden;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh; // Use full screen height
`;

const LeftBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%; // 1/3 of the container width
    height: 100%; // Full height
    background: red;
`;

const MiddleContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    height: 100%;
`;

const MiddleTopBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1000px; // Half height
    background: green;
`;

const MiddleBottomBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 500px; // Half height
    background: black;
    padding: 10px;
`;

const StreamingTitle = styled.p`
    color: white;
    font-size: 20px;
`;

const StreamingInfo = styled.p`
    color: gray;
    font-size: 14px;
`;

const Tags = styled.p`
    
`;

const ProfileField = styled.div`
    display: flex;
    margin-top: 10px;
`;

const ProfileImg = styled.img`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    object-fit: cover;
    transform: scale(1.3);
    margin-top: auto;
    margin-right: 8px;
    margin-bottom: auto;
`;

const ProfileName = styled.p`
    color: white;
    font-size: 15px;
    margin-top: auto;
    margin-right: 8px;
    margin-bottom: auto;
`;

const Toggle = styled.p`
    margin-top: auto;
    margin-bottom: auto;
`;

const Count = styled.p`
    color: white;
    font-size: 10px;
    margin-top: auto;
    margin-right: 5px;
    margin-bottom: auto;
    margin-left: auto;
`;

const RightBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 100%;
    background: orange;
`;

const UserProfile = styled.button`
    width: 100%;
    height: 25px;
    margin-top: 5px;
    border-radius: 5px;
    background: #F24E1E;
    opacity: 0.5;
    color: white;
    font-size: 12px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const StreamingPage = () => {
    const [streamingInfo, setStreamingInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            // 서버로부터 스트리밍 정보를 가져오는 HTTP 요청
            const response = await fetch('', {
            method: 'GET',
            credentials: 'include'
            });

            if (!response.ok) {
            throw new Error('서버 응답이 실패했습니다');
            }

            const data = await response.json();
            console.log(data)
            setStreamingInfo(data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e)
        }
        
        };

        fetchData();
    }, []);

    const handleProfileClick = () => {
        alert('해당 방송 주인 프로필 화면으로 이동!');
    };
  
  const sampleStreamers = [
    {
      streamerId: 1,
      streamerName: '비비',
      status: 1,
      profileImageUrl: 'data:image/jpeg;base64,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',
      clickUrl: 'url1',
      position: '서울시 xx구',
    },
    {
      streamerId: 2,
      streamerName: '윤도현',
      status: 2,
      profileImageUrl: 'https://db.kookje.co.kr/news2000/photo/2014/0916/L20140916.99002171144i1.jpg',
      clickUrl: 'url2',
      position: '서울시 yy구',
    },    {
      streamerId: 1,
      streamerName: '비비',
      status: 1,
      profileImageUrl: 'data:image/jpeg;base64,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',
      clickUrl: 'url1',
      position: '서울시 xx구',
    },
    {
      streamerId: 2,
      streamerName: '윤도현',
      status: 2,
      profileImageUrl: 'https://db.kookje.co.kr/news2000/photo/2014/0916/L20140916.99002171144i1.jpg',
      clickUrl: 'url2',
      position: '서울시 yy구',
    },    {
      streamerId: 1,
      streamerName: '비비',
      status: 1,
      profileImageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBgEDBQIHAAj/xAA3EAACAQMCBQIEBAQGAwAAAAABAgMABBESIQUTMUFRBmEUInGRMoGhsQfB0fAjM0JSU7IVFiT/xAAaAQACAwEBAAAAAAAAAAAAAAADBAABAgUG/8QAIBEAAgICAwEAAwAAAAAAAAAAAAECEQMSITFBBBMiMv/aAAwDAQACEQMRAD8AbY01Rg1y6+1Rbv8AIPpV+lZBhunilzsdGbPAGy8Y+bx5oYNjOeo6jxWoxI/DhUHSqJoUuBkDJH+oUSGVrhin0fGsn7R4YHlSdq6UEdK65QiOmTr57VjXXqngttrHxYlZM5WFS2/16frTCkmrOTLHKLpo2Aue1SQRSfF/EOwNxoltLmOH/kIB/TOa2uDeqeEcameCyuGE678uVCjEeR5qWjLhJGnXwFXAY7Vy7gdBirMUcAMOlXLLIBiqtfvXwbbrUJQZDvEBV8ZIWhrc/wCCKvU/LSCZ6lo5wsrlD8wXqD3NTfXUPD7N7q8fRCnZRufAA7mpgAU6j360lfxAurm+nFhZtpSEgOwO+pvH3A+9XFWCyz1Rg+p/V99xXmWtmoggzhlT5mYeCf6VgXkDyD/5dQYEDTtk/wB+1OHA/Sq24i5o1yFOY+fcgAfbNZfG+HG2vS0YwVbUR9MGiJnPmpSdsULuOVVxNAwbtis3mMsquDpdTlWHUHtT5xaGOawkEyqroMqQNxXn7/iPU7963F2Cao9V9K+vbOa3iteLZt50ULzmOUkx58GnS3mhu0MkLB0yQGU5Bx1xX517V6T/AAv43MT/AOJnLaAhkgJ6EZ+Yf370RNgJ412j0QrjoKipc7VXqXzREACoMiIVc+6fWqrU5jAPiremK5p6p9lqDGBSPaMs8k08wy817MSfYOVH/UU8IQaTvUPAphHdLbiQq8xnh5WcqzH5gfbJz7ZrcXQDLDZDHG8cBZnwMwasscYCsCf3pb4zPw+fiLwxTCXmQ6v8MFgTjBG35fejeE2t9f8ACmg4igWa2OjUcnJxggg/iBGNwcGsTi/DfUAgtBw2GAyQSNoXJDY7A7Ywfr4q0/BVx9MPiUTX1qREcsy5U9M7dP3pAnjaKV0fZgcGvVrGxezj5V+6GRwWGNhg7kb9CDt9qUuO8Ojm41mNQVxlsf0q4S1fJmePZWhW5Ugj5uhuXqxqxtnxT9/DfhXEPjPj3M0FiudAJ+WRz7HwM748Cgrrh+PRs0rxouqdFgkC45o1Y/TfB+vvTP6QvLqy4cI7tl5TAHTI24IwNvHQURZF2wb+eUv1j2OByRjr71xyjVttPBdKDEcEjOk1dy18UdST6EJ45QdSRFq2YxRDDIoK0I5YozPSueema5JzpqSQ6kVEUTzNhB06nxR8cKQjbdv9xq0rA5MsYcemfIUtbIKpUMW2XpRFvNHPAJl2YEq2OxFBeoGt7a3El3afERk50iPWR+W9VWHFLe5hMdvbSwBd8PCUznvuN6nQHVuOwv8ArOOK4R2IKuOjKcHPakV2+FUzSlnZRvnqaevUTJhs0hcSDzgxxgktsABkk9hisWaS4sC9TcQuL7iEFpAHWNNEiR5/1soOf1/fzTZwnhMkaRyyz67uX5muJBr5ex2Remfelz1aIl9QxSwqmEREkCAYyNug6EAAEfyp84BDLPADbhmbYB26LRpPhUT5lbbYRa8PitWWQyM82c8y4lLOfyGwrZjnYrlsE+QpH8qoSKC3IjjbXMPxSdTmixZmQaixz7mhxnJdDWXDjyJboqtziNTjtWnaWckoDSgonbPU0TZ2cFnGp3dx3auLq7OCAdq3ql2Kz+hy4gWzTRW0elNlFc2kouEMhPyg4X3NY8nNvJ1t4ycv+g8mtPh9otrHyo2ZlVjjUc96ypNu/AEkkqvk6uLRJ42R8nV3zvmsblQ2aNyBLNKx651En8q1Xd7oukeqOEHBk7v5A9vf7eatZQseFGAOgHapNGoTaVeCBxqKbWWuF07/AIc5ApcuUDSKV2I6Edq9E40nxNrpitZZuwaJc5pftPTc0j6poZYzq3EhHT6D+tCUX6MfljqJvqSLmW1zeCHRqdWKhidOT5P9716L6dGjgNskQ3aMAE9cnrUcY9OxNwGe3AA1xlfoexqPRsxvfTtm+yuoMcgPZl2P7UTuJPndSZtW1uIwCeXt4jojIH+ZIqnxmpwIoSwKs3QHxQMiszZ05Pk96voY/oL+KZ0zmqG1McDck4odnZYflOMVqcGUSXkZffALfnUScnQr+JQhsw2w4d8DaySyHNxIAC3+0eBVNySZkhJVYdOqQk4J8Cte7/yD9R+9ZrxpNjmIpxtuM0xkiopJCEW222DyXK6SLZOaQNtJwv36faq2he4I534e8anb8z3rQCKO1WBQKFq2E2oGSFh0JUeBXUkJxq5jA/Wu3YjpQdzK+k71OEXbYJf3apG8cx5qkd9zSd6ae54Fxa6gurZ04ffzGW0mboSdyPY9fsaN4lcSfEsuds1mcbuZv/XrgmRiI5oXRSchWL9R47/c1lc2HgtWmPk51BcY6dqpeLJ2IAx0IqeGOZbOJn6lAf0q1utRDV1wf//Z',
      clickUrl: 'url1',
      position: '서울시 xx구',
    },
    {
      streamerId: 2,
      streamerName: '윤도현',
      status: 2,
      profileImageUrl: 'https://db.kookje.co.kr/news2000/photo/2014/0916/L20140916.99002171144i1.jpg',
      clickUrl: 'url2',
      position: '서울시 yy구',
    },    {
      streamerId: 1,
      streamerName: '비비',
      status: 1,
      profileImageUrl: 'data:image/jpeg;base64,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',
      clickUrl: 'url1',
      position: '서울시 xx구',
    },
    {
      streamerId: 2,
      streamerName: '윤도현',
      status: 2,
      profileImageUrl: 'https://db.kookje.co.kr/news2000/photo/2014/0916/L20140916.99002171144i1.jpg',
      clickUrl: 'url2',
      position: '서울시 yy구',
    },    {
      streamerId: 1,
      streamerName: '비비',
      status: 1,
      profileImageUrl: 'data:image/jpeg;base64,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',
      clickUrl: 'url1',
      position: '서울시 xx구',
    },
    {
      streamerId: 2,
      streamerName: '윤도현',
      status: 2,
      profileImageUrl: 'https://db.kookje.co.kr/news2000/photo/2014/0916/L20140916.99002171144i1.jpg',
      clickUrl: 'url2',
      position: '서울시 yy구',
    },    {
      streamerId: 1,
      streamerName: '비비',
      status: 1,
      profileImageUrl: 'data:image/jpeg;base64,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',
      clickUrl: 'url1',
      position: '서울시 xx구',
    },
    {
      streamerId: 2,
      streamerName: '윤도현',
      status: 2,
      profileImageUrl: 'https://db.kookje.co.kr/news2000/photo/2014/0916/L20140916.99002171144i1.jpg',
      clickUrl: 'url2',
      position: '서울시 yy구',
    },    {
      streamerId: 1,
      streamerName: '비비',
      status: 1,
      profileImageUrl: 'data:image/jpeg;base64,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',
      clickUrl: 'url1',
      position: '서울시 xx구',
    },
    {
      streamerId: 2,
      streamerName: '윤도현',
      status: 2,
      profileImageUrl: 'https://db.kookje.co.kr/news2000/photo/2014/0916/L20140916.99002171144i1.jpg',
      clickUrl: 'url2',
      position: '서울시 yy구',
    },    {
      streamerId: 1,
      streamerName: '비비',
      status: 1,
      profileImageUrl: 'data:image/jpeg;base64,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',
      clickUrl: 'url1',
      position: '서울시 xx구',
    },
    {
      streamerId: 2,
      streamerName: '윤도현',
      status: 2,
      profileImageUrl: 'https://db.kookje.co.kr/news2000/photo/2014/0916/L20140916.99002171144i1.jpg',
      clickUrl: 'url2',
      position: '서울시 yy구',
    },    {
      streamerId: 1,
      streamerName: '비비',
      status: 1,
      profileImageUrl: 'data:image/jpeg;base64,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',
      clickUrl: 'url1',
      position: '서울시 xx구',
    },
    {
      streamerId: 2,
      streamerName: '윤도현',
      status: 2,
      profileImageUrl: 'https://db.kookje.co.kr/news2000/photo/2014/0916/L20140916.99002171144i1.jpg',
      clickUrl: 'url2',
      position: '서울시 yy구',
    },
  ];

  return (
    <Wrapper>
      <GlobalStyle />
      <Container>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
            <LeftBox>
            <StreamerList streamers={sampleStreamers} />
            </LeftBox>
            <MiddleContainer>
                <MiddleTopBox>
                <VideoTmp />
                </MiddleTopBox>
                <MiddleBottomBox>
                <StreamingTitle>방송 제목</StreamingTitle>
                <StreamingInfo>방송 설명</StreamingInfo>
                <Tags>해시태그</Tags>
                <ProfileField>
                    <ProfileImg
                        // src={e.profileImagePath}
                        // onError={(e) => {
                        //     e.target.src = "/img/logo.png";
                        // }}
                    />
                    <ProfileName>방송중인 사용자 닉네임</ProfileName>
                    <Toggle>팔로우 토글</Toggle>
                    <Count>현재 시청자 수 :  30000명  |  방송 시작 시간 : 13시 28분</Count>
                </ProfileField>
                <UserProfile onClick={handleProfileClick}>프로필 보러 가기</UserProfile>
                </MiddleBottomBox>
            </MiddleContainer>
            <RightBox>
                <ChatApp />
            </RightBox>
        </>
      )}
      </Container>
    </Wrapper>   
  );
};

export default StreamingPage;
