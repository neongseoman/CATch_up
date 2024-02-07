import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomText from '../components/CustomText';
import TextInput from '../components/TextInput';
import Button from '../components/Button'
import styled from "@emotion/styled";


const StreamingInfo = () => {
  const navigate = useNavigate();
  const [buskingTitle, setBuskingTitle] = useState('');
  const [buskingReport, setBuskingReport] = useState('');
  const [buskingHashtag, setBuskingHashtag] = useState('');
  const [buskingInfo, setBuskingInfo] = useState('');
  // const [loginError, setLoginError] = useState(''); // 로그인 오류 메시지를 위한 상태

  const handleStreaming = async (event) => {
      // event.preventDefault();

      const formData = {
          buskingTitle: buskingTitle,
          buskingReport: buskingReport,
          buskingHashtag: buskingHashtag,
          buskingInfo: buskingInfo
      };

      try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/busking/info`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json', // Change content type to JSON
              },
              body: JSON.stringify(formData) // Convert formData to JSON
          });

          console.log(response)
          navigate('/streamingpage');

      } catch (error) {
          console.error('Error:', error);
      }

  }

  return (
    <>
        <CustomText typography="h1" bold>
          <br />방송 정보<br />
        </CustomText>

        <TextInput placeholder="방송 제목을 입력하세요" value={buskingTitle}
          onChange={(e) => setBuskingTitle(e.target.value)}></TextInput>
        
        <TextInput placeholder="알림 메시지를 입력하세요" value={buskingReport}
          onChange={(e) => setBuskingReport(e.target.value)}></TextInput>

        <TextInput placeholder="#해시태그를 #입력하세요" value={buskingHashtag}
          onChange={(e) => setBuskingHashtag(e.target.value)}></TextInput>
        
        <TextInput placeholder="방송 설명을 입력하세요" value={buskingInfo}
          onChange={(e) => setBuskingInfo(e.target.value)} ></TextInput>

        {/* {loginError && <CustomText typography="p" style={{ color: 'red' , height: '30px' }}>{loginError}</CustomText>} */}
        <Button type="submit" onClick={handleStreaming}>방송 시작</Button>
    </>
  );
}

export default StreamingInfo


