import React from 'react';
import styled from 'styled-components';
import Button from './common/Button';

const Review = ({ author, date, content, initialRating, onDelete, showDeleteButton }) => {
  return (
    <ReviewContainer>
      <ReviewHeader>
        <RatingAndCount>
          <Rating>
            {[...Array(5)].map((_, index) => (
              <Star key={index} filled={index < initialRating}>★</Star>
            ))}
          </Rating>
          <RatingCount>{initialRating}/5</RatingCount>
        </RatingAndCount>
        <AuthorAndDate>
          <Author>{author}</Author>
          <Date>{date.split('T')[0]}</Date>
          <Date>{parseInt(date.slice(11, 13), 10) % 12 || 12}시 {date.slice(14, 16)}분에 작성됨</Date>
        </AuthorAndDate>
      </ReviewHeader>

      {/* 수정된 부분 */}
      <ContentAndButtonContainer>
        <Content>{content}</Content>
        {showDeleteButton && (
          <ButtonContainer>
            <Button onClick={onDelete}>삭제</Button>
          </ButtonContainer>
        )}
      </ContentAndButtonContainer>
      
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin: 15px 0;
  border-radius: 15px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const RatingAndCount = styled.div`
  display: flex;
  align-items: center;
`;

const Rating = styled.div`
  font-size: 24px;
`;

const Star = styled.span`
  cursor: pointer;
  color: ${props => props.filled ? '#ffc107' : '#e4e5e9'};
`;

const RatingCount = styled.span`
  margin-left: 10px;
  font-size: 18px;
`;

const AuthorAndDate = styled.div`
  text-align: right;
`;

const Author = styled.p`
  font-weight: bold;
  margin: 0;
`;

const Date = styled.p`
  color: #666;
  margin: 0;
`;

const Content = styled.p`
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
`;

// Content와 Button을 포함하는 컨테이너
const ContentAndButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 컨텐츠가 다른 높이를 가질 경우 상단 정렬 */
`;
export default Review;
