/*global kakao */ 
import { useRef, useEffect, useMemo,useState  } from 'react';
import { getCurrentBuskingInfo } from "../../Apis/streamingApi";
import { useNavigate } from 'react-router-dom';

function Kakaomap(props) {
  const container = useRef(null);

  const navigate = useNavigate();
  const [liveStreamSessions, setLiveStreamSessions] = useState([
    {
      stream_no: 1,
      start_time: "2023-10-01 12:00",
      end_time: "2023-10-01 14:00",
      title: "역삼동 화려한 버스킹 쇼",
      introduction: "역삼역 근처에서 벌어지는 화려한 버스킹 쇼를 감상하세요",
      hashtags: "#역삼 #버스킹 #라이브",
      max_viewer: 150,
      lat: 37.50281, 
      lng: 127.0420
    },
    {
      stream_no: 2,
      start_time: "2023-10-02 15:00",
      end_time: "2023-10-02 17:00",
      title: "역삼 공원 라이브",
      introduction: "역삼 공원에서 보컬 라이브 공연입니다.",
      hashtags: "#역삼 #공원 #스트리트",
      max_viewer: 200,
      lat: 37.50485, 
      lng: 127.0365
    },
    {
      stream_no: 3,
      start_time: "2023-10-03 18:00",
      end_time: "2023-10-03 20:00",
      title: "역삼 개나리공연(원) !!",
      introduction: "역삼 개나리공원에서 라이브 공연을 즐겨보세요",
      hashtags: "#역삼 #개나리 #공원 #보컬",
      max_viewer: 180,
      lat: 37.49793,
      lng: 127.0360
    },
    {
      stream_no: 4,
      start_time: "2023-10-04 19:00",
      end_time: "2023-10-04 21:00",
      title: "역삼 댄스 배틀",
      introduction: "열정이 넘치는 역삼의 댄스 크루 배틀",
      hashtags: "#댄스 #역삼 #배틀",
      max_viewer: 220,
      lat: 37.50220,
      lng: 127.0303
    },
    {
      stream_no: 5,
      start_time: "2023-10-05 20:00",
      end_time: "2023-10-05 22:00",
      title: "역삼 리얼 길거리 공연",
      introduction: "리얼 길거리에서하는 역삼 공연입니다.",
      hashtags: "#길거리 #공연 #라이브",
      max_viewer: 250,
      lat: 37.50172, 
      lng: 127.0455
    }
  ]);



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


const handleStreamingClick = (buskerEmail, data) => {
  // console.log(buskerEmail);
  // console.log(data)
  navigate('/watchingpage', { state: { buskerEmail, data } });
};

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setLiveStreamSessions([]);
    //   console.log("Sessions cleared!");
    // }, 1000);




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

          const liveData = {
            stream_no: 234,
            start_time: currentBuskingInfo[0].startTime,
            end_time: "",
            buskingTitle: currentBuskingInfo[0].buskingTitle,
            title: currentBuskingInfo[0].buskingTitle,
            introduction: currentBuskingInfo[0].buskingInfo,
            hashtags: currentBuskingInfo[0].buskingHashtag,
            max_viewer: currentBuskingInfo[0].audienceCount,
            geoLocation: {
              latitude: 37.50127,
              longitude: 127.0396
            },
            lat: 37.50127,
            lng: 127.0396,
            buskerEmail: currentBuskingInfo[0].buskerEmail,
            nickname: currentBuskingInfo[0].nickname,
            audienceCount: currentBuskingInfo[0].audienceCount,
            buskingInfo: currentBuskingInfo[0].buskingInfo
          };
          console.log(liveData)
          



          setLiveStreamSessions(currentSessions => [
            ...currentSessions, liveData
          ])


          // setBuskerData(currentBuskingInfo);
          console.log(liveData);

        } catch (error) {
            console.error('Error in useEffect:', error);
        }
    };
    fetchData();


    // return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, []);

  const options = useMemo(() => ({
    center: new kakao.maps.LatLng(37.50127, 127.0396),
    level: 5,
  }), []);

  useEffect(() => {
    const map = new kakao.maps.Map(container.current, options);

    const greenMarkerImage = new kakao.maps.MarkerImage(
      '/img/green.png',
      new kakao.maps.Size(50, 50)
    );

    const grayMarkerImage = new kakao.maps.MarkerImage(
      '/img/gray.png',
      new kakao.maps.Size(50, 50)
    );

    liveStreamSessions.forEach((session, index) => {
      const markerPosition = new kakao.maps.LatLng(session.lat, session.lng);

      // 처음 2개의 마커에는 초록색 마커 이미지를, 나머지에는 회색 마커 이미지를 사용
      const markerImage = index < 5 ? grayMarkerImage : greenMarkerImage;

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 커스텀 마커 이미지 설정
      });
      marker.setMap(map);

      // 스타일링된 오버레이 컨텐츠
      const content = `
        <div style="
          padding: 10px;
          background-color: #ffe8d8;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.18);
          text-align: center;
        ">
          <h4 style="
            margin: 0 0 5px;
            color: #333;
            font-size: 18px;
            font-weight: bold;
          ">${session.title}</h4>
          <p style="
            margin: 0;
            color: #666;
            font-size: 15px;
          ">${session.introduction}<br>${session.hashtags}</p>
        </div>
      `;

      const customOverlay = new kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.5,
        yAnchor: 1.4,
        clickable: true
      });
      
      kakao.maps.event.addListener(marker, 'click', () => handleStreamingClick(liveStreamSessions[liveStreamSessions.length - 1].buskerEmail, liveStreamSessions[liveStreamSessions.length - 1]));
      kakao.maps.event.addListener(marker, 'mouseover', () => customOverlay.setMap(map));
      kakao.maps.event.addListener(marker, 'mouseout', () => customOverlay.setMap(null));
    });
    
  }, [options, liveStreamSessions]);

  
  const { width, height } = props;

  return (
    <div 
      id="map" 
      ref={container} 
      style={{ 
        width: width || '100%', 
        height: height || '100%',
        borderRadius: '15px'
      }}
    ></div>
  );
}

export default Kakaomap;
