import React from 'react';
import styled from '@emotion/styled';

// 스타일링된 레이블 컴포넌트
const StyledLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  margin: 10px 0;
`;

// 커스텀 체크박스 스타일
const CheckboxContainer = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-left: 10px;
  border-radius: 4px;
  border: 2px solid var(--main);
  background-color: ${props => props.checked ? "var(--main)" : "#fff"}; /* 조건부 색상 적용 */
  transition: background-color 0.2s;

  &::after {
    content: '${props => (props.checked ? "✔" : "")}';
    color: #fff;
    display: block;
    text-align: center;
    font-size: 18px;
  }
`;


// 숨겨진 실제 체크박스
const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  // input 타입을 여기서 직접 지정하는 대신, 사용할 때 type="checkbox"를 추가합니다.
`;

const LocationUsageToggle = ({ useLocation, handleLocationToggle }) => (
  <StyledLabel>
    위치 정보 제공 동의
    <CheckboxContainer checked={useLocation}>
    <HiddenCheckbox type="checkbox" checked={useLocation} onChange={handleLocationToggle} />
    </CheckboxContainer>
  </StyledLabel>
);

export default LocationUsageToggle;
