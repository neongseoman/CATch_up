import React from "react";
import ChatApp from "../components/ChatApp";
import VideoTmp from "../components/VideoTmp";
import StreamerList from "../components/StreamerList"
import Navbar from "../components/Navbar";

const StreamingPage = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100vh' // Use full screen height
  };

  const leftBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%', // 1/3 of the container width
    height: '100%', // Full height
    backgroundColor: 'red'
  };

  const middleContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '55%',
    height: '100%'
  };

  const middleTopBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '1000px', // Half height
    backgroundColor: 'green'
  };

  const middleBottomBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '500px', // Half height
    backgroundColor: '#ddd'
  };

  const rightBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%', // 1/3 of the container width
    height: '100%', // Full height
    backgroundColor: 'orange'
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

        <div style={{overflowY: "hidden"}}>
          <div style={containerStyle}>
            <div style={leftBoxStyle}>

              <StreamerList streamers={sampleStreamers} />

            </div>
            <div style={middleContainerStyle}>
                <div style={middleTopBoxStyle}>
                  <VideoTmp />
                </div>
                <div style={middleBottomBoxStyle}>
                </div>
            </div>
            <div style={rightBoxStyle}>
                <ChatApp />
            </div>
          </div>
        </div>
      
        
  );
};

export default StreamingPage;