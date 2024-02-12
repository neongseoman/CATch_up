import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  background: #56350A;
  color: #F7B84B;
  border-radius: 15px;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;

  &:after {
    margin-left: 5px;
    content: ' ✘';
    color: #fde9c4;
  }
`;

const TagInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
`;

function HashTagInput({ onTagsChange }) {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === ' ' && input) {
      const newTags = !tags.includes(input) ? [...tags, input] : tags;
      setTags(newTags);
      setInput(''); // 입력 필드 초기화
      onTagsChange(newTags); // 부모 컴포넌트에 태그 변경 사항 알림
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value.replace(/\s/g, '')); // 스페이스바 입력 방지
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    onTagsChange(newTags); // 부모 컴포넌트에 태그 변경 사항 알림
  };

  return (
    <div>
      <TextInput
        placeholder="#해시태그를 #입력하세요"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <TagInputContainer>
        {tags.map((tag, index) => (
          <Tag key={index} onClick={() => removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </TagInputContainer>
    </div>
  );
}

export default HashTagInput;
