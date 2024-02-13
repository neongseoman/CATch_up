import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';
import { searchTermState } from '../RecoilState/userRecoilState';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  padding: 5px 10px;
  border-radius: 25px;
  margin: 0 auto;
  max-width: 500px;
  height: 50px;
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  color: #333;
`;

const SearchButton = styled.button`
  background-color: var(--main);
  border: none;
  padding: 10px 13px;
  border-radius: 100px;
  cursor: pointer;
  color: white;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--sub-color);
  }
`;

const SearchBar = () => {
  const navigate = useNavigate();
  const setSearchTerm = useSetRecoilState(searchTermState);

  // const handleInputChange = (e) => {
    
  // };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchTerm(event.target.value);
      navigate('/searchresult');
    }
  };

  const handleSearchClick = () => {
    navigate('/searchresult');
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="검색어를 입력하세요"
        // value={searchTerm}
        // onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <SearchButton onClick={handleSearchClick}>🔍︎</SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
