// 공통 input 컴포넌트

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column; /* 세로 방향의 Flexbox 레이아웃 */
    align-items: flex-start; /* 왼쪽 정렬 */
`;

const TitleText = styled.p`
    font-size: 10px;
    margin: 0px;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 세로 중앙 정렬 */
`;

const InputField = styled.input`
    border: 1px solid;
    border-radius: 8px;
    padding: 5px;
    size: ${(props) => props.size || 'auto'};
`;

const TextCount = styled.p`
    font-size: 10px;
    color: grey;
    align-self: flex-end;
    margin: 0px;
`;

const CommonInput = ({ title, type, value, onChange, width, height, size, maxLength }) => {
  const handleChange = (e) => {
    if (maxLength && e.target.value.length > maxLength) {
      return;
    }
    onChange(e);
  };

  return (
    <Wrapper>
      <TitleText>{title}</TitleText>
      <InputWrapper>
        <InputField
          type={type}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          size={size}
        />{/* width랑 height 적용이 안 되어서 일단 size로 뒀습니다... */}
        {maxLength && (
          <TextCount>{value.length}/{maxLength}</TextCount>
        )}
      </InputWrapper>
    </Wrapper>
  );
};

export default CommonInput;
