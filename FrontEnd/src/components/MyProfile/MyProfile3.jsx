// 내 프로필-3
// import React from 'react';
// import styled from 'styled-components';

// const Wrapper = styled.div`
//     margin-top: 10px;
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
// `;

// const MyProfile3 = ({ userInfo }) => {

//   return (
//     <Wrapper>
//       로그인한 사용자가 업로드한 쇼츠 목록 출력
//     </Wrapper>
//   );
// };

// export default MyProfile3;


// 사용자 프로필-3
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const Shorts = styled.div`
    width: 100%;
    margin-bottom: 30px;
`;

const Video = styled.div`
  width: 98%;
  height: 200px;
  margin-bottom: 30px;
  display: flex;
  float: left;
  border-radius: 10px;
  background-color: #8b8f92;
  cursor: pointer;
`;

const MyProfile3 = ({ userInfo }) => {
  const navigate = useNavigate();
  const [shortsInfo, setShortsInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/shorts/user/${userInfo.id}`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다');
        }

        const data = await response.json();
        console.log(data)
        setShortsInfo(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e)
      }
      
    };

    fetchData();
  }, []);
  
  const handleShortsClick = (streamNo) => {
    navigate(`/user/shortsdetail/${streamNo}`);
  };

  return (
    <Wrapper>
      {shortsInfo && Array.isArray(shortsInfo)
        ? shortsInfo.map((e, i) => (
            <Shorts key={i}>
              <Video onClick={() => handleShortsClick(e.streamNo)}>{e.shortsPath}</Video>
            </Shorts>
          ))
        : null}
    </Wrapper>
  );
};

export default MyProfile3;
