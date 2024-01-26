// 검색 결과 - 쇼츠

import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column; /* 세로 방향의 Flexbox 레이아웃 */
    align-items: flex-start; /* 왼쪽 정렬 */
`;

const ShortsResult = () => {
    
    return (
        <Wrapper>
            <h1>쇼츠</h1>
        </Wrapper>
    );
  };
  
  export default ShortsResult;